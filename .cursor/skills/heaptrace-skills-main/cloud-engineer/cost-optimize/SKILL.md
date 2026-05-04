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
name: Audit AWS Costs
description: Audit and optimize AWS costs through right-sizing, reserved instances, savings plans, unused resource cleanup, S3 lifecycle policies, Compute Optimizer recommendations, cost allocation tags, and budget alerts.
---

# Audit AWS Costs

## Common Rules

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           COMMON RULES                                  │
│                                                                         │
│  1. UNDERSTAND BEFORE YOU BUILD                                         │
│     Review the current AWS bill breakdown. Understand which services   │
│     drive costs, what commitments exist (RIs, Savings Plans), and      │
│     the baseline monthly spend before recommending changes.            │
│                                                                         │
│  2. REUSE — NEVER DUPLICATE                                             │
│     Check for existing cost allocation tags, budgets, and billing      │
│     alarms. Do not create duplicate reporting structures.              │
│                                                                         │
│  3. USE EXISTING TECHNOLOGY                                             │
│     Use AWS Cost Explorer, Compute Optimizer, and Trusted Advisor.     │
│     Do not introduce third-party cost tools unless explicitly          │
│     approved.                                                           │
│                                                                         │
│  4. ASK BEFORE ADDING ANYTHING NEW                                      │
│     Savings Plans and Reserved Instances are 1-3 year commitments.     │
│     These require finance team approval before purchase.               │
│                                                                         │
│  5. FOLLOW BEST PRACTICES                                               │
│     Tag everything, review costs monthly, automate cleanup of unused   │
│     resources, and set budget alerts for anomaly detection.            │
│                                                                         │
│  6. NO AI TOOL REFERENCES — ANYWHERE                                    │
│     Never mention AI tools, LLMs, or code assistants in code           │
│     comments, commit messages, documentation, or variable names.        │
│     The output must read as if written by a senior cloud engineer.      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Cost Breakdown Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                 Typical SaaS AWS Cost Distribution                   │
│                                                                      │
│  Service             │ % of Bill │ Optimization Lever                │
│  ────────────────────────────────────────────────────────────       │
│  EC2/Fargate         │ 30-45%    │ Right-sizing, Savings Plans       │
│  RDS                 │ 15-25%    │ Right-sizing, Reserved Instances  │
│  NAT Gateway         │ 5-15%    │ VPC Endpoints, data flow          │
│  S3                  │ 5-10%    │ Lifecycle policies, storage class  │
│  CloudWatch          │ 3-8%     │ Log retention, metric resolution  │
│  Data Transfer       │ 3-10%    │ CloudFront, VPC endpoints         │
│  ALB                 │ 2-5%     │ Consolidate load balancers        │
│  ECR                 │ 1-3%     │ Image lifecycle policies           │
│  Other               │ 5-15%    │ Varies                             │
│                                                                      │
│  Top 3 levers (usually):                                             │
│  1. Right-size compute (EC2/Fargate/RDS)                            │
│  2. Commit to Savings Plans (1 or 3 year)                           │
│  3. Reduce NAT Gateway data processing                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Cost Audit Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Cost Audit Procedure                             │
│                                                                      │
│  Step 1: Gather Data                                                 │
│  │  ├─ AWS Cost Explorer (last 3 months, by service)                │
│  │  ├─ Compute Optimizer recommendations                            │
│  │  ├─ Trusted Advisor cost checks                                  │
│  │  └─ Resource inventory (running vs. needed)                      │
│  │                                                                   │
│  Step 2: Identify Quick Wins                                         │
│  │  ├─ Unused resources (unattached EBS, idle EIPs, old snapshots) │
│  │  ├─ Oversized instances (CPU < 20% average)                     │
│  │  ├─ Missing lifecycle policies (S3, ECR, CloudWatch)            │
│  │  └─ Dev/staging resources running 24/7                          │
│  │                                                                   │
│  Step 3: Plan Commitments                                            │
│  │  ├─ Calculate steady-state compute needs                         │
│  │  ├─ Evaluate Savings Plans vs Reserved Instances                 │
│  │  └─ Get finance approval before purchasing                       │
│  │                                                                   │
│  Step 4: Implement & Monitor                                         │
│  │  ├─ Apply changes (right-size, delete unused)                   │
│  │  ├─ Set budget alerts for anomaly detection                     │
│  │  └─ Schedule monthly cost reviews                                │
│  │                                                                   │
│  Step 5: Report                                                      │
│     └─ Document savings achieved vs baseline                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Right-Sizing Analysis

