# Pilot tuning runbook

## Goal

Validate quality on 10-20 historical Jira feature requests before enabling fully automatic posting.

## Pilot workflow

1. Pick representative historical tickets across low/medium/high complexity.
2. Replay each issue payload to `POST /webhooks/jira` in a staging environment.
3. Capture output comment and compare against expected engineering assessment.
4. Record false positives/negatives in a shared tracker.
5. Refine keyword extraction limits and prompt wording.

## Acceptance bar

- At least 90% of pilot tickets produce a complete report with all required sections.
- Duplicate delivery test produces no extra comments.
- Engineering reviewers mark at least 80% reports as directionally useful.

## Review checklist

- Verdict quality (`likely_feasible`, `needs_spike`, `not_feasible`).
- Affected components are grounded in real repository paths.
- Effort estimate includes confidence level.
- Risks and open questions are specific and actionable.
