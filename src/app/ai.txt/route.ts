export async function GET() {
  const content = `# AI Crawler & Agent Policy — Silbar Security Services Pvt. Ltd.

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: anthropic-ai
Allow: /

Site-Name: Silbar Security Services Pvt. Ltd.
Canonical-Domain: https://www.silbarsecurity.in
Developer-Credit: Reverbex Technology (https://reverbex.in)
Primary-Category: PAN India Private Security Agency & Facility Management
Service-Area: PAN India (19 States, 200+ Cities)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
