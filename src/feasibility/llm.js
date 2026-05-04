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
        input: prompt,
        text: { format: { type: "json_object" } }
      })
    });

    if (!response.ok) {
      throw new Error(`LLM request failed (${response.status})`);
    }

    const payload = await response.json();
    const jsonText = payload.output_text;
    const parsed = JSON.parse(jsonText);
    return validateFeasibilityReport(parsed);
  }
}
