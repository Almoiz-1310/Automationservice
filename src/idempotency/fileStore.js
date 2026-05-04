import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

function hashedFileName(key) {
  return `${crypto.createHash("sha256").update(key).digest("hex")}.json`;
}

export class FileIdempotencyStore {
  constructor(baseDir) {
    this.baseDir = baseDir;
  }

  async ensureDir() {
    await fs.mkdir(this.baseDir, { recursive: true });
  }

  filePath(key) {
    return path.join(this.baseDir, hashedFileName(key));
  }

  async claim(key) {
    await this.ensureDir();
    const fp = this.filePath(key);
    try {
      const handle = await fs.open(fp, "wx");
      try {
        await handle.writeFile(
          JSON.stringify({ status: "claimed", claimedAt: Date.now() }),
          "utf8"
        );
      } finally {
        await handle.close();
      }
      return true;
    } catch (error) {
      if (error && error.code === "EEXIST") {
        return false;
      }
      throw error;
    }
  }

  async complete(key, value) {
    const fp = this.filePath(key);
    const payload = {
      status: "done",
      ...value,
      completedAt: Date.now()
    };
    await fs.writeFile(fp, JSON.stringify(payload), "utf8");
  }

  async release(key) {
    const fp = this.filePath(key);
    await fs.unlink(fp).catch(() => {});
  }
}
