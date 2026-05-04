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
name: Set Up CloudWatch Monitoring
description: Set up comprehensive CloudWatch monitoring with custom metrics, alarms, dashboards, log groups, log insights queries, SNS alerts, composite alarms, and actionable alerting strategies for production workloads.
---

# Set Up CloudWatch Monitoring

## Common Rules

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           COMMON RULES                                  │
│                                                                         │
│  1. UNDERSTAND BEFORE YOU BUILD                                         │
│     Read the existing monitoring setup. Check existing alarms,          │
│     dashboards, and log groups before creating new ones. Understand     │
│     which metrics matter for the specific workload.                     │
│                                                                         │
│  2. REUSE — NEVER DUPLICATE                                             │
│     Check for existing SNS topics, dashboards, and alarm patterns.     │
│     Add widgets to existing dashboards rather than creating new ones.  │
│                                                                         │
│  3. USE EXISTING TECHNOLOGY                                             │
│     Use CloudWatch native features. Do not introduce Datadog,          │
│     Grafana, or New Relic unless explicitly approved.                   │
│                                                                         │
│  4. ASK BEFORE ADDING ANYTHING NEW                                      │
│     New SNS topics, PagerDuty integrations, or cross-account           │
│     monitoring require approval. Alert fatigue is a real risk.         │
│                                                                         │
│  5. FOLLOW BEST PRACTICES                                               │
│     Use composite alarms to reduce noise, set proper thresholds,       │
│     log at the right level, and create runbooks for every alarm.       │
│                                                                         │
│  6. NO AI TOOL REFERENCES — ANYWHERE                                    │
│     Never mention AI tools, LLMs, or code assistants in code           │
│     comments, commit messages, documentation, or variable names.        │
│     The output must read as if written by a senior cloud engineer.      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Monitoring Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Monitoring Architecture                              │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  Data Sources                                                 │       │
│  │                                                               │       │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌───────┐ │       │
│  │  │  ECS   │  │  RDS   │  │  ALB   │  │  NAT   │  │  App  │ │       │
│  │  │Metrics │  │Metrics │  │Metrics │  │Metrics │  │ Logs  │ │       │
│  │  └───┬────┘  └───┬────┘  └───┬────┘  └───┬────┘  └───┬───┘ │       │
│  └──────┼───────────┼───────────┼───────────┼───────────┼──────┘       │
│         │           │           │           │           │                │
│         ▼           ▼           ▼           ▼           ▼                │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  CloudWatch                                                   │       │
│  │  ┌──────────────────┐  ┌──────────────────┐                  │       │
│  │  │  Metrics          │  │  Log Groups       │                  │       │
│  │  │  - AWS/ECS        │  │  - /ecs/backend   │                  │       │
│  │  │  - AWS/RDS        │  │  - /ecs/frontend  │                  │       │
│  │  │  - AWS/ALB        │  │  - /aws/rds       │                  │       │
│  │  │  - Custom/App     │  │  - /aws/vpc/flow  │                  │       │
│  │  └────────┬─────────┘  └────────┬─────────┘                  │       │
│  │           │                      │                             │       │
│  │  ┌────────▼─────────┐  ┌────────▼─────────┐                  │       │
│  │  │  Alarms           │  │  Log Insights     │                  │       │
│  │  │  - CPU > 80%      │  │  Queries           │                  │       │
│  │  │  - 5xx > 10/min   │  │  - Error patterns  │                  │       │
│  │  │  - Disk < 10GB    │  │  - Slow queries    │                  │       │
│  │  │  - Latency > 2s   │  │  - Request rates   │                  │       │
│  │  └────────┬─────────┘  └──────────────────┘                  │       │
│  │           │                                                    │       │
│  │  ┌────────▼─────────┐                                        │       │
│  │  │  Composite Alarms │                                        │       │
│  │  │  (reduce noise)   │                                        │       │
│  │  └────────┬─────────┘                                        │       │
│  └───────────┼──────────────────────────────────────────────────┘       │
│              │                                                           │
│              ▼                                                           │
│  ┌──────────────────────┐  ┌──────────────────┐                         │
│  │  SNS Topic           │  │  Dashboard        │                         │
│  │  ├── Email            │  │  (Operational)    │                         │
│  │  ├── Slack webhook   │  │                    │                         │
│  │  └── PagerDuty       │  │                    │                         │
│  └──────────────────────┘  └──────────────────┘                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Alert Tiers and Response

