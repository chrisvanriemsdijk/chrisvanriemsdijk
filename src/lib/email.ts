// Email handling.
//
// The address is never written literally anywhere that ends up in the static
// HTML, the JSON-LD, or llms.txt — those are exactly the places address
// harvesters read. Instead the local part and domain are stored ROT13'd and
// reassembled in the browser at the moment someone actually acts on them.
//
// This is deliberately cheap obfuscation: it defeats the naive regex scrapers
// that make up the bulk of harvesting traffic, and costs a human nothing
// because every entry point (mailto, copy, reveal) still works in one click.
// Anything stronger would mean a backend, which a static site doesn't have.

const ROT13_USER = "puevf";
const ROT13_DOMAIN = "qngnabegu.nv";

const rot13 = (s: string) =>
  s.replace(/[a-z]/g, (c) =>
    String.fromCharCode(((c.charCodeAt(0) - 97 + 13) % 26) + 97)
  );

/** The real address. Call this from event handlers, never during render. */
export function getEmail(): string {
  return `${rot13(ROT13_USER)}@${rot13(ROT13_DOMAIN)}`;
}

/** A masked form that is safe to render — readable to people, useless to a scraper. */
export const emailDisplay = "chris [at] datanorth [dot] ai";

/** Navigate to a composed mail draft. */
export function openMail(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  window.location.href = `mailto:${getEmail()}${query ? `?${query}` : ""}`;
}

/** Copy the address, resolving to whether it worked so the UI can say so. */
export async function copyEmail(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(getEmail());
    return true;
  } catch {
    return false;
  }
}
