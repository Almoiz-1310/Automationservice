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
name: Write Terraform Modules
description: Write production-grade Terraform modules with proper input variables, outputs, state management using S3 and DynamoDB, workspaces, module composition, versioning, and infrastructure-as-code best practices.
---

# Write Terraform Modules

## Common Rules

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           COMMON RULES                                  │
│                                                                         │
│  1. UNDERSTAND BEFORE YOU BUILD                                         │
│     Read the existing Terraform codebase. Understand the module         │
│     structure, state backend configuration, and provider versions       │
│     before adding or modifying any infrastructure code.                 │
│                                                                         │
│  2. REUSE — NEVER DUPLICATE                                             │
│     Check for existing modules in the modules/ directory. Extend        │
│     existing modules with new variables rather than creating            │
│     near-identical copies.                                              │
│                                                                         │
│  3. USE EXISTING TECHNOLOGY                                             │
│     Use Terraform with the HCL language. Do not introduce Pulumi,      │
│     CDK, or CloudFormation unless explicitly approved.                  │
│                                                                         │
│  4. ASK BEFORE ADDING ANYTHING NEW                                      │
│     New providers, module registries, or remote state backends          │
│     require approval. These affect the entire infrastructure team.      │
│                                                                         │
│  5. FOLLOW BEST PRACTICES                                               │
│     Use remote state with locking, pin provider versions, validate     │
│     inputs, use meaningful resource names, and tag everything.          │
│                                                                         │
│  6. NO AI TOOL REFERENCES — ANYWHERE                                    │
│     Never mention AI tools, LLMs, or code assistants in code           │
│     comments, commit messages, documentation, or variable names.        │
│     The output must read as if written by a senior cloud engineer.      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Project Structure

```
infrastructure/
├── environments/
│   ├── production/
│   │   ├── main.tf           # Root module — composes all modules
│   │   ├── variables.tf      # Environment-specific variable declarations
│   │   ├── terraform.tfvars  # Environment-specific values
│   │   ├── outputs.tf        # Root-level outputs
│   │   ├── providers.tf      # Provider config + backend
│   │   └── versions.tf       # Required providers + versions
│   ├── staging/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── terraform.tfvars
│   │   ├── outputs.tf
│   │   ├── providers.tf
│   │   └── versions.tf
│   └── shared/               # Shared services (CI/CD, monitoring)
│       └── ...
├── modules/
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   ├── ecs-service/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   ├── rds/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   └── monitoring/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── README.md
└── global/
    ├── iam/                  # Account-level IAM roles
    ├── dns/                  # Route 53 hosted zones
    └── ecr/                  # ECR repositories (shared across envs)
```

---

## 2. State Management

### Remote State Backend Setup

```hcl
# environments/production/providers.tf

terraform {
  backend "s3" {
    bucket         = "myapp-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "myapp-terraform-locks"
    # Use a dedicated AWS profile for state access
    # profile      = "terraform-admin"
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "myapp"
      Environment = "production"
      ManagedBy   = "terraform"
      Repository  = "myorg/myapp-infrastructure"
    }
  }
}
```

### Bootstrap Script (One-Time Setup)

```bash
#!/bin/bash
# bootstrap-terraform-state.sh
# Run ONCE per AWS account to create state infrastructure

set -euo pipefail

PROJECT="myapp"
REGION="us-east-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "Creating Terraform state bucket..."
aws s3api create-bucket \
  --bucket "${PROJECT}-terraform-state" \
  --region "${REGION}"

# Enable versioning (recover from accidental state corruption)
aws s3api put-bucket-versioning \
  --bucket "${PROJECT}-terraform-state" \
  --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket "${PROJECT}-terraform-state" \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms"
      },
      "BucketKeyEnabled": true
    }]
  }'

# Block public access
aws s3api put-public-access-block \
  --bucket "${PROJECT}-terraform-state" \
  --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

echo "Creating DynamoDB lock table..."
aws dynamodb create-table \
  --table-name "${PROJECT}-terraform-locks" \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region "${REGION}"

echo "State infrastructure ready."
```

