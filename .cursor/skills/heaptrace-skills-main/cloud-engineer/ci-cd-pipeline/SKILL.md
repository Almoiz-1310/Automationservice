<!--
┌──────────────────────────────────────────────────────────────┐
│  HEAPTRACE DEVELOPER SKILLS                                  │
│  Copyright © 2026 Heaptrace Technology Private Limited        │
│                                                              │
│  CONFIDENTIAL — FOR AUTHORIZED CLIENTS ONLY                  │
│                                                              │
│  This skill file is the intellectual property of Heaptrace.  │
│  It is provided exclusively to licensed clients and their    │
│  development teams for internal use only.                    │
│                                                              │
│  You MAY:                                                    │
│  ✅ Use within your development team                         │
│  ✅ Customize and tune for your project                      │
│  ✅ Use with Claude Code, Cursor, or any AI coding tool      │
│                                                              │
│  You MAY NOT:                                                │
│  ❌ Redistribute, share, or publish publicly                 │
│  ❌ Sell, sublicense, or transfer to third parties            │
│  ❌ Remove or modify this copyright notice                   │
│  ❌ Commit to any public or shared repository                │
│                                                              │
│  Unauthorized use or distribution is prohibited.             │
│  Contact: support@heaptrace.com                              │
└──────────────────────────────────────────────────────────────┘
-->

---
name: Build CI/CD Pipeline
description: Build production-grade CI/CD pipelines using GitHub Actions for AWS deployments, covering ECR image builds, ECS deployments, rollback strategies, environment promotion, secrets management, and multi-stage workflows.
---

# Build CI/CD Pipeline

## Common Rules

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           COMMON RULES                                  │
│                                                                         │
│  1. UNDERSTAND BEFORE YOU BUILD                                         │
│     Read existing workflow files in .github/workflows/. Understand      │
│     the current branch strategy, deployment targets, and environment    │
│     variables before modifying any pipeline configuration.              │
│                                                                         │
│  2. REUSE — NEVER DUPLICATE                                             │
│     Check for existing reusable workflows, composite actions, and       │
│     shared steps. Use YAML anchors or composite actions to reduce       │
│     duplication across workflows.                                       │
│                                                                         │
│  3. USE EXISTING TECHNOLOGY                                             │
│     Stick to GitHub Actions. Do not introduce Jenkins, CircleCI, or    │
│     other CI platforms unless explicitly approved.                      │
│                                                                         │
│  4. ASK BEFORE ADDING ANYTHING NEW                                      │
│     New third-party GitHub Actions, self-hosted runners, or            │
│     deployment targets require security review.                         │
│                                                                         │
│  5. FOLLOW BEST PRACTICES                                               │
│     Pin action versions by SHA, use OIDC for AWS auth, separate        │
│     CI from CD, use concurrency controls, cache dependencies.          │
│                                                                         │
│  6. NO AI TOOL REFERENCES — ANYWHERE                                    │
│     Never mention AI tools, LLMs, or code assistants in code           │
│     comments, commit messages, documentation, or variable names.        │
│     The output must read as if written by a senior cloud engineer.      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CI/CD Pipeline Architecture                       │
│                                                                          │
│  Developer pushes to feature branch                                      │
│       │                                                                  │
│       ▼                                                                  │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  CI Pipeline (on PR to main/staging)                          │       │
│  │                                                               │       │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │       │
│  │  │ Lint     │  │ Test     │  │ Build    │  │ Security     │ │       │
│  │  │ (ESLint, │  │ (Jest,   │  │ (tsc,    │  │ (npm audit,  │ │       │
│  │  │  Prettier│  │  Vitest) │  │  Next.js)│  │  Trivy)      │ │       │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘ │       │
│  │        ▼              ▼            ▼              ▼          │       │
│  │  All pass → PR is mergeable                                  │       │
│  └──────────────────────────────────────────────────────────────┘       │
│       │                                                                  │
│       │ Merge to staging branch                                          │
│       ▼                                                                  │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  CD Pipeline — Staging (auto-deploy on push to staging)       │       │
│  │                                                               │       │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │       │
│  │  │ Build Docker │  │ Push to ECR  │  │ Deploy to ECS    │   │       │
│  │  │ (BuildKit)   │──│ (tag: sha)   │──│ (update service) │   │       │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │       │
│  │                                              │                │       │
│  │                                     ┌────────▼────────┐      │       │
│  │                                     │ Health check    │      │       │
│  │                                     │ Wait for stable │      │       │
│  │                                     └─────────────────┘      │       │
│  └──────────────────────────────────────────────────────────────┘       │
│       │                                                                  │
│       │ Promote to production (merge staging → main)                     │
│       ▼                                                                  │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  CD Pipeline — Production (manual approval gate)              │       │
│  │                                                               │       │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │       │
│  │  │ Approval │──│ Build    │──│ Deploy   │──│ Smoke test │  │       │
│  │  │ (manual) │  │ + Push   │  │ (ECS)    │  │ (health)   │  │       │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │       │
│  └──────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. CI Workflow (Pull Request Checks)

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main, staging]
    paths-ignore:
      - '*.md'
      - 'docs/**'
      - '.github/ISSUE_TEMPLATE/**'

