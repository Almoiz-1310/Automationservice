const parseCsv = (value) =>
  (value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

export function loadConfig(env = process.env) {
  return {
    port: Number(env.PORT || 3000),
    jiraBaseUrl: env.JIRA_BASE_URL || "",
    jiraEmail: env.JIRA_EMAIL || "",
    jiraApiToken: env.JIRA_API_TOKEN || "",
    jiraWebhookSecret: env.JIRA_WEBHOOK_SECRET || "",
    githubToken: env.GITHUB_TOKEN || "",
    githubRepo: env.GITHUB_REPO || "",
    llmApiKey: env.LLM_API_KEY || "",
    llmModel: env.LLM_MODEL || "gpt-4.1-mini",
    idempotencyBackend: (env.IDEMPOTENCY_BACKEND || "memory").toLowerCase(),
    idempotencyFileDir: env.IDEMPOTENCY_FILE_DIR || "",
    allowedProjects: parseCsv(env.ALLOWED_JIRA_PROJECTS),
    allowedIssueTypes: parseCsv(env.ALLOWED_JIRA_ISSUE_TYPES),
    requiredLabel: env.REQUIRED_JIRA_LABEL || ""
  };
}

export function assertConfig(config) {
  const requiredKeys = [
    "jiraBaseUrl",
    "jiraEmail",
    "jiraApiToken",
    "jiraWebhookSecret",
    "githubToken",
    "githubRepo",
    "llmApiKey"
  ];
  const missing = requiredKeys.filter((key) => !config[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required config: ${missing.join(", ")}`);
  }
}
