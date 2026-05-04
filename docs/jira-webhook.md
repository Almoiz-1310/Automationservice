# Jira webhook scope and filtering

## Event scope

- Primary trigger: `jira:issue_created`.
- Optional expansion: `jira:issue_updated` gated by `REQUIRED_JIRA_LABEL=ready-for-feasibility`.
- Ignore all other webhook event types.

## Project and issue type filters

- `ALLOWED_JIRA_PROJECTS` (comma-separated) limits processing to known product projects.
- `ALLOWED_JIRA_ISSUE_TYPES` (comma-separated) limits processing to feature-like issue types.
- `REQUIRED_JIRA_LABEL` can force opt-in behavior per issue.

## Webhook authentication

- Require shared secret header `X-Webhook-Secret`.
- Match against `JIRA_WEBHOOK_SECRET`.
- Reject missing/incorrect secret with HTTP `401`.

## Processing contract

- Endpoint: `POST /webhooks/jira`.
- Response:
  - `200` when report posted or duplicate ignored.
  - `202` when issue is filtered out by project/type/label rules.
  - `400` on malformed payloads.
  - `401` on webhook auth failure.
