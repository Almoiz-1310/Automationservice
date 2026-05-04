# Setup, Environment Variables, and Testing Guide

This guide explains:

1. What you need to set up
2. Which `.env` variables are required
3. Where to get each variable value
4. How to test locally and end-to-end with Jira

## 1) Basic setup

From project root:

```bash
cd /home/almoiz-sayyed/Webhook
cp .env.example .env
npm install
```

Then open `.env` and fill in the values listed below.

## 2) Required environment variables

### Core variables

| Variable | Required | Example | Where to get it |
|----------|----------|---------|-----------------|
| `PORT` | Yes (local) | `3000` | Any free local port. On PaaS this may be injected automatically. |
| `JIRA_BASE_URL` | Yes | `https://your-company.atlassian.net` | Your Jira Cloud site URL (browser URL). |
| `JIRA_EMAIL` | Yes | `automation@your-company.com` | Email of Jira user used for API calls. |
| `JIRA_API_TOKEN` | Yes | `xxxx` | Create in Atlassian account security page (API token). |
| `JIRA_WEBHOOK_SECRET` | Yes | `strong-random-secret` | You generate this (random string) and use the same value in Jira webhook header. |
| `GITHUB_TOKEN` | Yes | `github_pat_xxx` | GitHub fine-grained PAT or GitHub App installation token with read access. |
| `GITHUB_REPO` | Yes | `your-org/ai-content-studio` | Owner + repo name from GitHub URL. |
| `LLM_API_KEY` | Yes | `sk-...` | LLM provider dashboard/API keys page. |
| `LLM_MODEL` | Yes | `gpt-4.1-mini` | Model name from your LLM provider docs/account. |

### Idempotency variables

| Variable | Required | Example | Where to get it |
|----------|----------|---------|-----------------|
| `IDEMPOTENCY_BACKEND` | Yes | `file` or `memory` | Set manually. Use `file` for production single instance; `memory` for quick local testing. |
| `IDEMPOTENCY_FILE_DIR` | Required when backend is `file` | `./data/idempotency` or `/data/idempotency` | Path you choose. Must be writable by the app. |

### Optional filter variables

| Variable | Required | Example | Where to get it |
|----------|----------|---------|-----------------|
| `ALLOWED_JIRA_PROJECTS` | Optional | `ACS,PRD` | Jira project keys from Jira project settings. |
| `ALLOWED_JIRA_ISSUE_TYPES` | Optional | `Feature,Story` | Jira issue type names used by product team. |
| `REQUIRED_JIRA_LABEL` | Optional | `ready-for-feasibility` | Label naming convention you define internally. |

## 3) How to get each value quickly

### Jira values

1. **Base URL**: open Jira in browser, copy root domain (`https://<site>.atlassian.net`).
2. **Jira email**: email of automation account (or dedicated service user).
3. **API token**:
   - Go to Atlassian Account -> Security -> API tokens
   - Create token
   - Copy and store in `.env` as `JIRA_API_TOKEN`
4. **Webhook secret**:
   - Generate any strong random value (password manager / openssl)
   - Use same value in:
     - `.env` as `JIRA_WEBHOOK_SECRET`
     - Jira webhook custom header `X-Webhook-Secret`

### GitHub values

1. Create a fine-grained PAT or GitHub App token.
2. Minimum access should allow:
   - repository metadata read
   - repository contents read
3. Set token as `GITHUB_TOKEN`.
4. Set `GITHUB_REPO` as `owner/repo` from your repo URL.

### LLM values

1. Create API key in your provider dashboard.
2. Confirm enabled model name.
3. Set:
   - `LLM_API_KEY`
   - `LLM_MODEL`

## 4) Local testing

### Step A: Start server

```bash
set -a && source .env && set +a
node src/server.js
```

You should see server start logs.

### Step B: Test webhook endpoint quickly with sample payload

In another terminal:

```bash
set -a && source .env && set +a
node scripts/replay-jira-payload.js examples/sample-jira-feature.json
```

Expected:
- HTTP response printed by script (`status=...`)
- No crash in server logs

## 5) End-to-end Jira testing

1. Deploy service to a public HTTPS URL (Render/Fly/Railway/VPS).
2. In Jira Cloud -> Settings -> System -> Webhooks:
   - URL: `https://<your-domain>/webhooks/jira`
   - Events: at least **Issue created**
   - Add custom header:
     - `X-Webhook-Secret: <JIRA_WEBHOOK_SECRET>`
3. Create a new feature issue in allowed project/type.
4. Verify:
   - Service logs show webhook processed
   - A feasibility comment appears in Jira issue
   - Comment includes verdict, components, effort, risks, open questions, evidence paths

## 6) Common issues and fixes

- `401 Unauthorized webhook`
  - Secret mismatch between Jira header and `.env`.
- `202 issue_filtered_out`
  - Project/type/label filters excluded the issue.
- `200 duplicate_ignored`
  - Same issue event/version already processed (expected on retries).
- GitHub 403 errors
  - Token scope/rate-limit issue.
- LLM request fails
  - Invalid API key, model name, or account quota.