concurrency:
  group: ci-${{ github.head_ref || github.ref_name }}
  cancel-in-progress: true

env:
  NODE_VERSION: '20'

jobs:
  # --- Backend ---
  backend-lint:
    name: Backend Lint
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: src/backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
          cache-dependency-path: src/backend/package-lock.json
      - run: npm ci
      - run: npm run lint

  backend-test:
    name: Backend Test
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: src/backend
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        ports: ['5432:5432']
        options: >-
          --health-cmd "pg_isready -U test"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7-alpine
        ports: ['6379:6379']
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
    env:
      DATABASE_URL: postgresql://test:test@localhost:5432/test
      REDIS_URL: redis://localhost:6379
      JWT_SECRET: test-jwt-secret-ci
      NODE_ENV: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
          cache-dependency-path: src/backend/package-lock.json
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm test -- --coverage
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: backend-coverage
          path: src/backend/coverage/

  backend-build:
    name: Backend Build
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: src/backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
          cache-dependency-path: src/backend/package-lock.json
      - run: npm ci
      - run: npx prisma generate
      - run: npm run build

  # --- Frontend ---
  frontend-lint:
    name: Frontend Lint
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: src/frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
          cache-dependency-path: src/frontend/package-lock.json
      - run: npm ci
      - run: npm run lint

  frontend-build:
    name: Frontend Build
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: src/frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
          cache-dependency-path: src/frontend/package-lock.json
      - run: npm ci
      - run: npm run build

  # --- Security ---
  security-audit:
    name: Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      - run: cd src/backend && npm audit --audit-level=high
        continue-on-error: true  # Warn but don't block
      - run: cd src/frontend && npm audit --audit-level=high
        continue-on-error: true
