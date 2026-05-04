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
name: Plan Disaster Recovery
description: Plan and implement disaster recovery strategies for AWS workloads, covering RTO/RPO definitions, backup strategies, cross-region replication, failover testing, runbook creation, and multi-tier DR architectures.
---

# Plan Disaster Recovery

## Common Rules

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           COMMON RULES                                  │
│                                                                         │
│  1. UNDERSTAND BEFORE YOU BUILD                                         │
│     Map all critical systems, data stores, and dependencies.           │
│     Understand the business impact of downtime for each service        │
│     before designing the DR strategy.                                   │
│                                                                         │
│  2. REUSE — NEVER DUPLICATE                                             │
│     Check for existing backup policies, replication configurations,    │
│     and DR documentation before creating new ones.                     │
│                                                                         │
│  3. USE EXISTING TECHNOLOGY                                             │
│     Use AWS native DR features (RDS Multi-AZ, S3 cross-region         │
│     replication, Route 53 failover). Do not introduce third-party      │
│     DR tools unless explicitly approved.                                │
│                                                                         │
│  4. ASK BEFORE ADDING ANYTHING NEW                                      │
│     Cross-region infrastructure doubles your AWS bill. Pilot light     │
│     and warm standby strategies require finance approval.              │
│                                                                         │
│  5. FOLLOW BEST PRACTICES                                               │
│     Test DR plans quarterly, document runbooks, automate failover      │
│     where possible, and measure actual RTO/RPO vs targets.             │
│                                                                         │
│  6. NO AI TOOL REFERENCES — ANYWHERE                                    │
│     Never mention AI tools, LLMs, or code assistants in code           │
│     comments, commit messages, documentation, or variable names.        │
│     The output must read as if written by a senior cloud engineer.      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1. RTO/RPO Definitions

```
┌──────────────────────────────────────────────────────────────────────┐
│                    RTO and RPO Explained                               │
│                                                                       │
│  Timeline:                                                            │
│                                                                       │
│  ──────────────────────┬──────────────────┬─────────────────────     │
│  Last good backup      │ Disaster occurs  │ Service restored          │
│  (data preserved)      │                  │                           │
│  ──────────────────────┴──────────────────┴─────────────────────     │
│                                                                       │
│  ◄──── RPO ────►                          ◄──── RTO ────►            │
│  Recovery Point                           Recovery Time               │
│  Objective                                Objective                   │
│                                                                       │
│  RPO = Maximum acceptable DATA LOSS                                   │
│        "How much data can we afford to lose?"                         │
│        RPO = 1 hour → Backups every hour minimum                     │
│        RPO = 0 → Synchronous replication required                    │
│                                                                       │
│  RTO = Maximum acceptable DOWNTIME                                    │
│        "How quickly must we be back online?"                          │
│        RTO = 4 hours → Cold standby is acceptable                    │
│        RTO = 15 min → Hot standby or multi-region active             │
└──────────────────────────────────────────────────────────────────────┘
```

### RTO/RPO by Service Tier

