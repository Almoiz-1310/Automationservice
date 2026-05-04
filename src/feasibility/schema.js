const VALID_VERDICTS = new Set(["likely_feasible", "needs_spike", "not_feasible"]);

function isStringArray(value) {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

export function validateFeasibilityReport(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("LLM response must be an object");
  }
  if (!VALID_VERDICTS.has(payload.verdict)) {
    throw new Error("Invalid verdict");
  }
  if (typeof payload.effortEstimate !== "string") {
    throw new Error("effortEstimate must be a string");
  }
  if (typeof payload.confidence !== "string") {
    throw new Error("confidence must be a string");
  }
  if (!isStringArray(payload.affectedComponents)) {
    throw new Error("affectedComponents must be string[]");
  }
  if (!isStringArray(payload.risks)) {
    throw new Error("risks must be string[]");
  }
  if (!isStringArray(payload.openQuestions)) {
    throw new Error("openQuestions must be string[]");
  }
  if (!isStringArray(payload.evidencePaths)) {
    throw new Error("evidencePaths must be string[]");
  }
  return payload;
}
