import { spamLinks } from "./spamLinks.js";

export function isSpam(content: string): boolean {
  return spamLinks.some((link) => link.test(content));
}