```
┌──────────────────────────────────────────────────────────────────────┐
│                Service Tier Classification                            │
│                                                                       │
│  Tier │ Services           │ RTO Target │ RPO Target │ Strategy      │
│  ──────────────────────────────────────────────────────────────      │
│  T1   │ API, Auth, DB      │ < 15 min   │ < 5 min    │ Multi-AZ     │
│       │ (Core platform)    │            │            │ + auto-fail  │
│  ──────────────────────────────────────────────────────────────      │
│  T2   │ Frontend, CDN,     │ < 1 hour   │ < 1 hour   │ Multi-AZ     │
│       │ File storage       │            │            │ + manual fail│
│  ──────────────────────────────────────────────────────────────      │
│  T3   │ Analytics, Reports │ < 4 hours  │ < 24 hours │ Backup +     │
│       │ Batch processing   │            │            │ restore      │
│  ──────────────────────────────────────────────────────────────      │
│  T4   │ Dev/staging envs   │ < 24 hours │ < 24 hours │ Rebuild from │
│       │ Internal tools     │            │            │ IaC + backup │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 2. DR Strategy Tiers

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DR Strategy Comparison                                │
│                                                                          │
│  Strategy         │ RTO      │ RPO      │ Monthly Cost │ Complexity     │
│  ────────────────────────────────────────────────────────────────       │
│  Backup & Restore │ 4-24 hr  │ 1-24 hr  │ $ (low)      │ Simple         │
│  Pilot Light      │ 1-4 hr   │ Minutes  │ $$ (moderate)│ Medium         │
│  Warm Standby     │ 10-30 min│ Minutes  │ $$$ (high)   │ High           │
│  Multi-Site Active│ < 1 min  │ Near-zero│ $$$$ (2x)    │ Very High      │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  Backup & Restore                                            │       │
│  │                                                               │       │
│  │  Primary Region (us-east-1)          DR Region (us-west-2)  │       │
│  │  ┌──────────────────┐               ┌───────────────────┐   │       │
│  │  │ Full stack        │   Backups →   │ S3 (snapshots)    │   │       │
│  │  │ running           │               │ (nothing running) │   │       │
│  │  └──────────────────┘               └───────────────────┘   │       │
│  │                                                               │       │
│  │  On disaster: Restore from snapshots, deploy infra via IaC  │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  Pilot Light                                                  │       │
│  │                                                               │       │
│  │  Primary Region (us-east-1)          DR Region (us-west-2)  │       │
│  │  ┌──────────────────┐               ┌───────────────────┐   │       │
│  │  │ Full stack        │   Replication │ RDS read replica  │   │       │
│  │  │ running           │   ──────────→ │ (data only, min   │   │       │
│  │  │                   │               │  compute running) │   │       │
│  │  └──────────────────┘               └───────────────────┘   │       │
│  │                                                               │       │
│  │  On disaster: Promote replica, scale up ECS, update DNS     │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  Warm Standby                                                 │       │
│  │                                                               │       │
│  │  Primary Region (us-east-1)          DR Region (us-west-2)  │       │
│  │  ┌──────────────────┐               ┌───────────────────┐   │       │
│  │  │ Full stack        │   Replication │ Reduced capacity   │   │       │
│  │  │ 3 ECS tasks       │   ──────────→ │ 1 ECS task         │   │       │
│  │  │ db.r6g.large      │               │ db.r6g.large       │   │       │
│  │  └──────────────────┘               └───────────────────┘   │       │
│  │                                                               │       │
│  │  On disaster: Scale up ECS tasks, promote DB, update DNS    │       │
│  └──────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Backup Strategy Implementation

### Database Backups

```hcl
# RDS automated backups (built-in)
resource "aws_db_instance" "main" {
  # ... other config ...

  # Automated backups
  backup_retention_period   = 30       # Keep 30 days of backups
  backup_window             = "03:00-04:00"  # 3-4 AM UTC
  copy_tags_to_snapshot     = true
  delete_automated_backups  = false    # Keep backups even if instance deleted
  skip_final_snapshot       = false    # Always create final snapshot on delete
  final_snapshot_identifier = "${local.project}-${local.environment}-final"
}