### Decision Tree

```
Current CPU utilization?
│
├─ Average < 10%
│   └─ Downsize by 2 tiers (e.g., xlarge → small)
│       ├─ Fargate: Halve vCPU and memory
│       └─ RDS: Drop 2 instance classes
│
├─ Average 10-30%
│   └─ Downsize by 1 tier (e.g., xlarge → large)
│       ├─ Watch for peak usage (p99)
│       └─ Ensure peak stays < 80% after downsize
│
├─ Average 30-70%
│   └─ Properly sized — no change needed
│       └─ Consider Savings Plan for cost commitment
│
├─ Average 70-85%
│   └─ At capacity — plan to upsize or add auto-scaling
│       └─ Check if auto-scaling is configured
│
└─ Average > 85%
    └─ Under-provisioned — upsize immediately
        └─ Risk of performance degradation or OOM
```

### Right-Sizing Commands

```bash
# ECS: Check Fargate task CPU/memory utilization
aws cloudwatch get-metric-statistics \
  --namespace AWS/ECS \
  --metric-name CPUUtilization \
  --dimensions Name=ClusterName,Value=myapp-production Name=ServiceName,Value=myapp-production-backend \
  --start-time $(date -u -d '7 days ago' +%Y-%m-%dT%H:%M:%SZ) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ) \
  --period 3600 \
  --statistics Average Maximum \
  --output table

# RDS: Check database CPU and connections
aws cloudwatch get-metric-statistics \
  --namespace AWS/RDS \
  --metric-name CPUUtilization \
  --dimensions Name=DBInstanceIdentifier,Value=myapp-production-postgres \
  --start-time $(date -u -d '30 days ago' +%Y-%m-%dT%H:%M:%SZ) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ) \
  --period 86400 \
  --statistics Average Maximum \
  --output table

# Compute Optimizer: Get ECS service recommendations
aws compute-optimizer get-ecs-service-recommendations \
  --service-arns "arn:aws:ecs:us-east-1:123456789012:service/production/myapp-backend" \
  --output json

# Compute Optimizer: Get EC2 recommendations (if using EC2)
aws compute-optimizer get-ec2-instance-recommendations \
  --instance-arns "arn:aws:ec2:us-east-1:123456789012:instance/i-1234567890abcdef0" \
  --output json
```

---

## 4. Savings Plans vs Reserved Instances

```
┌──────────────────────────────────────────────────────────────────────┐
│              Savings Plans vs Reserved Instances                       │
│                                                                       │
│  Feature            │ Savings Plans        │ Reserved Instances       │
│  ──────────────────────────────────────────────────────────────      │
│  Flexibility        │ High — any instance  │ Low — specific instance │
│                     │ type/region/OS       │ type/AZ/OS              │
│  Discount           │ Up to 72%            │ Up to 72%               │
│  Payment options    │ All/Partial/No upfrt │ All/Partial/No upfrt    │
│  Commitment         │ $/hour for 1-3 yrs   │ Instance count 1-3 yrs  │
│  Covers Fargate     │ Yes (Compute SP)     │ No                      │
│  Covers Lambda      │ Yes (Compute SP)     │ No                      │
│  Best for           │ Most workloads       │ Steady-state databases  │
│                                                                       │
│  RECOMMENDATION:                                                      │
│  • Compute Savings Plans for ECS/Fargate/Lambda                      │
│  • RDS Reserved Instances for databases (more predictable)           │
│  • Start with No Upfront to test, switch to All Upfront later       │
└──────────────────────────────────────────────────────────────────────┘
```

