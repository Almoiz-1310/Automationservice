import { loadConfig, assertConfig } from "./config.js";
import { JiraClient } from "./clients/jira.js";
import { GithubClient } from "./clients/github.js";
import { LlmClient } from "./feasibility/llm.js";
import { InMemoryIdempotencyStore } from "./idempotency/store.js";
import { FileIdempotencyStore } from "./idempotency/fileStore.js";
import { handleJiraWebhook } from "./webhook/jira.js";

export function createApp(env = process.env, fetchImpl = fetch, logger = console) {
  const config = loadConfig(env);
  assertConfig(config);

  const jiraClient = new JiraClient({
    baseUrl: config.jiraBaseUrl,
    email: config.jiraEmail,
    apiToken: config.jiraApiToken,
    fetchImpl
  });

  const githubClient = new GithubClient({
    token: config.githubToken,
    repo: config.githubRepo,
    fetchImpl
  });

  const llmClient = new LlmClient({
    apiKey: config.llmApiKey,
    model: config.llmModel,
    fetchImpl
  });

  const idempotencyStore = pickIdempotencyStore(config);

  return {
    config,
    async process(body, headers, rawBody = "") {
      return handleJiraWebhook({
        body,
        headers,
        rawBody,
        config,
        jiraClient,
        githubClient,
        llmClient,
        idempotencyStore,
        logger
      });
    }
  };
}

function pickIdempotencyStore(config) {
  if (config.idempotencyBackend === "file") {
    if (!config.idempotencyFileDir) {
      throw new Error("IDEMPOTENCY_FILE_DIR is required when IDEMPOTENCY_BACKEND=file");
    }
    return new FileIdempotencyStore(config.idempotencyFileDir);
  }
  if (config.idempotencyBackend === "memory") {
    return new InMemoryIdempotencyStore();
  }
  throw new Error(
    "Invalid IDEMPOTENCY_BACKEND (use memory or file)"
  );
}