# Cross-region snapshot copy (for DR)
resource "aws_db_instance_automated_backups_replication" "dr" {
  source_db_instance_arn = aws_db_instance.main.arn
  retention_period       = 7  # Keep 7 days in DR region
  kms_key_id             = aws_kms_key.dr_region.arn

  provider = aws.dr_region  # us-west-2
}
```

### S3 Cross-Region Replication

```hcl
resource "aws_s3_bucket_replication_configuration" "uploads" {
  bucket = aws_s3_bucket.uploads.id
  role   = aws_iam_role.s3_replication.arn

  rule {
    id     = "replicate-all"
    status = "Enabled"

    filter {}  # Replicate everything

    destination {
      bucket        = aws_s3_bucket.uploads_dr.arn
      storage_class = "STANDARD_IA"  # Cheaper storage in DR region

      encryption_configuration {
        replica_kms_key_id = aws_kms_key.dr_region.arn
      }
    }

    delete_marker_replication {
      status = "Enabled"
    }
  }
}
```

---

## 4. Failover Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DNS Failover with Route 53                            │
│                                                                          │
│  Route 53: app.lmsht.com                                                │
│  ┌─────────────────────────────────────────┐                            │
│  │ Failover Routing Policy                  │                            │
│  │                                          │                            │
│  │ Primary → ALB us-east-1 (health check)  │                            │
│  │ Secondary → ALB us-west-2 (standby)     │                            │
│  └────────────┬───────────────┬─────────────┘                           │
│               │               │                                          │
│       ┌───────▼───────┐ ┌────▼────────────┐                            │
│       │  us-east-1    │ │  us-west-2      │                            │
│       │  (PRIMARY)    │ │  (DR STANDBY)   │                            │
│       │               │ │                  │                            │
│       │  ALB ──→ ECS  │ │  ALB ──→ ECS   │                            │
│       │  (3 tasks)    │ │  (0 tasks, or   │                            │
│       │               │ │   1 warm task)  │                            │
│       │  RDS Primary  │ │  RDS Replica    │                            │
│       │  (read/write) │ │  (read-only)    │                            │
│       │               │ │                  │                            │
│       │  Redis Primary│ │  Redis Replica  │                            │
│       │               │ │  (or new)       │                            │
│       └───────────────┘ └─────────────────┘                            │
│                                                                          │
│  On Failover:                                                            │
│  1. Route 53 health check fails for us-east-1 ALB                       │
│  2. DNS automatically routes to us-west-2 ALB                           │
│  3. Scale up ECS tasks in us-west-2                                     │
│  4. Promote RDS read replica to primary (manual)                        │
│  5. Update application configs if needed                                │
└─────────────────────────────────────────────────────────────────────────┘
```

### Route 53 Health Check and Failover

```hcl
resource "aws_route53_health_check" "primary" {
  fqdn              = "primary-alb.us-east-1.elb.amazonaws.com"
  port               = 443
  type               = "HTTPS"
  resource_path      = "/api/health"
  failure_threshold  = 3
  request_interval   = 30
  measure_latency    = true

  tags = {
    Name = "${local.project}-primary-health-check"
  }
}

resource "aws_route53_record" "app_primary" {
  zone_id         = aws_route53_zone.main.zone_id
  name            = "app.lmsht.com"
  type            = "A"
  set_identifier  = "primary"

  failover_routing_policy {
    type = "PRIMARY"
  }

  alias {
    name                   = aws_lb.primary.dns_name
    zone_id                = aws_lb.primary.zone_id
    evaluate_target_health = true
  }

  health_check_id = aws_route53_health_check.primary.id
}

resource "aws_route53_record" "app_secondary" {
  zone_id         = aws_route53_zone.main.zone_id
  name            = "app.lmsht.com"
  type            = "A"
  set_identifier  = "secondary"

  failover_routing_policy {
    type = "SECONDARY"
  }

  alias {
    name                   = aws_lb.secondary.dns_name
    zone_id                = aws_lb.secondary.zone_id
    evaluate_target_health = true
  }

  provider = aws.dr_region
}
```

---

