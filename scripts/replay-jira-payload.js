import fs from "node:fs/promises";

const [payloadPath, endpoint = "http://localhost:3000/webhooks/jira"] =
  process.argv.slice(2);

if (!payloadPath) {
  console.error("Usage: node scripts/replay-jira-payload.js <payload.json> [endpoint]");
  process.exit(1);
}

const payload = JSON.parse(await fs.readFile(payloadPath, "utf8"));
const secret = process.env.JIRA_WEBHOOK_SECRET || "";

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Webhook-Secret": secret
  },
  body: JSON.stringify(payload)
});

const text = await response.text();
console.log(`status=${response.status}`);
console.log(text);