### State Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Terraform State Layout                        │
│                                                              │
│  S3 Bucket: myapp-terraform-state                            │
│  ├── production/terraform.tfstate                            │
│  ├── staging/terraform.tfstate                               │
│  ├── shared/terraform.tfstate                                │
│  └── global/iam/terraform.tfstate                            │
│                                                              │
│  DynamoDB: myapp-terraform-locks                             │
│  └── LockID: myapp-terraform-state/production/terraform...  │
│                                                              │
│  Key principles:                                             │
│  • One state file per environment (blast radius isolation)   │
│  • S3 versioning enabled (recover from corruption)           │
│  • DynamoDB locking (prevent concurrent modifications)       │
│  • KMS encryption at rest                                    │
│  • Cross-environment data via terraform_remote_state         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Module Design Patterns

### Module Interface (variables.tf)

```hcl
# modules/ecs-service/variables.tf

variable "project" {
  description = "Project name used for resource naming"
  type        = string

  validation {
    condition     = can(regex("^[a-z][a-z0-9-]{2,20}$", var.project))
    error_message = "Project name must be 3-21 lowercase alphanumeric characters with hyphens."
  }
}

variable "environment" {
  description = "Environment name (production, staging, development)"
  type        = string

  validation {
    condition     = contains(["production", "staging", "development"], var.environment)
    error_message = "Environment must be one of: production, staging, development."
  }
}

variable "vpc_id" {
  description = "VPC ID where the ECS service will be deployed"
  type        = string
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for ECS tasks"
  type        = list(string)

  validation {
    condition     = length(var.private_subnet_ids) >= 2
    error_message = "At least 2 private subnets required for high availability."
  }
}

variable "container_image" {
  description = "Full ECR image URI including tag (e.g., 123456.dkr.ecr.us-east-1.amazonaws.com/app:v1.0.0)"
  type        = string
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
  default     = 3001
}

variable "cpu" {
  description = "Fargate CPU units (256, 512, 1024, 2048, 4096)"
  type        = number
  default     = 512

  validation {
    condition     = contains([256, 512, 1024, 2048, 4096], var.cpu)
    error_message = "CPU must be one of: 256, 512, 1024, 2048, 4096."
  }
}

variable "memory" {
  description = "Fargate memory in MB"
  type        = number
  default     = 1024
}

variable "desired_count" {
  description = "Number of desired ECS tasks"
  type        = number
  default     = 2
}

variable "auto_scaling" {
  description = "Auto-scaling configuration"
  type = object({
    min_capacity = number
    max_capacity = number
    cpu_target   = number
  })
  default = {
    min_capacity = 2
    max_capacity = 10
    cpu_target   = 70
  }
}

variable "environment_variables" {
  description = "Map of environment variables for the container"
  type        = map(string)
  default     = {}
}

variable "secrets" {
  description = "Map of secret name to SSM/SecretsManager ARN"
  type        = map(string)
  default     = {}
  sensitive   = true
}

variable "health_check_path" {
  description = "HTTP path for ALB health checks"
  type        = string
  default     = "/api/health"
}

variable "tags" {
  description = "Additional tags for all resources"
  type        = map(string)
  default     = {}
}
```

### Module Implementation (main.tf)

```hcl
# modules/ecs-service/main.tf

locals {
  name_prefix = "${var.project}-${var.environment}"

  common_tags = merge(var.tags, {
    Module = "ecs-service"
  })
}

resource "aws_ecs_task_definition" "this" {
  family                   = "${local.name_prefix}-${var.project}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = aws_iam_role.execution.arn
  task_role_arn            = aws_iam_role.task.arn

  container_definitions = jsonencode([{
    name      = var.project
    image     = var.container_image
    essential = true

    portMappings = [{
      containerPort = var.container_port
      protocol      = "tcp"
    }]

    environment = [
      for k, v in var.environment_variables : { name = k, value = v }
    ]

    secrets = [
      for k, v in var.secrets : { name = k, valueFrom = v }
    ]

    healthCheck = {
      command     = ["CMD-SHELL", "curl -f http://localhost:${var.container_port}${var.health_check_path} || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 60
    }

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.this.name
        "awslogs-region"        = data.aws_region.current.name
        "awslogs-stream-prefix" = "ecs"
      }
    }

    linuxParameters = {
      initProcessEnabled = true
    }
  }])

  tags = local.common_tags
}

# ... (service, scaling, IAM roles follow the same pattern)

data "aws_region" "current" {}
data "aws_caller_identity" "current" {}
```

