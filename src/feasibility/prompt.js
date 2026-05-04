export function buildFeasibilityPrompt({ issue, snippets }) {
  const issueSummary = issue?.fields?.summary || "";
  const issueDescription = stringifyDescription(issue?.fields?.description);
  const codeContext = snippets
    .map(
      (snippet, index) =>
        `### Snippet ${index + 1}\nPath: ${snippet.path}\n${snippet.snippet}`
    )
    .join("\n\n");

  return [
    "You are a senior engineer providing a feasibility triage report.",
    "Return valid JSON with keys:",
    "verdict, affectedComponents, effortEstimate, confidence, risks, openQuestions, evidencePaths.",
    "Allowed verdict values: likely_feasible, needs_spike, not_feasible.",
    "",
    "Jira summary:",
    issueSummary,
    "",
    "Jira description:",
    issueDescription,
    "",
    "Code evidence:",
    codeContext
  ].join("\n");
}

export function renderFeasibilityAdf(report) {
  const lines = [
    `Verdict: ${report.verdict}`,
    `Effort estimate: ${report.effortEstimate}`,
    `Confidence: ${report.confidence}`,
    `Affected components: ${report.affectedComponents.join(", ") || "None found"}`,
    `Risks: ${report.risks.join("; ") || "None identified"}`,
    `Open questions: ${report.openQuestions.join("; ") || "None"}`,
    `Evidence paths: ${report.evidencePaths.join(", ") || "None"}`,
    "Disclaimer: This is an automated assessment and should be validated by engineering."
  ];

  return {
    version: 1,
    type: "doc",
    content: lines.map((text) => ({
      type: "paragraph",
      content: [{ type: "text", text }]
    }))
  };
}

function stringifyDescription(description) {
  if (!description) return "";
  if (typeof description === "string") return description;
  return JSON.stringify(description);
}
