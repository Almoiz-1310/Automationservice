import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  InMemoryIdempotencyStore,
  buildIdempotencyKey
} from "../src/idempotency/store.js";
import { FileIdempotencyStore } from "../src/idempotency/fileStore.js";

test("in-memory idempotency: claim is exclusive", async () => {
  const store = new InMemoryIdempotencyStore();
  const key = buildIdempotencyKey({
    issueKey: "ACS-12",
    eventType: "jira:issue_created",
    issueVersion: "2026-05-04T10:00:00.000Z"
  });

  assert.equal(await store.claim(key), true);
  assert.equal(await store.claim(key), false);
  await store.complete(key, { issueKey: "ACS-12" });
  assert.equal(await store.claim(key), false);
});

test("in-memory idempotency: release allows retry", async () => {
  const store = new InMemoryIdempotencyStore();
  const key = buildIdempotencyKey({
    issueKey: "ACS-13",
    eventType: "jira:issue_created",
    issueVersion: "v1"
  });
  assert.equal(await store.claim(key), true);
  await store.release(key);
  assert.equal(await store.claim(key), true);
});

test("file idempotency: claim is exclusive", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "idem-"));
  const store = new FileIdempotencyStore(dir);
  const key = buildIdempotencyKey({
    issueKey: "ACS-99",
    eventType: "jira:issue_created",
    issueVersion: "2026-05-04T12:00:00.000Z"
  });

  assert.equal(await store.claim(key), true);
  assert.equal(await store.claim(key), false);
  await store.complete(key, { issueKey: "ACS-99" });
  assert.equal(await store.claim(key), false);
  await fs.rm(dir, { recursive: true, force: true });
});
