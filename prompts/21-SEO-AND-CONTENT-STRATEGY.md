# 21 — SEO AND CONTENT STRATEGY
## SEO for Creative Websites That Rank AND Look Unforgettable

---

## THE RULE

**Creative websites MUST be SEO-optimized.**

Being visually stunning means nothing if no one can find you.

SEO is not optional. It's built in from day one.

---

## TECHNICAL SEO CHECKLIST

### Next.js Setup

```typescript
// app/layout.tsx
import { metadataBase } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(metadataBase),
  title: {
    default: "Khemji — Security Training That Doesn't Suck",
    template: "%s | Khemji",
  },
  description: "Transform your security awareness with engaging, interactive training.",
  openGraph: {
    title: "Khemji — Security Training That Doesn't Suck",
    description: "Transform your security awareness with engaging, interactive training.",
    url: "https://khemji.com",
    siteName: "Khemji",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khemji — Security Training That Doesn't Suck",
    description: "Transform your security awareness with engaging, interactive training.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### Dynamic Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://khemji.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://khemji.com/courses",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://khemji.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://khemji.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
```

### Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    sitemap: "https://khemji.com/sitemap.xml",
  };
}
```

### JSON-LD Structured Data

```typescript
// components/seo/JsonLd.tsx
interface JsonLdProps {
  type: "Organization" | "LocalBusiness" | "FAQPage" | "Article" | "Product";
  data: Record<string, any>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": type,
          ...data,
        }),
      }}
    />
  );
}

// Usage in page:
<JsonLd
  type="Organization"
  data={{
    name: "Khemji",
    url: "https://khemji.com",
    logo: "https://khemji.com/logo.png",
    sameAs: [
      "https://twitter.com/khemji",
      "https://linkedin.com/company/khemji",
    ],
    contactPoint: {
      telephone: "+1-234-567-8900",
      contactType: "customer service",
    },
  }}
/>
```

---

## SEMANTIC HTML CHECKLIST

### Every Page Must Have
- [ ] `<html lang="en">`
- [ ] `<header>` for navigation
- [ ] `<main>` for primary content
- [ ] `<article>` for blog posts
- [ ] `<section>` for content sections
- [ ] `<nav>` for navigation
- [ ] `<aside>` for sidebar content
- [ ] `<footer>` for footer
- [ ] `<h1>` only once per page
- [ ] `<h2>` → `<h3>` in order (no skipping)

### Example Structure
```tsx
export default function Page() {
  return (
    <html lang="en">
      <body>
        <header>
          <nav aria-label="Main navigation">
            {/* navigation */}
          </nav>
        </header>
        <main>
          <section aria-labelledby="hero-heading">
            <h1 id="hero-heading">Security Training That Doesn't Suck</h1>
          </section>
          <section aria-labelledby="features-heading">
            <h2 id="features-heading">Why Choose Khemji</h2>
            <article>
              <h3>Interactive Learning</h3>
              <p>...</p>
            </article>
          </section>
        </main>
        <footer>
          {/* footer content */}
        </footer>
      </body>
    </html>
  );
}
```

---

## IMAGE OPTIMIZATION

### Next.js Image Setup
```tsx
import Image from "next/image";

// Hero image (above fold)
<Image
  src="/hero.webp"
  alt="Security training dashboard showing interactive modules"
  width={1920}
  height={1080}
  priority
  sizes="100vw"
  placeholder="blur"
  blurDataURL={blurPlaceholder}
/>

// Below-fold image
<Image
  src="/course.webp"
  alt="Interactive security awareness course module"
  width={800}
  height={600}
  loading="lazy"
  decoding="async"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Image Rules
- [ ] Always use WebP/AVIF with fallback
- [ ] Always set width and height (prevents layout shift)
- [ ] Always use alt text (descriptive, not keyword-stuffed)
- [ ] Always use priority for above-fold images
- [ ] Always use loading="lazy" for below-fold
- [ ] Always use sizes for responsive
- [ ] Always use placeholder="blur" for better UX

---

## CONTENT STRATEGY

### Page Content Requirements

