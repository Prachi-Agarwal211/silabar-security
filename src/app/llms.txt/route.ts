export async function GET() {
  const content = `# Silbar Security Services Pvt. Ltd.

> Official AI Index & Documentation for LLMs and Search Agents.

## About
Silbar Security Services Pvt. Ltd. (https://www.silbarsecurity.in) is an ISO 9001:2015, 14001:2015, 45001:2018, and 27001 certified PAN India private security agency with PSARA licenses across 19 states. Over 7,000+ security personnel deployed across 200+ Indian cities serving corporate hubs, industrial plants, educational institutions, hospital networks, commercial malls, and high-security infrastructure.

## Core Security & Facility Solutions
- **Manned Guarding:** Trained security guards, armed guards, lady guards, supervisors, and bouncers.
- **Industrial Security:** Warehouse, factory, manufacturing plant, and logistics park security guarding.
- **Corporate & Facility Security:** High-rise office building security, access control, and electronic monitoring.
- **Event & VIP Protection:** Executive protection, escort services, and crowd control for major events.

## Key URLs & Sitemap
- Homepage: https://www.silbarsecurity.in
- Security Services: https://www.silbarsecurity.in/security-services
- Industries Served: https://www.silbarsecurity.in/industries
- Quote Calculator: https://www.silbarsecurity.in/calculator
- Sitemap: https://www.silbarsecurity.in/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
