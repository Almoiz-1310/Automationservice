import { buildIdempotencyKey } from "../idempotency/store.js";
import { buildFeasibilityPrompt, renderFeasibilityAdf } from "../feasibility/prompt.js";

function verifySecret(headerValue, expectedSecret) {
  if (!expectedSecret) return false;
  return headerValue === expectedSecret;
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
  config,
  jiraClient,
  githubClient,
  llmClient,
  idempotencyStore,
  logger = console
}) {
  const incomingSecret = headers["x-webhook-secret"] || headers["X-Webhook-Secret"];
  if (!verifySecret(incomingSecret, config.jiraWebhookSecret)) {
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
