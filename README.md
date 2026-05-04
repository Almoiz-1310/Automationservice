# Jira + GitHub feasibility automation

Automates feasibility triage for Jira Cloud feature requests by scanning a GitHub repository and posting a structured assessment back to Jira.

## Quick start (local)

1. Copy `.env.example` to `.env` and set real values.
2. For local development you can use in-memory idempotency:

```bash
IDEMPOTENCY_BACKEND=memory
```

3. Start the service:

```bash
npm install
set -a && source .env && set +a
node src/server.js
```

4. Configure Jira Cloud webhook:

```text
POST https://<your-host>/webhooks/jira
```

With header:

```text
X-Webhook-Secret: <JIRA_WEBHOOK_SECRET>
```

## Deploy (no AWS)

Use Docker on **Render**, **Fly.io**, **Railway**, or any VPS. Full steps:

- [docs/setup-paas.md](docs/setup-paas.md)

```bash
docker build -t jira-feasibility .
docker run --env-file .env -p 3000:3000 jira-feasibility
```

## Required output fields

- `verdict`
- `affectedComponents`
- `effortEstimate`
- `confidence`
- `risks`
- `openQuestions`
- `evidencePaths`

## Documents

- `docs/jira-webhook.md`
- `docs/github-access.md`
- `docs/pilot-tuning.md`
- `docs/setup-paas.md`

## Pilot replay helper

```bash
JIRA_WEBHOOK_SECRET=replace-me node scripts/replay-jira-payload.js examples/sample-jira-feature.json
```
