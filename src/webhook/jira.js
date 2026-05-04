import { buildIdempotencyKey } from "../idempotency/store.js";
import { buildFeasibilityPrompt, renderFeasibilityAdf } from "../feasibility/prompt.js";
import crypto from "node:crypto";

function verifySecret(headers, expectedSecret, rawBody = "") {
  if (!expectedSecret) return false;

  const directHeader = headers["x-webhook-secret"] || headers["X-Webhook-Secret"];
  if (directHeader === expectedSecret) {
    return true;
  }

  // Jira secret mode sends an HMAC signature in X-Hub-Signature.
  const signatureHeader = headers["x-hub-signature"] || headers["X-Hub-Signature"];
  if (!signatureHeader || typeof signatureHeader !== "string") {
    return false;
  }

  const [algorithm, signature] = signatureHeader.split("=");
  if (algorithm !== "sha256" || !signature) {
    return false;
  }

  const digest = crypto
    .createHmac("sha256", expectedSecret)
    .update(rawBody, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(digest, "hex");
  const actualBuffer = Buffer.from(signature, "hex");
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

function issueMatchesFilters(issue, config) {
  const issueType = issue?.fields?.issuetype?.name || "";
  const projectKey = issue?.fields?.project?.key || "";
  const labels = issue?.fields?.labels || [];

  if (
    config.allowedIssueTypes.length > 0 &&
    !config.allowedIssueTypes.includes(issueType)
  ) {
    return false;
  }
  if (
    config.allowedProjects.length > 0 &&
    !config.allowedProjects.includes(projectKey)
  ) {
    return false;
  }
  if (config.requiredLabel && !labels.includes(config.requiredLabel)) {
    return false;
  }
  return true;
}

export async function handleJiraWebhook({
  body,
  headers,
  rawBody = "",
  config,
  jiraClient,
  githubClient,
  llmClient,
  idempotencyStore,
  logger = console
}) {
  if (!verifySecret(headers, config.jiraWebhookSecret, rawBody)) {
    return { status: 401, body: { error: "Unauthorized webhook" } };
  }

  const issueKey = body?.issue?.key;
  const eventType = body?.webhookEvent || "unknown";
  const issueVersion = String(body?.issue?.fields?.updated || body?.timestamp || "0");
  if (!issueKey) {
    return { status: 400, body: { error: "Missing issue key" } };
  }

  const idempotencyKey = buildIdempotencyKey({ issueKey, eventType, issueVersion });

  const issue = await jiraClient.getIssue(issueKey);
  if (!issueMatchesFilters(issue, config)) {
    return { status: 202, body: { status: "issue_filtered_out" } };
  }

  const claimed = await idempotencyStore.claim(idempotencyKey);
  if (!claimed) {
    return { status: 200, body: { status: "duplicate_ignored" } };
  }

  try {
    const ticketText = [
      issue?.fields?.summary || "",
      JSON.stringify(issue?.fields?.description || "")
    ].join("\n");

    const snippets = await githubClient.searchRelevantCode(ticketText);
    const prompt = buildFeasibilityPrompt({ issue, snippets });
    const report = await llmClient.createFeasibilityReport(prompt);
    const adf = renderFeasibilityAdf(report);
    await jiraClient.addComment(issueKey, adf);

    await idempotencyStore.complete(idempotencyKey, { issueKey, eventType });
    logger.info("Feasibility report posted", { issueKey, eventType });
    return { status: 200, body: { status: "posted", issueKey } };
  } catch (error) {
    await idempotencyStore.release(idempotencyKey);
    throw error;
  }
}