```

---

## 3. CD Workflow (Staging Deployment)

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy Staging

on:
  push:
    branches: [staging]

concurrency:
  group: deploy-staging
  cancel-in-progress: false  # Never cancel a deployment mid-way

permissions:
  id-token: write  # OIDC
  contents: read

env:
  AWS_REGION: us-east-1
  ECR_REGISTRY: 123456789012.dkr.ecr.us-east-1.amazonaws.com
  ECS_CLUSTER: myapp-staging
  ENVIRONMENT: staging

jobs:
  deploy-backend:
    name: Deploy Backend
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/myapp-github-actions-deploy
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Set image tag
        id: tag
        run: echo "tag=${{ github.sha }}" >> $GITHUB_OUTPUT

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: src/backend
          file: src/infrastructure/docker/Dockerfile.backend
          push: true
          tags: |
            ${{ env.ECR_REGISTRY }}/myapp-backend:${{ steps.tag.outputs.tag }}
            ${{ env.ECR_REGISTRY }}/myapp-backend:staging-latest
          cache-from: type=registry,ref=${{ env.ECR_REGISTRY }}/myapp-backend:staging-cache
          cache-to: type=registry,ref=${{ env.ECR_REGISTRY }}/myapp-backend:staging-cache,mode=max

      - name: Download current task definition
        run: |
          aws ecs describe-task-definition \
            --task-definition myapp-staging-backend \
            --query 'taskDefinition' \
            --output json > task-def.json

      - name: Update task definition with new image
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: task-def.json
          container-name: backend
          image: ${{ env.ECR_REGISTRY }}/myapp-backend:${{ steps.tag.outputs.tag }}

      - name: Deploy to ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def.outputs.task-definition }}
          service: myapp-staging-backend
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true
          wait-for-minutes: 10

      - name: Verify deployment health
        run: |
          for i in $(seq 1 10); do
            STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://staging.lmsht.com/api/health || echo "000")
            if [ "$STATUS" = "200" ]; then
              echo "Health check passed"
              exit 0
            fi
            echo "Attempt $i: HTTP $STATUS — waiting 10s..."
            sleep 10
          done
          echo "Health check failed after 10 attempts"
          exit 1

  deploy-frontend:
    name: Deploy Frontend
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/myapp-github-actions-deploy
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: src/frontend
          file: src/infrastructure/docker/Dockerfile.frontend
          push: true
          tags: |
            ${{ env.ECR_REGISTRY }}/myapp-frontend:${{ github.sha }}
            ${{ env.ECR_REGISTRY }}/myapp-frontend:staging-latest
          build-args: |
            NEXT_PUBLIC_API_URL=https://staging.lmsht.com
          cache-from: type=registry,ref=${{ env.ECR_REGISTRY }}/myapp-frontend:staging-cache
          cache-to: type=registry,ref=${{ env.ECR_REGISTRY }}/myapp-frontend:staging-cache,mode=max

      - name: Download current task definition
        run: |
          aws ecs describe-task-definition \
            --task-definition myapp-staging-frontend \
            --query 'taskDefinition' \
            --output json > task-def.json

      - name: Update task definition with new image
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: task-def.json
          container-name: frontend
          image: ${{ env.ECR_REGISTRY }}/myapp-frontend:${{ github.sha }}

      - name: Deploy to ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def.outputs.task-definition }}
          service: myapp-staging-frontend
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true
          wait-for-minutes: 10
```

---

## 4. Production Deployment with Approval Gate

```yaml
# .github/workflows/deploy-production.yml
name: Deploy Production

on:
  push:
    branches: [main]

concurrency:
  group: deploy-production
  cancel-in-progress: false

permissions:
  id-token: write
  contents: read

jobs:
  deploy-backend:
    name: Deploy Backend (Production)
    runs-on: ubuntu-latest
    environment: production  # Requires manual approval in GitHub settings
    steps:
      # Same steps as staging but with production config
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/myapp-github-actions-deploy-prod
          aws-region: us-east-1

      # ... build, push, deploy steps ...

      - name: Post-deployment smoke test
        run: |
          echo "Running production smoke tests..."
          curl -sf https://app.lmsht.com/api/health || exit 1
          echo "Smoke tests passed"
```

---

## 5. Rollback Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    Rollback Decision Tree                         │
│                                                                  │
│  Deployment fails?                                               │
│  │                                                               │
│  ├─ ECS circuit breaker catches it                               │
│  │   └─ Automatic rollback to previous task definition           │
│  │   └─ Action: None — check logs, fix, redeploy               │
│  │                                                               │
│  ├─ Health checks pass but app is broken                         │
│  │   └─ Manual rollback needed                                  │
│  │   └─ Action: Redeploy previous image tag                    │
│  │                                                               │
│  └─ Database migration broke things                              │
│      └─ Code rollback + migration rollback                      │
│      └─ Action: Deploy previous code, run reverse migration     │
└─────────────────────────────────────────────────────────────────┘
```

### Manual Rollback Commands

```bash
# Find the previous task definition revision
aws ecs describe-services --cluster production --services myapp-backend \
  --query "services[0].deployments[*].taskDefinition" --output text

# Rollback to a specific task definition
aws ecs update-service \
  --cluster production \
  --service myapp-backend \
  --task-definition myapp-production-backend:42 \
  --force-new-deployment

# Watch rollback progress
watch -n 5 'aws ecs describe-services --cluster production --services myapp-backend \
  --query "services[0].{Running:runningCount,Desired:desiredCount,Deployments:deployments[*].{Status:status,TaskDef:taskDefinition,Running:runningCount}}" --output json'

