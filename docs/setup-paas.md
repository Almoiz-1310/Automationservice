# Setup guide: Jira + GitHub feasibility automation (no AWS)

Deploy the Node HTTP service on any host with a public HTTPS URL (PaaS or your own VM). Jira calls `POST /webhooks/jira` with a shared secret header.

## 1) Prerequisites

- Jira Cloud admin access (webhooks).
- GitHub token with read access to the target repo (fine-grained PAT or GitHub App installation token).
- LLM API key used by `src/feasibility/llm.js` (currently OpenAI-compatible `responses` API).
- Node.js 20+ for local runs; Docker optional for container deploys.

## 2) Configure environment

```bash
cp .env.example .env
```

Required variables:

| Variable | Purpose |
|----------|---------|
| `JIRA_BASE_URL` | Site URL, e.g. `https://your-company.atlassian.net` |
| `JIRA_EMAIL` | Jira user email for the automation account |
| `JIRA_API_TOKEN` | API token for that user |
| `JIRA_WEBHOOK_SECRET` | Shared secret; must match Jira custom header |
| `GITHUB_TOKEN` | Repo read token |
| `GITHUB_REPO` | `owner/repo` |
| `LLM_API_KEY` | LLM provider key |

Idempotency (recommended in production):

| Variable | Purpose |
|----------|---------|
| `IDEMPOTENCY_BACKEND` | `memory` (dev only) or `file` (production single instance) |
| `IDEMPOTENCY_FILE_DIR` | Writable directory when `IDEMPOTENCY_BACKEND=file` |

Filtering (optional):

- `ALLOWED_JIRA_PROJECTS` (comma-separated)
- `ALLOWED_JIRA_ISSUE_TYPES` (comma-separated)
- `REQUIRED_JIRA_LABEL`

Install dependencies:

```bash
npm install
```

## 3) Run locally

```bash
set -a && source .env && set +a
node src/server.js
```

Webhook URL:

```text
http://localhost:3000/webhooks/jira
```

## 4) Deploy with Docker (Render, Fly.io, Railway, DigitalOcean, etc.)

Build and run:

```bash
docker build -t jira-feasibility .
docker run --env-file .env -p 3000:3000 jira-feasibility
```

The image sets `IDEMPOTENCY_BACKEND=file` and `IDEMPOTENCY_FILE_DIR=/data/idempotency` by default so webhook retries do not double-post after a successful run. Mount a volume on `/data/idempotency` if the platform restarts containers and you want stable dedupe across restarts.

### Render

1. New **Web Service** from this repo (Dockerfile build).
2. Set environment variables in the Render dashboard (same as `.env.example`).
3. Add a **persistent disk** mounted at `/data` if you use file idempotency and care about dedupe across deploys.
4. Copy the service URL `https://...onrender.com/webhooks/jira`.

### Fly.io

1. Install `flyctl`, then `fly launch` in this directory (use the included `fly.toml` or follow prompts).
2. Set secrets: `fly secrets set JIRA_BASE_URL=...` (repeat for all secrets).
3. For persistent idempotency: create a volume and mount it at `/data` (see Fly docs).

### Railway

1. New project from repo; set variables in Railway UI.
2. Expose the service port (default `3000`).
3. Prefer attaching a volume for `/data/idempotency` if Railway offers it for your plan.

## 5) Configure Jira webhook

1. Jira **Settings** → **System** → **Webhooks** → **Create a webhook**.
2. URL: `https://<your-host>/webhooks/jira`
3. Events: **Issue created** (required); **Issue updated** optional.
4. Custom header: `X-Webhook-Secret` = same value as `JIRA_WEBHOOK_SECRET`.

## 6) Verify

1. Create a test issue in an allowed project/type.
2. Check service logs for errors.
3. Confirm a Jira comment with verdict, components, effort, risks, open questions, and evidence paths.

## 7) Troubleshooting

- **401 Unauthorized webhook**: `X-Webhook-Secret` missing or wrong.
- **202 issue_filtered_out**: Project, issue type, or label filters excluded the issue.
- **200 duplicate_ignored**: Same idempotency key already claimed (retry or duplicate delivery).
- **GitHub 403 on code search**: Token missing `Contents: Read` / metadata, or rate limit.
- **LLM errors**: Key, model name, or provider account limits.

## Notes

- **Single instance**: File idempotency is correct for one running container. Multiple replicas need a shared store (for example Redis or Postgres); that is not bundled here.
- **HTTPS**: Jira requires a public HTTPS URL in production; use the platform’s TLS or a reverse proxy.
