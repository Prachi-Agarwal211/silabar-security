# Testing & CI — Animation Quality Assurance

---

## 1. Visual Regression Testing

### Playwright setup
```ts
// tests/visual/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Stabilize animations
  await page.addInitScript(() => {
    // Freeze GSAP animations
    window.gsap?.globalTimeline?.timeScale(0);
    // Finish all current tweens
    window.gsap?.tweens?.forEach(t => t.progress(1));
  });

  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.01,
    mask: [page.locator('[data-dynamic]')], // mask dynamic content
  });
});
```

### GitHub Actions workflow
```yaml
# .github/workflows/visual-tests.yml
name: Visual Regression Tests
on:
  pull_request:
    branches: [main]

jobs:
  visual:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npx playwright install chromium
      - run: npm run test:visual
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: visual-diffs
          path: test-results/
```

### Viewport matrix
```ts
// Run visual tests across all target devices
const viewports = [
  { width: 375, height: 812, name: 'mobile' },    // iPhone
  { width: 768, height: 1024, name: 'tablet' },    // iPad portrait
  { width: 1440, height: 900, name: 'desktop' },   // standard
  { width: 1920, height: 1080, name: 'wide' },     // Full HD
];

viewports.forEach(({ width, height, name }) => {
  test(`homepage @${name}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page).toHaveScreenshot(`homepage-${name}.png`);
  });
});
```

### Cross-platform baseline generation
```bash
# Generate snapshots in Docker to match CI rendering
docker run --rm -v $(pwd):/work -w /work \
  mcr.microsoft.com/playwright:v1.52.0-noble \
  npx playwright test --update-snapshots
```

---

## 2. Animation-Specific Testing

### GSAP scroll mock (Jest)
```ts
// Mock ScrollTrigger for unit tests
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn(),
    getAll: jest.fn(() => []),
    kill: jest.fn(),
    refresh: jest.fn(),
    addEventListener: jest.fn(),
  },
  default: {},
}));
```

### Animation state testing
```ts
import { render, screen } from '@testing-library/react';

test('animated card appears after scroll trigger', async () => {
  render(<AnimatedSection />);

  // Initially hidden
  expect(screen.getByTestId('card')).toHaveStyle({ opacity: 0 });

  // Simulate scroll into view (ScrollTrigger fires)
  window.dispatchEvent(new Event('scroll'));
  await vi.waitFor(() => {
    expect(screen.getByTestId('card')).toHaveStyle({ opacity: 1 });
  });
});
```

### Testing prefers-reduced-motion
```ts
test('respects reduced motion preference', () => {
  // Mock the media query
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });

  render(<AnimatedHero />);
  // Should render with opacity:1 immediately, no animation class
  expect(screen.getByRole('heading')).toHaveStyle({ opacity: 1 });
});
```

### Long Animation Frame monitoring
```ts
// Cypress/Playwright custom check
test('no long animation frames during page load', async ({ page }) => {
  const longFrames: { duration: number; scripts: string[] }[] = [];

  await page.addInitScript(() => {
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.duration > 50) {
          window.__longFrames = window.__longFrames || [];
          window.__longFrames.push({
            duration: entry.duration,
            scripts: entry.scripts?.map((s: any) => s.sourceURL) || [],
          });
        }
      });
    }).observe({ type: 'long-animation-frame', buffered: true });
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const frames = await page.evaluate(() => (window as any).__longFrames || []);
  expect(frames.length).toBe(0);
});
```

---

## 3. Lighthouse CI Integration

```yaml
# .github/workflows/performance.yml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npx serve out -l 3000 &
      - uses: treosh/lighthouse-ci-action@v12
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/about
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

### Lighthouse budgets
```json
{
  "performance": 90,
  "accessibility": 95,
  "seo": 90,
  "resource-summary": [
    { "resourceType": "script", "maxSize": 200 },
    { "resourceType": "total", "maxSize": 500 }
  ]
}
```

---

## 4. Animation Testing Strategy

| Technique | Tool | What To Check |
|-----------|------|--------------|
| Visual diff | Playwright/Percy | Pixel-perfect rendering across viewports |
| Motion timing | jest.useFakeTimers | Animation durations match spec |
| ScrollTrigger | Mock ScrollTrigger | Correct trigger/start/end firing |
| Reduced motion | matchMedia mock | No motion when preference set |
| Performance | LoAF API | No frames >50ms |
| Bundle size | lighthouse-ci | JS < 200KB total |
| Cross-browser | Playwright matrix | Chrome + Firefox + Safari |
| Accessibility | axe-core | WCAG violations in animated states |

### CI pipeline flow
```
PR opened
├── Lint + Typecheck (fast, < 1min)
├── Unit tests (jest, < 2min)
│   └── Animation tests + scroll mocks
├── Build + Bundle analysis (lightouse-ci, < 3min)
├── Visual regression (Playwright, < 5min)
│   └── 4 viewports × 5 key pages = 20 screenshots
└── Report posted to PR
    ├── Visual diff images (if any)
    ├── Lighthouse scores
    └── Performance budget check
```

---

## 5. Tools Reference

| Tool | Use Case | Cost |
|------|----------|------|
| Playwright | Visual regression, cross-browser | Free |
| Percy | Cloud visual diff (team-friendly) | Free tier, paid plans |
| Chromatic | Storybook visual testing | Free for open source |
| Lighthouse CI | Performance budgets | Free |
| axe-core | Accessibility automation | Free |
| jest | Unit testing animations | Free |
| pixelmatch | Pixel-level diff engine | Free |
| SnapDrift | Self-hosted GitHub Actions VR | Free |

---

> **ponytail**: One visual regression test per key page/viewport catches more bugs than 100 unit tests. Start with Playwright + 3 viewports × homepage. Add more pages as regressions appear — not before.