# Rollback via GitHub Actions (re-run previous successful deploy)
gh run rerun <run-id> --job deploy-backend
```

---

## 6. Secrets Management in Pipelines

```
┌─────────────────────────────────────────────────────────────────┐
│               Secrets Management Architecture                    │
│                                                                  │
│  GitHub Repository                                               │
│  ├── Secrets (for CI/CD only)                                   │
│  │   ├── AWS_ROLE_ARN (OIDC role — no access keys!)            │
│  │   └── SLACK_WEBHOOK_URL (deployment notifications)           │
│  │                                                               │
│  ├── Variables (non-sensitive config)                            │
│  │   ├── AWS_REGION                                             │
│  │   ├── ECR_REGISTRY                                           │
│  │   └── ECS_CLUSTER                                            │
│  │                                                               │
│  └── Environments                                                │
│      ├── staging                                                 │
│      │   └── Secrets: (none — uses OIDC)                        │
│      └── production                                              │
│          ├── Required reviewers: [ops-team]                      │
│          └── Secrets: (none — uses OIDC)                        │
│                                                                  │
│  AWS Account                                                     │
│  ├── SSM Parameter Store                                        │
│  │   ├── /myapp/production/DATABASE_URL                         │
│  │   ├── /myapp/production/JWT_SECRET                           │
│  │   └── /myapp/production/REDIS_URL                            │
│  │                                                               │
│  └── Secrets Manager                                             │
│      ├── myapp/production/stripe                                 │
│      └── myapp/production/sendgrid                               │
│                                                                  │
│  Rule: GitHub stores ZERO application secrets.                   │
│  All app secrets live in AWS SSM/SecretsManager.                 │
│  ECS task definitions reference them at container start.         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Notification Integration

```yaml
# Add to deploy workflow jobs
  notify:
    name: Notify
    needs: [deploy-backend, deploy-frontend]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Send Slack notification
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "${{ needs.deploy-backend.result == 'success' && needs.deploy-frontend.result == 'success' && ':white_check_mark:' || ':x:' }} *${{ github.event.repository.name }}* deployed to *${{ env.ENVIRONMENT }}*",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deployment:* ${{ env.ENVIRONMENT }}\n*Commit:* `${{ github.sha }}`\n*Author:* ${{ github.actor }}\n*Backend:* ${{ needs.deploy-backend.result }}\n*Frontend:* ${{ needs.deploy-frontend.result }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK
```

---

## 8. Cost Implications

| Resource | Cost | Notes |
|----------|------|-------|
| GitHub Actions (public repo) | Free | Unlimited minutes |
| GitHub Actions (private repo) | 2,000 min/month free | Then $0.008/min (Linux) |
| ECR storage | $0.10/GB/month | Set lifecycle policies |
| ECR data transfer (cross-region) | $0.09/GB | Keep builds in same region |
| Docker layer caching (registry) | ~$0.10/GB/month | Saves 2-5 min per build |

### Optimization Tips

- Use Docker layer caching (`cache-from`/`cache-to`) to reduce build times
- Run CI jobs in parallel (lint + test + build simultaneously)
- Use `paths-ignore` to skip CI on doc-only changes
- Set `cancel-in-progress: true` on CI (not CD) for fast feedback
- Use ECR lifecycle policies to clean old images

---

## 9. Common Mistakes / Anti-Patterns

| Mistake | Why It's Bad | Fix |
|---------|-------------|-----|
| Storing AWS access keys in GitHub secrets | Keys can leak, no rotation | Use OIDC (`aws-actions/configure-aws-credentials`) |
| `cancel-in-progress: true` on deploy | Cancels mid-deploy, leaves broken state | Set `false` for deploy workflows |
| No `wait-for-service-stability` | Deploy reports success before tasks are healthy | Always wait for ECS stability |
| Building Docker without cache | 5-10 min builds every time | Use BuildKit registry cache |
| Deploying to prod without approval | No human gate for production | Use `environment: production` with reviewers |
| Hardcoded image tags | Can't trace what's deployed | Use git SHA as image tag |
| No rollback plan | Stuck with broken deploy | Use ECS circuit breaker + manual rollback procedure |
| Running `npm install` in Docker | Non-deterministic builds | Use `npm ci` always |
| Not pinning action versions | Supply chain attack risk | Pin by SHA: `actions/checkout@abcdef123` |
| Missing concurrency controls | Overlapping deploys cause chaos | Set `concurrency.group` per environment |
