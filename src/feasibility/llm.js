import { validateFeasibilityReport } from "./schema.js";

export class LlmClient {
  constructor({ apiKey, model, fetchImpl = fetch }) {
    this.apiKey = apiKey;
    this.model = model;
    this.fetchImpl = fetchImpl;
  }

  async createFeasibilityReport(prompt) {
    const response = await this.fetchImpl("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        input: prompt
      })
    });

    if (!response.ok) {
      const errorBody = await safeJson(response);
      const message =
        errorBody?.error?.message || errorBody?.message || "unknown provider error";
      throw new Error(`LLM request failed (${response.status}): ${message}`);
    }

    const payload = await response.json();
    const jsonText = extractOutputText(payload);
    if (!jsonText) {
      throw new Error("LLM request failed: empty model output");
    }
    const parsed = JSON.parse(jsonText);
    return validateFeasibilityReport(parsed);
  }
}

function extractOutputText(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  const content = payload?.output?.[0]?.content || [];
  for (const entry of content) {
    if (entry?.type === "output_text" && typeof entry?.text === "string") {
      return entry.text;
    }
  }
  return "";
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