### Calculate Savings Plan Commitment

```bash
# View current on-demand spend for compute
aws ce get-cost-and-usage \
  --time-period Start=2026-01-01,End=2026-03-31 \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --filter '{
    "Dimensions": {
      "Key": "SERVICE",
      "Values": ["Amazon Elastic Container Service", "AWS Fargate", "Amazon Elastic Compute Cloud - Compute"]
    }
  }' \
  --output json

# Get Savings Plan purchase recommendations
aws ce get-savings-plans-purchase-recommendation \
  --savings-plans-type COMPUTE_SP \
  --term-in-years ONE_YEAR \
  --payment-option NO_UPFRONT \
  --lookback-period-in-days SIXTY_DAYS \
  --output json
```

---

## 5. Unused Resource Cleanup

### Resource Audit Checklist

```bash
# --- Unattached EBS Volumes ---
aws ec2 describe-volumes \
  --filters "Name=status,Values=available" \
  --query "Volumes[*].{ID:VolumeId,Size:Size,Type:VolumeType,Created:CreateTime}" \
  --output table
# Cost: $0.08/GB/month (gp3) — 100 GB unused = $8/month

# --- Unused Elastic IPs ---
aws ec2 describe-addresses \
  --query "Addresses[?AssociationId==null].{PublicIP:PublicIp,AllocationId:AllocationId}" \
  --output table
# Cost: $3.60/month per unattached EIP

# --- Old EBS Snapshots (> 90 days) ---
aws ec2 describe-snapshots --owner-ids self \
  --query "Snapshots[?StartTime<='2025-12-01'].{ID:SnapshotId,Size:VolumeSize,Started:StartTime,Description:Description}" \
  --output table
# Cost: $0.05/GB/month

# --- Unused NAT Gateways ---
aws ec2 describe-nat-gateways \
  --query "NatGateways[?State=='available'].{ID:NatGatewayId,SubnetId:SubnetId,State:State}" \
  --output table
# Cost: $32/month each + data processing

# --- Idle RDS Instances (< 5% CPU for 14 days) ---
aws cloudwatch get-metric-statistics \
  --namespace AWS/RDS \
  --metric-name CPUUtilization \
  --start-time $(date -u -d '14 days ago' +%Y-%m-%dT%H:%M:%SZ) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ) \
  --period 86400 --statistics Average \
  --dimensions Name=DBInstanceIdentifier,Value=myapp-staging-postgres \
  --output table

# --- Old ECR Images ---
aws ecr describe-images --repository-name myapp-backend \
  --query "imageDetails[?imagePushedAt<'2025-12-01'].{Tags:imageTags[0],Pushed:imagePushedAt,Size:imageSizeInBytes}" \
  --output table

# --- Unused Security Groups ---
aws ec2 describe-security-groups \
  --query "SecurityGroups[?length(IpPermissions)==\`0\` && length(IpPermissionsEgress)==\`1\`].{ID:GroupId,Name:GroupName}" \
  --output table
```

---

## 6. S3 Lifecycle Policies

```hcl
resource "aws_s3_bucket_lifecycle_configuration" "uploads" {
  bucket = aws_s3_bucket.uploads.id

  # Transition old uploads to cheaper storage
  rule {
    id     = "transition-old-uploads"
    status = "Enabled"

    filter {
      prefix = "tenants/"
    }

    transition {
      days          = 90
      storage_class = "STANDARD_IA"  # 45% cheaper, retrieval fee
    }

    transition {
      days          = 365
      storage_class = "GLACIER_IR"  # 68% cheaper, millisecond retrieval
    }
  }

  # Delete temporary upload chunks
  rule {
    id     = "cleanup-temp-uploads"
    status = "Enabled"

    filter {
      prefix = "temp/"
    }

    expiration {
      days = 1
    }
  }

  # Abort incomplete multipart uploads
  rule {
    id     = "abort-multipart"
    status = "Enabled"

    filter {}

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }

  # Clean up old versions (if versioning enabled)
  rule {
    id     = "cleanup-old-versions"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = 30
    }
  }
}
```

