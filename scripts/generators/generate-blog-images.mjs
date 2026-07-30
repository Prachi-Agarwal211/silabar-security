/**
 * Generate branded SVG blog cover + OG images for Silbar Security.
 * Cherry/gold color scheme matching the brand palette.
 * Run: node scripts/generate-silbar-images.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const POSTS = [
  { slug: "importance-of-iso-9001-in-security", title: "Why ISO 9001:2015 Certification Matters in Private Security", category: "Compliance" },
  { slug: "cctv-vs-manned-guarding", title: "CCTV vs. Manned Guarding: Finding the Right Balance", category: "Security Tips" },
  { slug: "preparing-facility-for-festive-season", title: "Preparing Your Facility's Security for the Festive Season", category: "Industry News" },
  { slug: "how-to-choose-security-agency-india", title: "How to Choose a Security Agency in India", category: "Security Tips" },
  { slug: "industrial-security-gate-management", title: "Industrial Gate Management", category: "Industry News" },
  { slug: "residential-society-security-best-practices", title: "Residential Society Security Best Practices", category: "Security Tips" },
  { slug: "fire-safety-audit-factory-owners", title: "Fire Safety Audit: What Every Factory Owner Must Know", category: "Compliance" },
  { slug: "psara-license-requirements-private-security", title: "Understanding PSARA License Requirements", category: "Compliance" },
  { slug: "role-of-ai-in-modern-security-surveillance", title: "The Role of AI in Modern Security Surveillance", category: "Industry News" },
  { slug: "warehouse-theft-prevention-complete-guide", title: "Warehouse Theft Prevention: A Complete Guide", category: "Security Tips" },
  { slug: "security-vulnerability-assessment-guide", title: "How to Conduct a Security Vulnerability Assessment", category: "Security Tips" },
  { slug: "corporate-event-security-planning", title: "Corporate Event Security: Planning for 1000+ Attendees", category: "Security Tips" },
  { slug: "rise-of-women-in-private-security", title: "The Rise of Women in India's Private Security Sector", category: "Industry News" },
  { slug: "access-control-rfid-vs-biometric-vs-smart-card", title: "Access Control Systems: RFID vs Biometric vs Smart Card", category: "Security Tips" },
  { slug: "security-guard-training-standards-india", title: "Security Guard Training Standards in India", category: "Industry News" },
  { slug: "bank-branch-security-beyond-armed-guard", title: "Bank Branch Security: Beyond the Armed Guard", category: "Security Tips" },
  { slug: "construction-site-theft-prevention", title: "Construction Site Theft Prevention Strategies", category: "Security Tips" },
  { slug: "hotel-security-best-practices-guest-safety", title: "Hotel Security Best Practices for Guest Safety", category: "Security Tips" },
  { slug: "school-safety-beyond-perimeter", title: "School Safety: Beyond Perimeter Security", category: "Industry News" },
  { slug: "industrial-safety-during-monsoon", title: "Industrial Safety During Monsoon Season", category: "Security Tips" },
  { slug: "managing-security-multi-site-retail-chains", title: "Managing Security for Multi-Site Retail Chains", category: "Security Tips" },
  { slug: "future-of-private-security-india-2026-2030", title: "The Future of Private Security in India 2026-2030", category: "Industry News" },
  { slug: "security-for-hospital-emergency-rooms", title: "Security for Hospital Emergency Rooms", category: "Security Tips" },
  { slug: "festive-season-security-checklist", title: "Festive Season Security: A Comprehensive Checklist", category: "Security Tips" },
  { slug: "verify-security-agency-compliance", title: "How to Verify Your Security Agency's Compliance", category: "Compliance" },
  { slug: "solar-farm-security-remote-renewable-assets", title: "Solar Farm Security: Protecting Remote Renewable Assets", category: "Industry News" },
  { slug: "iso-14001-environmental-management-security", title: "Understanding ISO 14001 in Security Operations", category: "Compliance" },
];

const CATEGORY_COLORS = {
  "Security Tips": { accent: "#BF953F", bg: "#0B0E14" },
  "Industry News": { accent: "#8C1F32", bg: "#0B0E14" },
  "Company Updates": { accent: "#BF953F", bg: "#0B0E14" },
  "Compliance": { accent: "#D4AF37", bg: "#0B0E14" },
};

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function getShortTitle(title) {
  const cleaned = title.length > 40 ? title.slice(0, 38) + "…" : title;
  return cleaned;
}

function generateCoverSVG(slug, title, category) {
  const c = CATEGORY_COLORS[category] || CATEGORY_COLORS["Security Tips"];
  const shortened = getShortTitle(title);
  const words = shortened.split(" ");
  const mid = Math.ceil(words.length / 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="spot" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="${c.accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${c.bg}"/>
  <rect width="1200" height="630" fill="url(#spot)"/>
  <!-- Cherry accent top bar -->
  <rect x="0" y="0" width="1200" height="4" fill="${c.accent}" opacity="0.6"/>
  <!-- Diamond grid pattern -->
  <g opacity="0.02">
    ${Array.from({ length: 6 }, (_, i) => `<rect x="${i * 200 + 50}" y="50" width="12" height="12" rx="1" transform="rotate(45 ${i * 200 + 56} 56)" fill="${c.accent}"/>`).join("\n    ")}
  </g>
  <!-- Brand -->
  <text x="50" y="65" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="${c.accent}" letter-spacing="2" text-transform="uppercase">SILBAR SECURITY</text>
  <rect x="50" y="80" width="1100" height="1" fill="url(#line)"/>
  <!-- Category badge -->
  <rect x="50" y="120" width="${category.length * 9 + 30}" height="28" rx="4" fill="${c.accent}" opacity="0.15"/>
  <text x="65" y="138" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="${c.accent}" letter-spacing="1.5">${category.toUpperCase()}</text>
  <!-- Title -->
  <text x="50" y="${words.length <= 1 ? 240 : 200}" font-family="system-ui, sans-serif" font-size="34" font-weight="700" fill="#f6fafd" letter-spacing="-0.3">
    ${words.slice(0, mid).map((w) => `<tspan x="50" dy="44">${escapeXml(w)}</tspan>`).join("\n    ")}
    ${words.slice(mid).map((w) => `<tspan x="50" dy="44">${escapeXml(w)}</tspan>`).join("\n    ")}
  </text>
  <!-- Stats bar -->
  <g transform="translate(50, 420)">
    <text font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="${c.accent}">500+</text>
    <text y="16" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.4" letter-spacing="1">CLIENTS</text>
    <text x="120" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="${c.accent}">50+</text>
    <text y="16" x="120" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.4" letter-spacing="1">CITIES</text>
    <text x="240" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="${c.accent}">ISO</text>
    <text y="16" x="240" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.4" letter-spacing="1">CERTIFIED</text>
  </g>
  <rect x="50" y="470" width="1100" height="1" fill="url(#line)"/>
  <text x="600" y="580" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#f6fafd" opacity="0.1" letter-spacing="2">SILBARSECURITY.IN</text>
  <path d="M50 550 L50 580 L80 580" stroke="${c.accent}" stroke-width="1" fill="none" opacity="0.2"/>
  <path d="M1150 580 L1120 580 L1120 550" stroke="${c.accent}" stroke-width="1" fill="none" opacity="0.2"/>
</svg>`;
}

function generateOGSVG(slug, title, category) {
  const c = CATEGORY_COLORS[category] || CATEGORY_COLORS["Security Tips"];
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="spot" cx="65%" cy="35%" r="75%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="${c.accent}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f6fafd"/>
      <stop offset="100%" stop-color="#f6fafd" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${c.bg}"/>
  <rect width="1200" height="630" fill="url(#spot)"/>
  <rect x="0" y="0" width="1200" height="4" fill="${c.accent}" opacity="0.6"/>
  <g transform="translate(50, 45)">
    <text font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="${c.accent}" letter-spacing="2">SILBAR</text>
    <text y="16" font-family="system-ui, sans-serif" font-size="9" font-weight="500" fill="${c.accent}" opacity="0.5" letter-spacing="1">SECURITY SERVICES PVT. LTD.</text>
  </g>
  <text x="1150" y="56" text-anchor="end" font-family="system-ui, sans-serif" font-size="10" fill="${c.accent}" opacity="0.3" letter-spacing="1">silbarsecurity.in</text>
  <rect x="50" y="75" width="1100" height="1" fill="url(#line)"/>
  <rect x="50" y="110" width="3" height="340" fill="${c.accent}" opacity="0.12" rx="1.5"/>
  <rect x="70" y="118" width="${category.length * 9 + 30}" height="26" rx="4" fill="${c.accent}" opacity="0.12"/>
  <text x="85" y="135" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="${c.accent}" letter-spacing="1.5">${category.toUpperCase()}</text>
  <text x="70" y="${words.length <= 1 ? 240 : 210}" font-family="system-ui, sans-serif" font-size="38" font-weight="700" fill="url(#titleGrad)" letter-spacing="-0.3">
    ${words.slice(0, mid).map((w) => `<tspan x="70" dy="48">${escapeXml(w)}</tspan>`).join("\n    ")}
    ${words.slice(mid).map((w) => `<tspan x="70" dy="48">${escapeXml(w)}</tspan>`).join("\n    ")}
  </text>
  <g transform="translate(70, 430)">
    <text font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="${c.accent}">500+</text>
    <text y="18" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.35" letter-spacing="1">CLIENTS</text>
    <text x="130" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="${c.accent}">50+</text>
    <text y="18" x="130" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.35" letter-spacing="1">CITIES</text>
    <text x="260" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="${c.accent}">ISO</text>
    <text y="18" x="260" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.35" letter-spacing="1">CERTIFIED</text>
  </g>
  <rect x="50" y="480" width="1100" height="1" fill="url(#line)"/>
  <text x="600" y="595" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.1" letter-spacing="2">SILBARSECURITY.IN</text>
  <path d="M50 550 L50 580 L80 580" stroke="${c.accent}" stroke-width="1" fill="none" opacity="0.15"/>
  <path d="M1150 580 L1120 580 L1120 550" stroke="${c.accent}" stroke-width="1" fill="none" opacity="0.15"/>
</svg>`;
}

function generateDefaultOG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="spot" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#8C1F32" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#0B0E14" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="#BF953F" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0B0E14"/>
  <rect width="1200" height="630" fill="url(#spot)"/>
  <rect x="0" y="0" width="1200" height="4" fill="#8C1F32"/>
  <text x="600" y="240" text-anchor="middle" font-family="system-ui, sans-serif" font-size="64" font-weight="800" fill="#BF953F" letter-spacing="-1">SILBAR</text>
  <text x="600" y="275" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#BF953F" opacity="0.5" letter-spacing="4">SECURITY SERVICES PVT. LTD.</text>
  <rect x="400" y="310" width="400" height="1" fill="url(#line)"/>
  <text x="600" y="355" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#f6fafd" opacity="0.8">Professional Security Solutions Across India</text>
  <g transform="translate(430, 420)">
    <text x="0" y="0" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#BF953F">500+</text><text x="0" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.3" letter-spacing="1">CLIENTS</text>
    <text x="110" y="0" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#BF953F">50+</text><text x="110" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.3" letter-spacing="1">CITIES</text>
    <text x="220" y="0" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#BF953F">ISO</text><text x="220" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.3" letter-spacing="1">CERTIFIED</text>
  </g>
  <text x="600" y="595" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.1" letter-spacing="2">SILBARSECURITY.IN</text>
</svg>`;
}

// Generate all images
const blogDir = join(__dirname, "..", "..", "public", "images", "blog");
const ogDir = join(__dirname, "..", "..", "public", "images", "og");
if (!existsSync(blogDir)) mkdirSync(blogDir, { recursive: true });
if (!existsSync(ogDir)) mkdirSync(ogDir, { recursive: true });

// Default OG
writeFileSync(join(ogDir, "default-og.svg"), generateDefaultOG(), "utf-8");
console.log("[OG] Generated: default-og.svg");

POSTS.forEach((post, i) => {
  // Blog cover
  const cover = generateCoverSVG(post.slug, post.title, post.category);
  writeFileSync(join(blogDir, `${post.slug}-cover.svg`), cover, "utf-8");
  // OG image
  const og = generateOGSVG(post.slug, post.title, post.category);
  writeFileSync(join(ogDir, `${post.slug}-og.svg`), og, "utf-8");
  console.log(`[${i + 1}/${POSTS.length}] Generated: ${post.slug}-cover.svg + ${post.slug}-og.svg`);
});

console.log("\n✅ All Silbar blog covers + OG images generated!");
