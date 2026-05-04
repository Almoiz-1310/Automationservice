export class InMemoryIdempotencyStore {
  constructor() {
    this.records = new Map();
  }

  async claim(key) {
    if (this.records.has(key)) {
      return false;
    }
    this.records.set(key, { status: "claimed", claimedAt: Date.now() });
    return true;
  }

  async complete(key, value) {
    const existing = this.records.get(key) || {};
    this.records.set(key, {
      ...existing,
      ...value,
      status: "done",
      completedAt: Date.now()
    });
  }

  async release(key) {
    this.records.delete(key);
  }
}

export function buildIdempotencyKey({ issueKey, eventType, issueVersion }) {
  return `${issueKey}:${eventType}:${issueVersion}`;
}