### S3 Storage Class Cost Comparison

```
┌──────────────────────────────────────────────────────────────────────┐
│                    S3 Storage Class Comparison                         │
│                                                                       │
│  Class              │ $/GB/month │ Retrieval  │ Use Case              │
│  ──────────────────────────────────────────────────────────────      │
│  Standard           │ $0.023     │ Free       │ Frequently accessed    │
│  Standard-IA        │ $0.0125    │ $0.01/GB   │ Monthly access         │
│  One Zone-IA        │ $0.010     │ $0.01/GB   │ Reproducible data      │
│  Glacier IR         │ $0.004     │ $0.03/GB   │ Quarterly access       │
│  Glacier Flexible   │ $0.0036    │ $0.03/GB   │ Annual access (hours)  │
│  Glacier Deep       │ $0.00099   │ $0.02/GB   │ Compliance archive     │
│  Intelligent-Tier   │ $0.0025    │ Varies     │ Unknown access pattern │
│                                                                       │
│  Example: 1 TB of data                                               │
│  Standard:      $23.00/month → $276/year                             │
│  Standard-IA:   $12.50/month → $150/year (save $126)                │
│  Glacier IR:    $4.00/month  → $48/year  (save $228)                │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 7. NAT Gateway Cost Reduction

```
NAT Gateway costs:
  Base: $0.045/hour = ~$32/month per NAT GW
  Data: $0.045/GB processed

Common causes of high NAT costs:
│
├─ S3 access from private subnets
│   └─ Fix: S3 Gateway Endpoint (FREE, no NAT needed)
│
├─ DynamoDB access from private subnets
│   └─ Fix: DynamoDB Gateway Endpoint (FREE)
│
├─ ECR image pulls
│   └─ Fix: ECR VPC Endpoint (~$7.20/month per AZ vs $32 NAT)
│       └─ Need: com.amazonaws.us-east-1.ecr.api
│       └─ Need: com.amazonaws.us-east-1.ecr.dkr
│       └─ Need: com.amazonaws.us-east-1.s3 (gateway, free)
│
├─ CloudWatch Logs
│   └─ Fix: CloudWatch VPC Endpoint (~$7.20/month per AZ)
│
└─ SSM/Secrets Manager
    └─ Fix: SSM VPC Endpoint (~$7.20/month per AZ)
```

### VPC Endpoints Terraform

```hcl
# S3 Gateway Endpoint (FREE — always set this up)
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.us-east-1.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = aws_route_table.private[*].id

  tags = {
    Name = "${local.project}-${local.environment}-s3-endpoint"
  }
}

# DynamoDB Gateway Endpoint (FREE)
resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.us-east-1.dynamodb"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = aws_route_table.private[*].id

  tags = {
    Name = "${local.project}-${local.environment}-dynamodb-endpoint"
  }
}

# ECR Interface Endpoint (reduces NAT data charges)
resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.us-east-1.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = aws_subnet.private[*].id
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true

  tags = {
    Name = "${local.project}-${local.environment}-ecr-api-endpoint"
  }
}
```

---

## 8. Cost Allocation Tags

```hcl
# Enforce cost allocation tags on all resources
resource "aws_organizations_policy" "require_tags" {
  name        = "require-cost-allocation-tags"
  description = "Enforce cost allocation tagging"
  type        = "TAG_POLICY"

  content = jsonencode({
    tags = {
      Project = {
        tag_key = {
          "@@assign" = "Project"
        }
        enforced_for = {
          "@@assign" = [
            "ec2:instance",
            "ec2:volume",
            "rds:db",
            "s3:bucket",
            "ecs:service",
            "elasticloadbalancing:loadbalancer",
          ]
        }
      }
      Environment = {
        tag_key = {
          "@@assign" = "Environment"
        }
        tag_value = {
          "@@assign" = ["production", "staging", "development"]
        }
      }
    }
  })
}
```

### Required Tags

```
┌──────────────────────────────────────────────────────────────────────┐
│                  Cost Allocation Tag Standard                         │
│                                                                       │
│  Tag Key      │ Required │ Example Values         │ Purpose           │
│  ──────────────────────────────────────────────────────────────      │
│  Project      │ Yes      │ myapp, website, api    │ Group by product  │
│  Environment  │ Yes      │ production, staging    │ Env cost split    │
│  Service      │ Yes      │ backend, frontend, db  │ Service breakdown │
│  Team         │ Optional │ engineering, platform  │ Team charge-back  │
│  CostCenter   │ Optional │ CC-1234                │ Finance mapping   │
│  ManagedBy    │ Yes      │ terraform, manual      │ Drift detection   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 9. Budget Alerts

