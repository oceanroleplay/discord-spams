import axios from "axios";

const globalListUrl =
  "https://raw.githubusercontent.com/oceanroleplay/discord-spams/main/src/spamLinks.txt";

export class SpamMeta {
  private static _instance: SpamMeta;
  private static _spamLinks: string[] = [];

  static get spamLinks(): string[] {
    return this._spamLinks;
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

  static addLink(...link: string[]): SpamMeta {
    link.forEach((lk) => {
      if (lk.length && !this._spamLinks.includes(lk)) {
        this._spamLinks.push(lk);
      }
    });

    return this.instance;
  }

  static isSpam(content: string): boolean {
    return this._spamLinks.some((link) => {
      return RegExp(link, "gm").test(content);
    });
  }

  static async refreshMasterList(): Promise<void> {
    const response = await axios.get<string>(globalListUrl);

    this.addLink(...response.data.replaceAll("\r", "").split("\n"));
  }
}