### Module Outputs (outputs.tf)

```hcl
# modules/ecs-service/outputs.tf

output "service_name" {
  description = "Name of the ECS service"
  value       = aws_ecs_service.this.name
}

output "service_arn" {
  description = "ARN of the ECS service"
  value       = aws_ecs_service.this.id
}

output "task_definition_arn" {
  description = "ARN of the current task definition"
  value       = aws_ecs_task_definition.this.arn
}

output "task_role_arn" {
  description = "ARN of the ECS task role (for additional policy attachments)"
  value       = aws_iam_role.task.arn
}

output "security_group_id" {
  description = "Security group ID of the ECS tasks"
  value       = aws_security_group.tasks.id
}

output "log_group_name" {
  description = "CloudWatch log group name"
  value       = aws_cloudwatch_log_group.this.name
}
```

---

## 4. Module Composition (Root Module)

```hcl
# environments/production/main.tf

module "vpc" {
  source = "../../modules/vpc"

  project     = var.project
  environment = var.environment
  vpc_cidr    = "10.0.0.0/16"
  azs         = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

module "backend" {
  source = "../../modules/ecs-service"

  project            = var.project
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  container_image    = "${data.aws_ecr_repository.backend.repository_url}:latest"
  container_port     = 3001
  cpu                = 512
  memory             = 1024
  desired_count      = 3

  auto_scaling = {
    min_capacity = 2
    max_capacity = 10
    cpu_target   = 70
  }

  environment_variables = {
    NODE_ENV = "production"
    PORT     = "3001"
  }

  secrets = {
    DATABASE_URL    = module.rds.connection_string_ssm_arn
    JWT_SECRET      = aws_ssm_parameter.jwt_secret.arn
    STRIPE_KEY      = aws_secretsmanager_secret.stripe.arn
  }

  health_check_path = "/api/health"
}

module "rds" {
  source = "../../modules/rds"

  project             = var.project
  environment         = var.environment
  vpc_id              = module.vpc.vpc_id
  isolated_subnet_ids = module.vpc.isolated_subnet_ids
  instance_class      = "db.r6g.large"
  multi_az            = true
  app_security_group_id = module.backend.security_group_id
}

module "monitoring" {
  source = "../../modules/monitoring"

  project     = var.project
  environment = var.environment
  sns_email   = "ops@mycompany.com"

  ecs_services = {
    backend  = module.backend.service_name
    frontend = module.frontend.service_name
  }

  rds_instance_id = module.rds.instance_id
}
```

---

## 5. Version Pinning

```hcl
# environments/production/versions.tf

terraform {
  required_version = ">= 1.7.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"  # Allow patch updates only
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}
```

---

## 6. Terraform Workflow

```
┌──────────────────────────────────────────────────────────────────────┐
│                    Terraform Deployment Workflow                       │
│                                                                       │
│  Developer                                                            │
│     │                                                                 │
│     ├─ 1. Write/modify .tf files                                     │
│     │                                                                 │
│     ├─ 2. terraform fmt -recursive                                   │
│     │     └─ Format all .tf files                                    │
│     │                                                                 │
│     ├─ 3. terraform validate                                         │
│     │     └─ Check syntax and type errors                            │
│     │                                                                 │
│     ├─ 4. terraform plan -out=plan.tfplan                            │
│     │     └─ Review what will change                                 │
│     │     └─ Save plan for deterministic apply                       │
│     │                                                                 │
│     ├─ 5. Code review (PR)                                           │
│     │     └─ Attach plan output to PR description                    │
│     │                                                                 │
│     ├─ 6. terraform apply plan.tfplan                                │
│     │     └─ Apply the exact reviewed plan                           │
│     │                                                                 │
│     └─ 7. Verify in AWS Console / CLI                                │
│           └─ Confirm resources match expectations                    │
│                                                                       │
│  NEVER run `terraform apply` without `-out` in production.           │
│  NEVER run `terraform destroy` without explicit approval.            │
└──────────────────────────────────────────────────────────────────────┘
```

