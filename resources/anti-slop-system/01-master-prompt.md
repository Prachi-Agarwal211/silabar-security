# Anti-Slop Master Prompt

**Source:** https://www.sailop.com/blog/anti-slop-prompt-template-2026

Full documentation of the 9-lever anti-slop prompt system. When you need AI output that doesn't look like AI output, use this template.

---

## The 9 Levers

### Lever 1: Persona
Define who the AI is being. Not "a designer" — specific:
- "You are a senior design engineer at Lusion, known for award-winning Three.js experiences"
- "You are a brutalist web designer inspired by David Rudnick and Wolfgang Weingart"
- "You are a motion designer who studied under Eben Dennis at School of Motion"

### Lever 2: Format
Explicit structure requirements:
- "Return 3 variants, labeled A/B/C"
- "Use this exact structure: Concept → Technique → Code → Rationale"
- "No preamble, no summary, just the code"

### Lever 3: Banned List
Specific things the AI must NOT do:
- "Do NOT use fade-in animations"
- "Do NOT default to a white/black/gray + one accent color palette"
- "Do NOT use the word 'delight' or 'elevate'"
- "Do NOT suggest a 3-column card layout"

### Lever 4: Anchors
Give specific starting points instead of letting AI default:
- "Use the Tannery palette: #8B5E3C, #D4A574, #2D1810, #F5EDE3"
- "Use Space Mono for headings, Plus Jakarta Sans for body"
- "Use the Arte Povera texture approach"

### Lever 5: Constraints
Hard limits:
- "No dependencies beyond GSAP and Three.js"
- "Must work without JavaScript enabled (progressive enhancement)"
- "Must pass Lighthouse at 90+ on all categories"
- "Must respect prefers-reduced-motion"

### Lever 6: Specificity
Name exact techniques, not vague directions:
- BAD: "make it look good" → GOOD: "use a magnetic button with elastic snap-back on the CTA"
- BAD: "add animation" → GOOD: "use scroll-triggered split-text stagger with character-level reveal"
- BAD: "nice colors" → GOOD: "use a 3-color mesh gradient animated at 20s cycle"

### Lever 7: Risk Dial
Set the dial position explicitly:
- "Risk: Bold. I want one experimental element."
- "Risk: Safe. Use proven patterns only."
- "Risk: Radical. I'm fine with it possibly looking broken."

### Lever 8: Iteration Rule
Tell the AI how you want it to iterate:
- "If you suggest a generic pattern (fade-in, 3-column cards), stop and suggest an alternative"
- "Every response must include one risky alternative"
- "Default to the lazy solution unless I say 'full version'"

### Lever 9: Anti-Cleanse
Final instruction that resets AI defaults:
- "Before you output, review: does any element use .fade-in? Does the layout default to symmetric hero? Does the palette default to white/gray/blue? If yes, replace them."

---

## Anti-Slop Prompt Template

```
You are [LEVER 1: PERSONA].

Return [LEVER 2: FORMAT].

Do NOT use [LEVER 3: BANNED LIST].

Use these starting points: [LEVER 4: ANCHORS].

Constraints: [LEVER 5: CONSTRAINTS].

I want specific techniques: [LEVER 6: SPECIFICITY].

Risk level: [LEVER 7: RISK DIAL].

[LEVER 8: ITERATION RULE].

[LEVER 9: ANTI-CLEANSE].
```

---

## Example: Full Anti-Slop Prompt

```
You are a senior creative developer at Lusion, specializing in Three.js and GSAP scroll narratives.

Return: 3 concept variants (A/B/C). Each variant has: Technique name → Implementation steps → Code snippet → When to use.

Do NOT use: fade-in animations, symmetric hero layouts, 3-column card grids, Inter font, white/gray/blue palettes, the words "elevate" or "delight".

Use these anchors: Tannery palette (#8B5E3C, #D4A574, #2D1810, #F5EDE3). Space Mono for headings. Faux-3D SVG technique for hero graphic.

Constraints: No framework beyond GSAP. Must work in Firefox, Chrome, Safari. Must respect prefers-reduced-motion.

Technique: Split-text character stagger on hero. Magnetic button on CTA. Mesh gradient background with mouse reactivity.

Risk level: Bold. Include one experimental animation pattern.

Every variant must include one risky alternative. If you default to any banned pattern, stop and replace it.

Before output: Scan for banned patterns. Replace any found.
```
