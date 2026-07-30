/**
 * Update Silbar blog.ts to use new SVG blog cover images.
 * Run: node scripts/update-blog-covers.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, "..", "..", "src", "data", "blog.ts");
let content = readFileSync(filepath, "utf-8");

const POST_SLUGS = [
  "importance-of-iso-9001-in-security",
  "cctv-vs-manned-guarding",
  "preparing-facility-for-festive-season",
  "how-to-choose-security-agency-india",
  "industrial-security-gate-management",
  "residential-society-security-best-practices",
  "fire-safety-audit-factory-owners",
  "psara-license-requirements-private-security",
  "role-of-ai-in-modern-security-surveillance",
  "warehouse-theft-prevention-complete-guide",
  "security-vulnerability-assessment-guide",
  "corporate-event-security-planning",
  "rise-of-women-in-private-security",
  "access-control-rfid-vs-biometric-vs-smart-card",
  "security-guard-training-standards-india",
  "bank-branch-security-beyond-armed-guard",
  "construction-site-theft-prevention",
  "hotel-security-best-practices-guest-safety",
  "school-safety-beyond-perimeter",
  "industrial-safety-during-monsoon",
  "managing-security-multi-site-retail-chains",
  "future-of-private-security-india-2026-2030",
  "security-for-hospital-emergency-rooms",
  "festive-season-security-checklist",
  "verify-security-agency-compliance",
  "solar-farm-security-remote-renewable-assets",
  "iso-14001-environmental-management-security",
];

let count = 0;
for (const slug of POST_SLUGS) {
  const oldPath = `coverImage: '/images/blog/`;
  const newPath = `coverImage: '/images/blog/${slug}-cover.svg'`;
  // Find the first occurrence of oldPath after this slug
  const slugIndex = content.indexOf(`slug: '${slug}'`);
  if (slugIndex === -1) {
    console.log(`⚠️ Could not find slug: ${slug}`);
    continue;
  }
  // Find the coverImage line after this slug
  const afterSlug = content.slice(slugIndex);
  const coverMatch = afterSlug.match(/coverImage: '\/images\/blog\/[^']+'/);
  if (coverMatch) {
    const fullMatch = coverMatch[0];
    const before = content.slice(0, slugIndex + afterSlug.indexOf(fullMatch));
    const after = content.slice(slugIndex + afterSlug.indexOf(fullMatch) + fullMatch.length);
    content = before + `coverImage: '/images/blog/${slug}-cover.svg'` + after;
    count++;
  }
}

writeFileSync(filepath, content, "utf-8");
console.log(`✅ Updated ${count} blog post cover images`);
