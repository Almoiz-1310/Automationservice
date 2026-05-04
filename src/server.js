import http from "node:http";
import { createApp } from "./app.js";

const app = createApp();
const { config } = app;

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/webhooks/jira") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", async () => {
    try {
      const rawBody = Buffer.concat(chunks).toString("utf8");
      const body = JSON.parse(rawBody || "{}");
      const result = await app.process(body, req.headers, rawBody);
      res.writeHead(result.status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result.body));
    } catch (error) {
      console.error("Webhook handler error", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  });
});

server.listen(config.port, () => {
  console.log(`Jira feasibility webhook listening on port ${config.port}`);
});