```
┌──────────────────────────────────────────────────────────────────────┐
│                    Alert Severity Matrix                               │
│                                                                       │
│  Tier │ Severity  │ Response Time │ Channel        │ Example          │
│  ──────────────────────────────────────────────────────────────      │
│  P1   │ Critical  │ < 15 min      │ PagerDuty page │ Service down     │
│       │           │               │ + Slack #prod   │ 5xx > 50/min     │
│       │           │               │                │ DB unreachable   │
│  ──────────────────────────────────────────────────────────────      │
│  P2   │ High      │ < 1 hour      │ Slack #alerts  │ CPU > 90%        │
│       │           │               │ + Email        │ Memory > 90%     │
│       │           │               │                │ Disk < 5GB       │
│  ──────────────────────────────────────────────────────────────      │
│  P3   │ Warning   │ Next bus day  │ Slack #ops     │ CPU > 70%        │
│       │           │               │                │ 4xx spike        │
│       │           │               │                │ Replica lag > 30s│
│  ──────────────────────────────────────────────────────────────      │
│  P4   │ Info      │ Weekly review │ Dashboard only │ Cost anomaly     │
│       │           │               │                │ Traffic trends   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. SNS Topics and Subscriptions

```hcl
# Critical alerts (P1) — PagerDuty + Slack
resource "aws_sns_topic" "critical" {
  name = "${local.project}-${local.environment}-critical-alerts"

  tags = {
    Name     = "${local.project}-${local.environment}-critical-alerts"
    Severity = "critical"
  }
}

resource "aws_sns_topic_subscription" "critical_email" {
  topic_arn = aws_sns_topic.critical.arn
  protocol  = "email"
  endpoint  = "oncall@mycompany.com"
}

resource "aws_sns_topic_subscription" "critical_slack" {
  topic_arn = aws_sns_topic.critical.arn
  protocol  = "https"
  endpoint  = "https://hooks.slack.com/services/T00000/B00000/XXXXX"
}

# Warning alerts (P2-P3) — Slack + Email
resource "aws_sns_topic" "warning" {
  name = "${local.project}-${local.environment}-warning-alerts"
}

resource "aws_sns_topic_subscription" "warning_email" {
  topic_arn = aws_sns_topic.warning.arn
  protocol  = "email"
  endpoint  = "ops-team@mycompany.com"
}
```

---

## 4. ECS Service Alarms

```hcl
# CPU utilization
resource "aws_cloudwatch_metric_alarm" "ecs_cpu_high" {
  alarm_name          = "${local.project}-${local.environment}-backend-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 3
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Backend ECS CPU > 80% for 15 minutes. Check auto-scaling or optimize code."

  dimensions = {
    ClusterName = "${local.project}-${local.environment}"
    ServiceName = "${local.project}-${local.environment}-backend"
  }

  alarm_actions = [aws_sns_topic.warning.arn]
  ok_actions    = [aws_sns_topic.warning.arn]

  tags = {
    Severity = "P2"
    Runbook  = "https://wiki.internal/runbooks/ecs-cpu-high"
  }
}

# Memory utilization
resource "aws_cloudwatch_metric_alarm" "ecs_memory_high" {
  alarm_name          = "${local.project}-${local.environment}-backend-memory-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 3
  metric_name         = "MemoryUtilization"
  namespace           = "AWS/ECS"
  period              = 300
  statistic           = "Average"
  threshold           = 85
  alarm_description   = "Backend ECS Memory > 85% for 15 min. Risk of OOM kill. Check for memory leaks."

  dimensions = {
    ClusterName = "${local.project}-${local.environment}"
    ServiceName = "${local.project}-${local.environment}-backend"
  }

  alarm_actions = [aws_sns_topic.warning.arn]
  ok_actions    = [aws_sns_topic.warning.arn]

  tags = { Severity = "P2" }
}

