function authHeader(email, apiToken) {
  const token = Buffer.from(`${email}:${apiToken}`).toString("base64");
  return `Basic ${token}`;
}

export class JiraClient {
  constructor({ baseUrl, email, apiToken, fetchImpl = fetch }) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.email = email;
    this.apiToken = apiToken;
    this.fetchImpl = fetchImpl;
  }

  async getIssue(issueKey) {
    const url =
      `${this.baseUrl}/rest/api/3/issue/${issueKey}` +
      "?fields=summary,description,issuetype,labels,project";
    const response = await this.fetchImpl(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authHeader(this.email, this.apiToken)
      }
    });
    if (!response.ok) {
      throw new Error(`Jira issue fetch failed (${response.status})`);
    }
    return response.json();
  }

  async addComment(issueKey, adfDocument) {
    const url = `${this.baseUrl}/rest/api/3/issue/${issueKey}/comment`;
    const response = await this.fetchImpl(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authHeader(this.email, this.apiToken)
      },
      body: JSON.stringify({ body: adfDocument })
    });
    if (!response.ok) {
      throw new Error(`Jira comment failed (${response.status})`);
    }
    return response.json();
  }
}