```hcl
resource "aws_budgets_budget" "monthly" {
  name              = "${local.project}-monthly-budget"
  budget_type       = "COST"
  limit_amount      = "500"
  limit_unit        = "USD"
  time_unit         = "MONTHLY"
  time_period_start = "2026-01-01_00:00"

  cost_filter {
    name   = "TagKeyValue"
    values = ["user:Project$${local.project}"]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = ["ops@mycompany.com"]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["ops@mycompany.com", "cto@mycompany.com"]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 120
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["ops@mycompany.com", "cto@mycompany.com", "finance@mycompany.com"]
  }
}

# Anomaly detection
resource "aws_ce_anomaly_monitor" "main" {
  name              = "${local.project}-cost-anomaly-monitor"
  monitor_type      = "DIMENSIONAL"
  monitor_dimension = "SERVICE"
}

resource "aws_ce_anomaly_subscription" "main" {
  name = "${local.project}-cost-anomaly-alerts"

  monitor_arn_list = [aws_ce_anomaly_monitor.main.arn]

  subscriber {
    type    = "EMAIL"
    address = "ops@mycompany.com"
  }

  threshold_expression {
    dimension {
      key           = "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
      values        = ["50"]  # Alert if anomaly > $50
      match_options = ["GREATER_THAN_OR_EQUAL"]
    }
  }

  frequency = "DAILY"
}
```

---

## 10. Monthly Cost Review Checklist

```
□ Review Cost Explorer — compare to last month, identify spikes
□ Check Compute Optimizer — apply right-sizing recommendations
□ Check Trusted Advisor — review cost optimization findings
□ Review unattached EBS volumes — delete or snapshot
□ Review unused Elastic IPs — release unattached
□ Review old snapshots — delete beyond retention policy
□ Review ECR images — verify lifecycle policies working
□ Review CloudWatch log retention — ensure policies set
□ Check NAT Gateway data processing — look for VPC endpoint opportunities
□ Review Savings Plans utilization — ensure coverage matches usage
□ Check for staging resources left running — shut down overnight
□ Review data transfer costs — look for cross-region or internet egress
```

---

## 11. Common Mistakes / Anti-Patterns

| Mistake | Why It's Bad | Fix |
|---------|-------------|-----|
| No cost allocation tags | Cannot attribute costs to teams/projects | Tag everything with Project, Environment, Service |
| Buying 3-year RI too early | Locked in if architecture changes | Start with 1-year No Upfront, evaluate |
| Staging runs 24/7 | 70% of staging hours are unused | Schedule scaling to 0 outside work hours |
| No S3 lifecycle policy | Data grows forever, costs increase | Transition to IA after 90 days, Glacier after 365 |
| No budget alerts | Cost spikes go unnoticed for weeks | Set 80%, 100%, 120% budget notifications |
| Oversized dev instances | Dev doesn't need r6g.xlarge | Use t4g.micro for dev, t4g.small for staging |
| NAT Gateway for S3 access | Paying $0.045/GB for every S3 call | Use S3 Gateway Endpoint (free) |
| No ECR lifecycle policy | Old images accumulate indefinitely | Keep last 20 tagged, delete untagged after 7 days |
| All Upfront RI without analysis | Cash tied up if needs change | Start with No Upfront, upgrade after 6 months |
| Ignoring data transfer costs | Cross-AZ and internet egress add up | Use CloudFront, VPC endpoints, same-AZ affinity |