## 5. Failover Runbook

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FAILOVER RUNBOOK                                       │
│                                                                          │
│  Trigger: Primary region (us-east-1) is unavailable                     │
│  Estimated RTO: 15-30 minutes (Pilot Light)                             │
│                                                                          │
│  STEP 1: Confirm Outage (2 min)                                        │
│  ────────────────────────────                                           │
│  □ Check AWS Health Dashboard for regional outage                       │
│  □ Verify ALB health checks are failing                                 │
│  □ Confirm application is unreachable from multiple locations           │
│  □ Notify incident commander and stakeholders                           │
│                                                                          │
│  STEP 2: Promote Database (5-10 min)                                    │
│  ────────────────────────────────                                       │
│  □ Promote RDS cross-region read replica to standalone:                 │
│    aws rds promote-read-replica-db-instance \                           │
│      --db-instance-identifier myapp-dr-postgres \                       │
│      --region us-west-2                                                  │
│  □ Wait for instance to become "available":                             │
│    aws rds wait db-instance-available \                                  │
│      --db-instance-identifier myapp-dr-postgres \                       │
│      --region us-west-2                                                  │
│  □ Update connection string in SSM Parameter Store (us-west-2)         │
│                                                                          │
│  STEP 3: Scale Up Compute (3-5 min)                                    │
│  ────────────────────────────────                                       │
│  □ Update ECS service desired count:                                    │
│    aws ecs update-service \                                              │
│      --cluster myapp-dr --service myapp-backend \                       │
│      --desired-count 3 --region us-west-2                               │
│  □ Wait for tasks to reach RUNNING state:                               │
│    aws ecs wait services-stable \                                        │
│      --cluster myapp-dr --services myapp-backend \                      │
│      --region us-west-2                                                  │
│                                                                          │
│  STEP 4: Verify DR Environment (2-3 min)                               │
│  ────────────────────────────────────                                    │
│  □ Check ALB target health in us-west-2                                 │
│  □ Hit health endpoint: curl https://dr-alb.us-west-2.elb/api/health  │
│  □ Run smoke tests against DR environment                               │
│  □ Verify database connectivity and data integrity                      │
│                                                                          │
│  STEP 5: Switch DNS (1-2 min)                                          │
│  ──────────────────────────                                              │
│  □ If Route 53 failover is automatic: verify DNS has switched          │
│  □ If manual: update Route 53 to point to us-west-2 ALB               │
│  □ Verify DNS propagation: dig app.lmsht.com                           │
│                                                                          │
│  STEP 6: Post-Failover                                                  │
│  ─────────────────────                                                   │
│  □ Monitor error rates in us-west-2                                     │
│  □ Notify stakeholders that service is restored                         │
│  □ Begin planning failback once primary region recovers                │
│  □ Document the incident timeline                                       │
│                                                                          │
│  STEP 7: Failback (when primary recovers)                               │
│  ─────────────────────────────────────                                   │
│  □ Create new RDS replica in us-east-1 from DR primary                 │
│  □ Wait for replica to catch up (check ReplicaLag metric)              │
│  □ Promote us-east-1 replica, switch DNS back                          │
│  □ Scale down us-west-2 to standby capacity                            │
│  □ Re-establish cross-region replication                                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. DR Testing Schedule

```
┌──────────────────────────────────────────────────────────────────────┐
│                    DR Testing Calendar                                 │
│                                                                       │
│  Test Type         │ Frequency   │ Scope              │ Duration     │
│  ──────────────────────────────────────────────────────────────      │
│  Backup restore    │ Monthly     │ Restore RDS snap   │ 2 hours      │
│  test              │             │ to new instance    │              │
│                    │             │ + verify data      │              │
│  ──────────────────────────────────────────────────────────────      │
│  Tabletop exercise │ Quarterly   │ Walk through       │ 1 hour       │
│                    │             │ runbook verbally   │              │
│  ──────────────────────────────────────────────────────────────      │
│  Component         │ Quarterly   │ Failover single    │ 4 hours      │
│  failover test     │             │ component (DB)     │              │
│  ──────────────────────────────────────────────────────────────      │
│  Full DR drill     │ Biannual    │ Full region fail   │ 8 hours      │
│                    │             │ + failback         │              │
│  ──────────────────────────────────────────────────────────────      │
│  Chaos engineering │ Continuous  │ Random failures    │ Ongoing      │
│  (optional)        │ (automated) │ in staging         │              │
└──────────────────────────────────────────────────────────────────────┘
```

### Monthly Backup Restore Test

