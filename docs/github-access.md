# GitHub access model and limits

## Preferred auth

- Preferred: GitHub App installation token with read-only repository permissions.
- Alternative: fine-grained PAT with read-only access to target repositories.

## Required scopes

- `contents:read` for file retrieval.
- `metadata:read` for repository and search metadata.

## API usage in this service

- `GET /search/code` for candidate paths.
- `GET /repos/{owner}/{repo}/contents/{path}` for bounded snippet extraction.

## Rate-limit handling strategy

- Keep query fan-out bounded (6 terms max, 5 results per term).
- Clip snippets to first 60 lines to reduce payload size.
- De-duplicate paths before file reads.
- On rate-limit response (`403` with `x-ratelimit-remaining: 0`), back off and retry with jitter in production deployment.

## Security guardrails

- Never request write scopes.
- Do not log raw file content in production logs.
- Store token only in secret manager or environment vault.