# Running task count (service health)
resource "aws_cloudwatch_metric_alarm" "ecs_running_tasks" {
  alarm_name          = "${local.project}-${local.environment}-backend-tasks-low"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 1
  metric_name         = "RunningTaskCount"
  namespace           = "ECS/ContainerInsights"
  period              = 60
  statistic           = "Average"
  threshold           = 1
  alarm_description   = "CRITICAL: Backend has fewer than 1 running task. Service may be down."

  dimensions = {
    ClusterName = "${local.project}-${local.environment}"
    ServiceName = "${local.project}-${local.environment}-backend"
  }

  alarm_actions = [aws_sns_topic.critical.arn]
  ok_actions    = [aws_sns_topic.critical.arn]

  tags = { Severity = "P1" }
}
```

---

## 5. ALB Alarms

```hcl
# 5xx errors (server errors)
resource "aws_cloudwatch_metric_alarm" "alb_5xx" {
  alarm_name          = "${local.project}-${local.environment}-alb-5xx-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Sum"
  threshold           = 10
  alarm_description   = "More than 10 5xx errors per minute. Check application logs for errors."
  treat_missing_data  = "notBreaching"

  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }

  alarm_actions = [aws_sns_topic.critical.arn]
  ok_actions    = [aws_sns_topic.critical.arn]

  tags = { Severity = "P1" }
}

# Response time (latency)
resource "aws_cloudwatch_metric_alarm" "alb_latency" {
  alarm_name          = "${local.project}-${local.environment}-alb-latency-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 3
  metric_name         = "TargetResponseTime"
  namespace           = "AWS/ApplicationELB"
  period              = 300
  extended_statistic  = "p99"
  threshold           = 2.0  # 2 second p99 latency
  alarm_description   = "P99 latency > 2 seconds for 15 minutes. Check slow queries or resource exhaustion."

  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }

  alarm_actions = [aws_sns_topic.warning.arn]
  ok_actions    = [aws_sns_topic.warning.arn]

  tags = { Severity = "P2" }
}

# Unhealthy targets
resource "aws_cloudwatch_metric_alarm" "alb_unhealthy" {
  alarm_name          = "${local.project}-${local.environment}-alb-unhealthy-targets"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "UnHealthyHostCount"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Maximum"
  threshold           = 0
  alarm_description   = "ALB has unhealthy targets. Check target group health and ECS task logs."

  dimensions = {
    LoadBalancer  = aws_lb.main.arn_suffix
    TargetGroup   = aws_lb_target_group.backend.arn_suffix
  }

  alarm_actions = [aws_sns_topic.warning.arn]

  tags = { Severity = "P2" }
}
```

---

## 6. Composite Alarms (Reduce Alert Noise)

```hcl
# Only alert when BOTH CPU is high AND 5xx errors are occurring
# This avoids alerting on CPU spikes that don't impact users
resource "aws_cloudwatch_composite_alarm" "backend_degraded" {
  alarm_name = "${local.project}-${local.environment}-backend-degraded"

  alarm_rule = "ALARM(\"${aws_cloudwatch_metric_alarm.ecs_cpu_high.alarm_name}\") AND ALARM(\"${aws_cloudwatch_metric_alarm.alb_5xx.alarm_name}\")"

  alarm_description = "CRITICAL: Backend is both CPU-saturated AND returning 5xx errors. This indicates the service is degraded and users are impacted."

  alarm_actions = [aws_sns_topic.critical.arn]
  ok_actions    = [aws_sns_topic.critical.arn]

  tags = {
    Severity = "P1"
    Runbook  = "https://wiki.internal/runbooks/backend-degraded"
  }
}

# Service down: No running tasks AND unhealthy ALB targets
resource "aws_cloudwatch_composite_alarm" "backend_down" {
  alarm_name = "${local.project}-${local.environment}-backend-down"

  alarm_rule = "ALARM(\"${aws_cloudwatch_metric_alarm.ecs_running_tasks.alarm_name}\") AND ALARM(\"${aws_cloudwatch_metric_alarm.alb_unhealthy.alarm_name}\")"

  alarm_description = "CRITICAL: Backend service is DOWN. No healthy tasks running, ALB cannot route traffic."

  alarm_actions = [aws_sns_topic.critical.arn]
  ok_actions    = [aws_sns_topic.critical.arn]

  tags = { Severity = "P1" }
}
```

---

## 7. Log Groups and Log Insights

### Log Group Configuration

```hcl
resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${local.project}-${local.environment}-backend"
  retention_in_days = local.environment == "production" ? 30 : 7

  tags = {
    Service     = "backend"
    Environment = local.environment
  }
}

resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/${local.project}-${local.environment}-frontend"
  retention_in_days = local.environment == "production" ? 30 : 7

  tags = {
    Service     = "frontend"
    Environment = local.environment
  }
}
```

### Log Insights Queries

```
# Error rate over time (paste into CloudWatch Logs Insights)
fields @timestamp, @message
| filter @message like /ERROR|error|Error/
| stats count() as errorCount by bin(5m) as timeWindow
| sort timeWindow desc

# Slow API requests (> 1 second)
fields @timestamp, @message
| parse @message '"method":"*","url":"*","statusCode":*,"responseTime":*' as method, url, status, responseTime
| filter responseTime > 1000
| sort responseTime desc
| limit 50

# Top error messages
fields @timestamp, @message
| filter @message like /ERROR/
| parse @message '"message":"*"' as errorMessage
| stats count() as frequency by errorMessage
| sort frequency desc
| limit 20

# Request volume by endpoint
fields @timestamp, @message
| parse @message '"method":"*","url":"*","statusCode":*' as method, url, status
| stats count() as requests by method, url
| sort requests desc
| limit 30

# 5xx responses with details
fields @timestamp, @message
| parse @message '"statusCode":*,"responseTime":*' as status, responseTime
| filter status >= 500
| sort @timestamp desc
| limit 50