```bash
#!/bin/bash
# monthly-backup-test.sh — Automated backup verification

set -euo pipefail

PROJECT="myapp"
ENVIRONMENT="production"
RESTORE_ID="${PROJECT}-backup-test-$(date +%Y%m%d)"

echo "=== Monthly Backup Restore Test ==="

# Step 1: Find latest automated snapshot
SNAPSHOT=$(aws rds describe-db-snapshots \
  --db-instance-identifier "${PROJECT}-${ENVIRONMENT}-postgres" \
  --snapshot-type automated \
  --query "DBSnapshots | sort_by(@, &SnapshotCreateTime) | [-1].DBSnapshotIdentifier" \
  --output text)

echo "Restoring from snapshot: ${SNAPSHOT}"

# Step 2: Restore to a test instance
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier "${RESTORE_ID}" \
  --db-snapshot-identifier "${SNAPSHOT}" \
  --db-instance-class db.t4g.micro \
  --db-subnet-group-name "${PROJECT}-${ENVIRONMENT}-db-subnet-group" \
  --no-multi-az \
  --no-publicly-accessible

echo "Waiting for restore to complete..."
aws rds wait db-instance-available \
  --db-instance-identifier "${RESTORE_ID}"

# Step 3: Run validation queries
ENDPOINT=$(aws rds describe-db-instances \
  --db-instance-identifier "${RESTORE_ID}" \
  --query "DBInstances[0].Endpoint.Address" --output text)

echo "Validating data integrity on ${ENDPOINT}..."
PGPASSWORD=<password> psql -h "${ENDPOINT}" -U myapp_admin -d myapp -c "
  SELECT
    (SELECT count(*) FROM users) as user_count,
    (SELECT count(*) FROM tenants) as tenant_count,
    (SELECT count(*) FROM courses) as course_count,
    (SELECT max(created_at) FROM users) as latest_user
;" 2>&1

# Step 4: Clean up test instance
echo "Cleaning up test instance..."
aws rds delete-db-instance \
  --db-instance-identifier "${RESTORE_ID}" \
  --skip-final-snapshot \
  --delete-automated-backups

echo "=== Backup Restore Test Complete ==="
```

---

## 7. Cost Implications

| DR Strategy | Additional Monthly Cost | Notes |
|-------------|------------------------|-------|
| Backup & Restore | ~$20-50 | S3 snapshot storage + cross-region transfer |
| Pilot Light | ~$200-400 | RDS cross-region replica + minimal compute |
| Warm Standby | ~$500-1000 | Reduced capacity running in DR region |
| Multi-Site Active | ~$1500-3000+ | Full duplicate infrastructure |
| Route 53 Health Checks | $0.50/check/month | Per health check endpoint |
| S3 Cross-Region Replication | $0.02/GB transfer | + destination storage |
| RDS Cross-Region Replica | Same as primary | Full instance cost in DR region |

---

## 8. Security Considerations

- Encrypt all backups and snapshots with KMS (use separate keys per region)
- Ensure DR region IAM roles follow same least-privilege model as primary
- Cross-region replication should use TLS in transit (default for AWS services)
- DR environment security groups must mirror primary configuration
- Test that DR environment has all required secrets in regional SSM/SecretsManager
- Audit DR access controls quarterly
- Ensure backup deletion requires MFA (S3 Object Lock, RDS deletion protection)

---

## 9. Common Mistakes / Anti-Patterns

| Mistake | Why It's Bad | Fix |
|---------|-------------|-----|
| Never testing DR plan | Discover failures during real disaster | Test quarterly at minimum |
| No documented runbook | Engineers scramble during outage | Write step-by-step runbook with commands |
| RTO/RPO not defined | Cannot design appropriate DR strategy | Define per service tier with business input |
| Backup but no restore test | Backups may be corrupt or incomplete | Monthly automated restore validation |
| Same region for backups | Region outage loses backups too | Cross-region snapshot replication |
| No DNS failover | Manual DNS changes take 30+ minutes | Use Route 53 failover routing |
| DR environment drift | DR config doesn't match production | Use Terraform for both, keep in sync |
| No failback procedure | Stuck in DR region after recovery | Document failback steps in runbook |
| Ignoring application state | Stateful services (Redis, sessions) lost | Plan for session re-creation or replication |
| Single person knows DR plan | Bus factor risk during outage | Cross-train team, run tabletop exercises |
