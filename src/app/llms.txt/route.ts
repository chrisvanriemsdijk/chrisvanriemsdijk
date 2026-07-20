import {
  siteConfig,
  introText,
  statement,
  stats,
  services,
  principles,
  experience,
  talks,
} from "@/lib/constants";

export const dynamic = "force-static";

// llms.txt (https://llmstxt.org): a markdown summary of the site for AI
// agents. Generated from constants.ts so it always matches the live content.
export function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.jobTitle} based in ${siteConfig.location}. ${siteConfig.tagline} This is a single-page personal portfolio; everything below is the full content of the site.

${introText.join("\n\n")}

${statement}

Key facts:

${stats.map((s) => `- ${s.value} — ${s.label}`).join("\n")}

Services offered:

${services.map((s) => `- ${s.title} (${s.tags.join(", ")})`).join("\n")}

Principles:

${principles.map((p) => `- ${p.title}: ${p.body}`).join("\n")}

Experience:

${experience
  .map(
    (e) =>
      `- ${e.role} at ${e.company} (${e.period}): ${e.description}${
        e.bullets.length ? " " + e.bullets.join(". ") + "." : ""
      }`
  )
  .join("\n")}

Contact: via the contact section at ${siteConfig.url}/#contact, or on LinkedIn (${siteConfig.social.linkedin}). The email address is deliberately not published in plain text here.

## Talks & Workshops

${talks
  .filter((t) => t.url)
  .map((t) => `- [${t.title}](${t.url}): ${t.kind} at ${t.venue}`)
  .join("\n")}

## Links

- [Website](${siteConfig.url}): Portfolio homepage
- [LinkedIn](${siteConfig.social.linkedin}): Professional profile
- [GitHub](${siteConfig.social.github}): Code and projects
- [DataNorth AI](https://datanorth.ai): Current employer
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
