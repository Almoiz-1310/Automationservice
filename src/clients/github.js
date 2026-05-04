import { buildSearchQueries } from "../retrieval/queryBuilder.js";

export class GithubClient {
  constructor({ token, repo, fetchImpl = fetch }) {
    this.token = token;
    this.repo = repo;
    this.fetchImpl = fetchImpl;
  }

  async searchRelevantCode(ticketText, maxResults = 8) {
    const queries = buildSearchQueries(ticketText, this.repo, 6);
    const snippets = [];
    const seenPaths = new Set();

    for (const query of queries) {
      if (snippets.length >= maxResults) break;
      const hits = await this.searchCode(query);
      for (const hit of hits) {
        if (snippets.length >= maxResults) break;
        if (seenPaths.has(hit.path)) continue;
        seenPaths.add(hit.path);
        const content = await this.getFileContent(hit.path);
        snippets.push({
          path: hit.path,
          url: hit.html_url,
          snippet: content
        });
      }
    }

    return snippets;
  }

  async searchCode(query) {
    const url =
      `https://api.github.com/search/code?q=${encodeURIComponent(query)}` +
      "&per_page=5";
    const response = await this.fetchImpl(url, {
      headers: this.headers()
    });
    if (!response.ok) {
      throw new Error(`GitHub code search failed (${response.status})`);
    }
    const body = await response.json();
    return body.items || [];
  }

  async getFileContent(path) {
    const url = `https://api.github.com/repos/${this.repo}/contents/${path}`;
    const response = await this.fetchImpl(url, {
      headers: this.headers()
    });
    if (!response.ok) {
      throw new Error(`GitHub file read failed (${response.status})`);
    }
    const body = await response.json();
    const decoded = Buffer.from(body.content || "", "base64").toString("utf8");
    return clipSnippet(decoded);
  }

  headers() {
    return {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${this.token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    };
  }
}

function clipSnippet(content, lineLimit = 60) {
  return content.split("\n").slice(0, lineLimit).join("\n");
}