# Memory usage patterns (for detecting leaks)
fields @timestamp, @message
| parse @message '"heapUsed":*,"heapTotal":*' as heapUsed, heapTotal
| stats avg(heapUsed) as avgHeap, max(heapUsed) as maxHeap by bin(10m)
| sort @timestamp desc
```

---

## 8. CloudWatch Dashboard

```hcl
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "${local.project}-${local.environment}-operations"

  dashboard_body = jsonencode({
    widgets = [
      # Row 1: Service Health
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 6
        height = 6
        properties = {
          title   = "ECS CPU Utilization"
          metrics = [
            ["AWS/ECS", "CPUUtilization", "ClusterName", "${local.project}-${local.environment}", "ServiceName", "${local.project}-${local.environment}-backend", { stat = "Average" }],
            ["AWS/ECS", "CPUUtilization", "ClusterName", "${local.project}-${local.environment}", "ServiceName", "${local.project}-${local.environment}-frontend", { stat = "Average" }],
          ]
          period = 300
          yAxis = { left = { min = 0, max = 100 } }
        }
      },
      {
        type   = "metric"
        x      = 6
        y      = 0
        width  = 6
        height = 6
        properties = {
          title   = "ECS Memory Utilization"
          metrics = [
            ["AWS/ECS", "MemoryUtilization", "ClusterName", "${local.project}-${local.environment}", "ServiceName", "${local.project}-${local.environment}-backend"],
            ["AWS/ECS", "MemoryUtilization", "ClusterName", "${local.project}-${local.environment}", "ServiceName", "${local.project}-${local.environment}-frontend"],
          ]
          period = 300
          yAxis = { left = { min = 0, max = 100 } }
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 0
        width  = 6
        height = 6
        properties = {
          title   = "ALB Response Time (p50, p95, p99)"
          metrics = [
            ["AWS/ApplicationELB", "TargetResponseTime", "LoadBalancer", aws_lb.main.arn_suffix, { stat = "p50", label = "p50" }],
            ["...", { stat = "p95", label = "p95" }],
            ["...", { stat = "p99", label = "p99" }],
          ]
          period = 300
        }
      },
      {
        type   = "metric"
        x      = 18
        y      = 0
        width  = 6
        height = 6
        properties = {
          title   = "ALB Request Count & Errors"
          metrics = [
            ["AWS/ApplicationELB", "RequestCount", "LoadBalancer", aws_lb.main.arn_suffix, { stat = "Sum", label = "Total" }],
            ["AWS/ApplicationELB", "HTTPCode_Target_5XX_Count", "LoadBalancer", aws_lb.main.arn_suffix, { stat = "Sum", label = "5xx", color = "#d62728" }],
            ["AWS/ApplicationELB", "HTTPCode_Target_4XX_Count", "LoadBalancer", aws_lb.main.arn_suffix, { stat = "Sum", label = "4xx", color = "#ff7f0e" }],
          ]
          period = 300
        }
      },
      # Row 2: Database
      {
        type   = "metric"
        x      = 0
        y      = 6
        width  = 8
        height = 6
        properties = {
          title   = "RDS CPU & Connections"
          metrics = [
            ["AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", "${local.project}-${local.environment}-postgres", { stat = "Average", label = "CPU %" }],
            ["AWS/RDS", "DatabaseConnections", "DBInstanceIdentifier", "${local.project}-${local.environment}-postgres", { stat = "Average", label = "Connections", yAxis = "right" }],
          ]
          period = 300
        }
      },
      {
        type   = "metric"
        x      = 8
        y      = 6
        width  = 8
        height = 6
        properties = {
          title   = "RDS Read/Write Latency"
          metrics = [
            ["AWS/RDS", "ReadLatency", "DBInstanceIdentifier", "${local.project}-${local.environment}-postgres"],
            ["AWS/RDS", "WriteLatency", "DBInstanceIdentifier", "${local.project}-${local.environment}-postgres"],
          ]
          period = 300
        }
      },
      {
        type   = "metric"
        x      = 16
        y      = 6
        width  = 8
        height = 6
        properties = {
          title   = "RDS Free Storage"
          metrics = [
            ["AWS/RDS", "FreeStorageSpace", "DBInstanceIdentifier", "${local.project}-${local.environment}-postgres"],
          ]
          period = 300
        }
      },
    ]
  })
}
```

---

## 9. Cost Implications

| Resource | Cost | Notes |
|----------|------|-------|
| CloudWatch metrics (AWS default) | Free | Standard metrics (5 min resolution) |
| CloudWatch custom metrics | $0.30/metric/month | First 10 free |
| CloudWatch alarms (standard) | $0.10/alarm/month | Per alarm |
| CloudWatch alarms (high-res) | $0.30/alarm/month | 10-second resolution |
| CloudWatch Logs (ingestion) | $0.50/GB | Can add up fast with verbose logging |
| CloudWatch Logs (storage) | $0.03/GB/month | Set retention policies |
| CloudWatch Dashboards | $3/dashboard/month | First 3 free |
| Container Insights | ~$0.30/task/month | Per ECS task |
| SNS notifications | Free (email/HTTP) | SMS costs $0.0075/msg |

### Cost Optimization

- Set log retention to 7 days for staging, 30 days for production
- Use metric filters instead of querying raw logs repeatedly
- Avoid 1-second resolution metrics unless genuinely needed
- Consolidate related metrics into composite alarms (fewer alarms)
- Use `treat_missing_data = "notBreaching"` to avoid false alarms on low-traffic periods

---

## 10. Common Mistakes / Anti-Patterns

| Mistake | Why It's Bad | Fix |
|---------|-------------|-----|
| Alerting on every metric | Alert fatigue, team ignores alerts | Use composite alarms, tier by severity |
| No `ok_actions` on alarms | Never know when issue resolves | Add ok_actions to auto-clear notifications |
| Unlimited log retention | CloudWatch costs grow unbounded | Set `retention_in_days` on every log group |
| Missing `treat_missing_data` | Alarms fire during low-traffic periods | Set to `notBreaching` for count-based metrics |
| No runbook links in alarm descriptions | Engineers scramble during incidents | Add wiki/runbook URL to every alarm |
| Threshold too sensitive | Alarms on normal traffic spikes | Use 3+ evaluation periods, higher thresholds |
| Not using p99 for latency | Average latency hides tail issues | Use `extended_statistic = "p99"` |
| Single SNS topic for all alerts | Everything goes to same channel | Separate topics by severity (critical/warning) |
| Logging at DEBUG level in production | Massive log ingestion costs | Use INFO level, enable DEBUG temporarily |
| Dashboard with 50+ widgets | Information overload, slow to load | Focus on key metrics, one dashboard per concern |
