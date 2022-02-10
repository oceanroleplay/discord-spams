import { dirname, isESM } from "@discordx/importer";
import fs from "node:fs/promises";
import path from "node:path";

const _dirname = isESM ? dirname(import.meta.url) : __dirname;

export class SpamMeta {
  private static _instance: SpamMeta;
  private _spamLinks: string[] = [];
  private _logs = false;

  get spamLinks(): string[] {
    return this._spamLinks;
  }

  get instance(): SpamMeta {
    return SpamMeta.instance;
  }

  private constructor() {
    // empty constructor
  }

  static get instance(): SpamMeta {
    if (!this._instance) {
      this._instance = new SpamMeta();
    }
    return this._instance;
  }

  async readList(filepath: string): Promise<string[]> {
    const data = await fs.readFile(filepath, {
      encoding: "utf8",
    });

    return data.replaceAll("\r", "").split("\n");
  }

  async init(logs?: boolean): Promise<void> {
    if (logs) {
      this._logs = true;
    }

    this._spamLinks = await this.readList(path.join(_dirname, "spamLinks.txt"));
  }

  addLink(...link: string[]): SpamMeta {
    this._spamLinks.push(...link);
    return this.instance;
  }

  isSpam(content: string): boolean {
    return this._spamLinks.some((link) => RegExp(link).test(content));
  }
}