| Page | Min Words | Target Keywords | Content Type |
|------|-----------|-----------------|--------------|
| Homepage | 500+ | security training, awareness training | Value proposition, features |
| Courses | 300+ per course | security course, training module | Course descriptions, benefits |
| About | 400+ | about khemji, security company | Company story, team, mission |
| Contact | 200+ | contact khemji, security training | Contact form, location, CTA |
| Blog | 1000+ per post | [target keyword] | Educational content, guides |

### Keyword Strategy

**Primary Keywords:**
- security training
- security awareness training
- cybersecurity training
- security training online

**Long-tail Keywords:**
- interactive security training for employees
- engaging security awareness course
- security training that doesn't suck
- fun cybersecurity training program

**Local Keywords:**
- security training [city]
- cybersecurity training [country]
- security awareness training near me

### Content Calendar

| Week | Content Type | Target Keyword | Word Count |
|------|-------------|----------------|------------|
| 1 | Blog Post | "Why Security Training Fails" | 1500+ |
| 2 | Blog Post | "5 Interactive Security Exercises" | 1200+ |
| 3 | Blog Post | "How to Make Security Training Fun" | 1000+ |
| 4 | Blog Post | "Security Awareness Statistics 2026" | 1500+ |

---

## INTERNAL LINKING STRATEGY

### Link Structure
```
Homepage
├── Courses
│   ├── Course 1
│   ├── Course 2
│   └── Course 3
├── About
├── Blog
│   ├── Post 1
│   ├── Post 2
│   └── Post 3
└── Contact
```

### Internal Link Rules
- [ ] Every page links to homepage
- [ ] Every page links to contact
- [ ] Blog posts link to relevant courses
- [ ] Courses link to related blog posts
- [ ] No orphan pages (every page has 1+ internal links)
- [ ] Anchor text is descriptive (not "click here")

---

## CORE WEB VITALS

### Performance Targets
| Metric | Target | How to Achieve |
|--------|--------|----------------|
| LCP | < 2.5s | Optimize hero image, use priority |
| FID | < 100ms | Minimize main thread work |
| CLS | < 0.1 | Set image dimensions, use font-display: swap |
| INP | < 200ms | Optimize event handlers |
| TTFB | < 800ms | Use SSG, optimize server |

### Performance Checklist
- [ ] Hero image optimized (WebP, proper size)
- [ ] Fonts self-hosted (next/font)
- [ ] Third-party scripts deferred (Partytown if needed)
- [ ] CSS minimized (Tailwind purge)
- [ ] JavaScript minimized (Next.js optimization)
- [ ] Images lazy loaded (except hero)
- [ ] Content-visibility: auto for off-screen
- [ ] Preload critical resources

---

## ACCESSIBILITY AS SEO

### Accessibility = SEO
- Semantic HTML → Google understands content
- Alt text → Images indexed properly
- Heading hierarchy → Content structure understood
- Keyboard navigation → Crawlable
- Screen reader support → Content accessible

### Accessibility Checklist
- [ ] 4.5:1 contrast ratio for text
- [ ] 3:1 contrast ratio for UI
- [ ] Keyboard navigation works
- [ ] Screen reader announces content
- [ ] prefers-reduced-motion respected
- [ ] Focus indicators visible
- [ ] Touch targets 44px minimum
- [ ] No keyboard traps

---

## PER-PROJECT SEO

### Khemji
- **Target:** "security training that doesn't suck"
- **Blog:** Weekly posts about security awareness
- **Local:** Security training [city] landing pages
- **Schema:** Organization, Course, FAQPage

### ShipBridge
- **Target:** "international logistics technology"
- **Blog:** Weekly posts about logistics trends
- **Local:** Logistics [country] landing pages
- **Schema:** Organization, LocalBusiness, Service

### MAAC
- **Target:** "fashion e-commerce india"
- **Blog:** Weekly posts about fashion trends
- **Local:** Fashion [city] landing pages
- **Schema:** Organization, Product, Offer

### Silbar
- **Target:** "security services [city]"
- **Blog:** Weekly posts about security
- **Local:** Security services [city] landing pages
- **Schema:** Organization, LocalBusiness, Service

---

## HOW TO USE THIS FILE

When building ANY page:
1. Check the technical SEO checklist
2. Use semantic HTML
3. Optimize images
4. Add content (300+ words)
5. Add internal links
6. Add JSON-LD structured data
7. Test Core Web Vitals
8. Test accessibility

**SEO is not optional. It's built in from day one.**
