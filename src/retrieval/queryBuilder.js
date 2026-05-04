const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "this",
  "that",
  "into",
  "have",
  "will",
  "your",
  "issue",
  "feature"
]);

export function buildSearchQueries(text, repo, maxTerms = 5) {
  const words = (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9_\-/\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word && word.length > 2 && !STOP_WORDS.has(word));

  const uniqueWords = [...new Set(words)].slice(0, maxTerms);
  return uniqueWords.map((term) => `repo:${repo} ${term}`);
}