### Essential Commands

```bash
# Initialize (download providers, configure backend)
terraform init

# Format all files
terraform fmt -recursive

# Validate syntax
terraform validate

# Plan with output file
terraform plan -out=plan.tfplan

# Apply saved plan (deterministic — no surprises)
terraform apply plan.tfplan

# Show current state
terraform state list
terraform state show aws_ecs_service.backend

# Import existing resource into state
terraform import aws_s3_bucket.uploads myapp-production-uploads

# Remove resource from state (without destroying)
terraform state rm aws_s3_bucket.old_bucket

# Taint resource for recreation
terraform taint aws_ecs_task_definition.backend

# Refresh state from AWS (detect drift)
terraform plan -refresh-only
```

---

## 7. Cost Implications

| Resource | Cost | Notes |
|----------|------|-------|
| S3 state bucket | ~$0.02/month | Negligible for state files |
| DynamoDB lock table | ~$0.25/month | Pay-per-request, minimal usage |
| Terraform Cloud (optional) | Free tier: 500 resources | Paid: $20/user/month |
| State file versioning | ~$0.01/month | S3 versioning is cheap |

---

## 8. Security Considerations

- Encrypt state at rest (S3 SSE-KMS)
- Enable S3 bucket versioning for state recovery
- Use DynamoDB locking to prevent concurrent modifications
- Never commit `*.tfstate` or `*.tfvars` with secrets to git
- Use `sensitive = true` on variable declarations for secrets
- Store secrets in SSM/SecretsManager, reference by ARN in Terraform
- Restrict state bucket access to authorized roles only
- Enable S3 access logging on the state bucket

---

## 9. Common Mistakes / Anti-Patterns

| Mistake | Why It's Bad | Fix |
|---------|-------------|-----|
| Local state file | Lost on machine failure, no locking | Use S3 + DynamoDB remote state |
| No version pinning | Provider updates can break things | Pin `required_providers` versions |
| Hardcoded values | Can't reuse across environments | Use variables with validation |
| Monolith state file | Blast radius is entire infrastructure | Split by environment/component |
| No `lifecycle` blocks | Accidental resource destruction | Use `prevent_destroy` for critical resources |
| `terraform apply` without plan file | Changes may differ from review | Always use `-out=plan.tfplan` |
| Secrets in `terraform.tfvars` | Committed to git, visible in state | Reference SSM/SecretsManager ARNs |
| No validation on variables | Invalid inputs cause runtime errors | Add `validation` blocks |
| Not using `data` sources | Hardcoded ARNs break across accounts | Use `data.aws_caller_identity`, etc. |
| Forgetting `terraform fmt` | Inconsistent formatting in PRs | Run `fmt -recursive` before commit |

---

## 10. Data Sources and Remote State

```hcl
# Read outputs from another state file
data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    bucket = "myapp-terraform-state"
    key    = "production/vpc/terraform.tfstate"
    region = "us-east-1"
  }
}

# Use in module
module "backend" {
  source             = "../../modules/ecs-service"
  vpc_id             = data.terraform_remote_state.vpc.outputs.vpc_id
  private_subnet_ids = data.terraform_remote_state.vpc.outputs.private_subnet_ids
}

# Dynamic data lookups
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
data "aws_availability_zones" "available" {
  state = "available"
}

# Look up existing resources
data "aws_ecr_repository" "backend" {
  name = "${var.project}-backend"
}

data "aws_acm_certificate" "main" {
  domain   = "*.lmsht.com"
  statuses = ["ISSUED"]
}
```
