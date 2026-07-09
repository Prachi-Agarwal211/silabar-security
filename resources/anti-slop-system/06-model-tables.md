# AI Model Behavior Tables

How different AI models behave with prompt engineering. Useful for adapting anti-slop strategies per model.

---

## Claude (Current Model)

| Trait | Detail |
|-------|--------|
| **Tone** | Professional, explanatory, thorough |
| **Creative defaults** | Defaults to safe/balanced aesthetic density |
| **Layout defaults** | Symmetric hero, 3-column cards, sticky nav |
| **Animation defaults** | Fade-in, slide-up, basic hover scale |
| **Color defaults** | White background, one accent, gray text |
| **Font defaults** | Sans-serif (Inter-adjacent) |
| **Best for** | Complex multi-step tasks, architecture, explanation |
| **Weakness** | Over-explains, verbose, defaults to safe |
| **Anti-slop lever** | Give clear constraints, banned lists, "don't explain" |
| **Response to banned lists** | Highly effective — respects explicit rules |

### Prompt Strategy for Claude
```
You are [specific persona].
Do NOT use [banned patterns].
Return only [format] — no preamble or explanation.
Use [specific palette] and [specific techniques].
```

---

## GPT-5

| Trait | Detail |
|-------|--------|
| **Tone** | Concise, direct, action-oriented |
| **Creative defaults** | Defaults to moderate risk tolerance |
| **Layout defaults** | More varied than Claude, still defaults to symmetric |
| **Animation defaults** | Suggests more varied patterns but less detailed |
| **Color defaults** | Similar white/gray/blue tendency |
| **Font defaults** | Inter or system-ui |
| **Best for** | Quick iteration, brainstorming, many variants |
| **Weakness** | Can skip edge cases, hallucinate APIs |
| **Anti-slop lever** | Use iteration — ask for 3 variants, pick best |

### Prompt Strategy for GPT-5
```
Give me 3 variants for [task]. Variant A is safe, B is bold, C is radical.
For each: technique name, implementation, code.
Banned: [list].
Use: [anchors].
```

---

## Gemini

| Trait | Detail |
|-------|--------|
| **Tone** | Collaborative, structured |
| **Creative defaults** | Defaults to safe, structured output |
| **Layout defaults** | Very structured, often table-like layouts |
| **Animation defaults** | Suggests CSS transitions, rarely advanced patterns |
| **Color defaults** | Google Material-like palettes |
| **Font defaults** | Google Fonts (Roboto, Open Sans) |
| **Best for** | Content structure, SEO, multi-format |
| **Weakness** | Less creative, format-rigid |
| **Anti-slop lever** | Give very specific format instructions |

### Prompt Strategy for Gemini
```
Structure: [exact format].
Use these exact colors: [hex codes].
Use these exact fonts: [font names].
Techniques: [name each one specifically].
```

---

## Universal Anti-Generic Rules (All Models)

1. Never accept `.fade-in` — always redirect to mask, morph, reveal, or draw
2. Never default to symmetric hero — always propose asymmetric first
3. Never default to Inter/white-gray-blue — always start from a palette anchor
4. Never output 3-column cards without explicit request
5. Always propose 1 risky alternative per deliverable
6. Never say "elevate" or "delight" — use specific technique names
7. Always prefer native platform features before library code
8. If a technique would take 5+ lines, mention the shortcut
9. Boring is better than broken for production
10. If unsure, ship the lazy version and ask

---

## Comparison Table

| Scenario | Claude | GPT-5 | Gemini |
|----------|--------|-------|--------|
| Given open-ended prompt | Safe, detailed | Moderate, concise | Safe, structured |
| Given banned list | Respects fully | Respects mostly | Respects literally |
| Asked for 3 variants | Detailed but similar | Genuinely varied | Structurally varied |
| Asked for code | Full implementation | Working snippets | Skeleton only |
| Asked to be creative | Needs permission | Defaults to moderate | Needs specific direction |
| Best prompt length | Long (many constraints) | Medium (clear hierarchy) | Short (structured) |
