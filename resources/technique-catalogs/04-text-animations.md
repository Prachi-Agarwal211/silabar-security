# Text Animations — Full Tutorial Catalog

---

## 1. Split & Stagger

### Theory
Split text into individual characters, words, or lines, then animate each segment with a stagger delay. Creates a polished, professional entrance that feels choreographed.

### Step by Step

**1. GSAP SplitText**
```javascript
// Split the text
let split = new SplitText('.headline', { type: 'chars,words,lines' })
// Animate with stagger
gsap.from(split.chars, {
  opacity: 0,
  y: 50,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.6,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.headline', start: 'top 80%' }
})
```

**2. Manual split (no plugin)**
```javascript
function splitText(el) {
  const text = el.textContent
  el.textContent = ''
  Array.from(text).forEach(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    el.appendChild(span)
  })
  return el.querySelectorAll('span')
}
const chars = splitText(document.querySelector('.headline'))
gsap.from(chars, { opacity: 0, y: 30, stagger: 0.03, duration: 0.5, ease: 'power2.out' })
```

**3. Stagger from specific position**
```javascript
let split = new SplitText('.headline', { type: 'chars' })
gsap.from(split.chars, {
  opacity: 0,
  y: 30,
  stagger: { each: 0.03, from: 'center' }, // 'start', 'end', 'center', 'edges', 'random'
  duration: 0.5,
  ease: 'power2.out'
})
```

**4. Different effects per type**
```javascript
let split = new SplitText('.headline', { type: 'chars,words,lines' })
// Words fade and move up
gsap.from(split.words, { opacity: 0, y: 20, stagger: 0.05, duration: 0.6 })
// Chars rotate in (slightly delayed)
gsap.from(split.chars, { rotateX: -90, stagger: 0.02, duration: 0.4 }, '-=0.3')
```

### Variants
- **Word stagger**: Each word enters one by one
- **Line stagger**: Each line enters sequentially (great for multi-line headers)
- **Random stagger**: Organic, non-linear entrance
- **Reverse stagger**: Last enters first

### When to Use
- Hero headlines
- Section headers
- Quotations/testimonials
- Title sequences

---

## 2. Scramble / Reveal Text

### Theory
Text cycles through random characters before resolving into the final word. Creates a "decrypting" or "hacking" aesthetic.

### Step by Step

**1. GSAP TextPlugin**
```javascript
gsap.to('.scramble-text', {
  text: {
    value: 'The Final Result',
    speed: 0.3,         // Character change speed
    delimiter: '',       // Character delimiter ('' = per char)
    pad: true,           // Pad with spaces for same width
    oldClass: 'old',
    newClass: 'new'
  },
  duration: 3,
  ease: 'none'
})
```

**2. Custom scramble on hover**
```javascript
const chars = '!<>-_\\/[]{}—=+*^?#________'
function scramble(el) {
  const original = el.dataset.text
  let iteration = 0
  clearInterval(el.interval)
  el.interval = setInterval(() => {
    el.textContent = original.split('').map((char, i) => {
      if (i < iteration) return original[i]
      return chars[Math.floor(Math.random() * chars.length)]
    }).join('')
    if (iteration >= original.length) clearInterval(el.interval)
    iteration += 1/3
  }, 30)
}
el.addEventListener('mouseenter', () => scramble(el))
el.addEventListener('mouseleave', (e) => { clearInterval(el.interval); el.textContent = el.dataset.text })
```

**3. Scramble on scroll**
```javascript
ScrollTrigger.create({
  trigger: '.scramble', start: 'top 80%',
  onEnter: () => {
    gsap.to('.scramble-text', {
      text: { value: 'Unlocked', speed: 0.5 },
      duration: 2
    })
  }
})
```

### Variants
- **Speed ramp**: Fast scramble then slow reveal at end
- **Character set**: Use specific character sets (hex, binary, symbols)
- **Word-by-word**: Each word scrambles independently

### When to Use
- Loading/message reveals
- Hero taglines
- Interactive hover effects on links
- Tech/brand announcements

---

## 3. Word-by-Word Lighting

### Theory
Each word lights up sequentially, like someone speaking the words. Creates dramatic emphasis on key messaging.

### Step by Step

**1. GSAP SplitText color transition**
```javascript
let words = new SplitText('.highlight-text', { type: 'words' })
gsap.from(words.words, {
  color: '#666',
  stagger: 0.08,
  duration: 0.5,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.highlight-text', start: 'top 75%' }
})
```

**2. Gradient sweep across words**
```javascript
let words = new SplitText('.gradient-text', { type: 'words' })
words.words.forEach((word, i) => {
  gsap.to(word, {
    backgroundImage: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    duration: 0.3,
    delay: i * 0.1
  })
})
```

**3. Glow lighting effect**
```javascript
gsap.from(words.words, {
  textShadow: '0 0 0px rgba(255,255,255,0)',
  stagger: 0.1,
  duration: 0.8,
  ease: 'power2.out'
})
```

### When to Use
- Testimonial highlights
- Key value propositions
- Poetry/lyrics
- Emphasis on specific phrases

---

## 4. Variable Font Interpolation

### Theory
Animate variable font axes (weight, width, slant, optical size) over scroll, time, or interaction. Requires a variable font to be loaded.

### Step by Step

**1. Weight animation on scroll**
```javascript
gsap.to('.variable-text', {
  fontVariationSettings: '"wght" 900, "wdth" 150',
  scrollTrigger: { trigger: '.variable-text', start: 'top 80%', end: 'top 20%', scrub: 1 }
})
```

**2. Weight on hover**
```javascript
el.addEventListener('mouseenter', () => {
  gsap.to(el, { fontVariationSettings: '"wght" 900', duration: 0.3 })
})
el.addEventListener('mouseleave', () => {
  gsap.to(el, { fontVariationSettings: '"wght" 400', duration: 0.5 })
})
```

**3. Multi-axis on mouse move**
```javascript
document.addEventListener('mousemove', (e) => {
  const wght = 200 + (e.clientX / window.innerWidth) * 700
  const wdth = 75 + (e.clientY / window.innerHeight) * 50
  gsap.to('.var-text', { fontVariationSettings: `"wght" ${Math.round(wght)}, "wdth" ${Math.round(wdth)}`, duration: 0.2 })
})
```

**4. CSS-only weight animation**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap');
@keyframes weightPulse { 0% { font-variation-settings: 'wght' 300; } 50% { font-variation-settings: 'wght' 800; } 100% { font-variation-settings: 'wght' 300; } }
.var-anim { animation: weightPulse 3s ease-in-out infinite; }
```

### Requirements
- Font must be a variable font (check Google Fonts for `opsz,wght@` syntax)
- CSS `@property` may be needed for smooth CSS transitions

### When to Use
- Hero headers with dramatic weight shifts
- Interactive typography
- Data-driven weight changes (importance)
- Brand moments

---

## 5. Wave / Ripple Text

### Theory
Characters animate in a wave pattern — each character moves with a slightly different delay based on its position, creating a sine-wave motion.

### Step by Step

**1. Vertical wave on scroll**
```javascript
let chars = new SplitText('.wave-text', { type: 'chars' })
gsap.from(chars.chars, {
  y: 40,
  opacity: 0,
  stagger: { each: 0.03, from: 'center' },
  ease: 'power2.out',
  scrollTrigger: { trigger: '.wave-text', start: 'top 80%' }
})
```

**2. Continuous wave (oscillation)**
```javascript
chars.chars.forEach((char, i) => {
  gsap.to(char, {
    y: -10,
    duration: 1,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: i * 0.08
  })
})
```

**3. Wave + rotation**
```javascript
gsap.from(chars.chars, {
  y: 30,
  rotation: 15,
  opacity: 0,
  stagger: { each: 0.02, from: 'edges' },
  duration: 0.8,
  ease: 'back.out(1.7)'
})
```

### When to Use
- Entertainment/music sites
- Animated brand names
- Hero loaders
- Playful headers

---

## 6. Typewriter

### Theory
Characters appear one at a time with a blinking cursor, simulating typing.

### Step by Step

**1. CSS typewriter (single line)**
```css
.typewriter { overflow: hidden; white-space: nowrap; border-right: 2px solid; animation: typing 3s steps(30), blink 0.5s step-end infinite; width: 0; }
@keyframes typing { to { width: 100%; } }
@keyframes blink { 50% { border-color: transparent; } }
```

**2. GSAP typewriter**
```javascript
gsap.to('.typewriter', {
  text: { value: 'This is the full text that will be typed out.', delimiter: '' },
  duration: 3,
  ease: 'none'
})
```

**3. JavaScript typewriter (loop)**
```javascript
async function typeWriter(el, texts, speed = 50) {
  for (const text of texts) {
    el.textContent = ''
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i]
      await new Promise(r => setTimeout(r, speed))
    }
    await new Promise(r => setTimeout(r, 2000))
    for (let i = text.length; i > 0; i--) {
      el.textContent = text.substring(0, i - 1)
      await new Promise(r => setTimeout(r, 25))
    }
  }
}
typeWriter(document.querySelector('.typewriter'), ['First message', 'Second message', 'Third message'])
```

### When to Use
- Terminal/developer aesthetics
- Hero subtitles
- Loading/tutorial text
- Chat/dialog interfaces

---

## 7. Text Mask Reveal

### Theory
Text is revealed through a moving mask or gradient sweep. The text is initially hidden, then a moving gradient reveals it.

### Step by Step

**1. Gradient sweep mask**
```css
.mask-text { background: linear-gradient(90deg, transparent 0%, #fff 30%, #fff 70%, transparent 100%); background-size: 200% 100%; background-clip: text; -webkit-text-fill-color: transparent; animation: sweep 3s ease-in-out infinite; }
@keyframes sweep { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
```

**2. Scroll-triggered mask reveal**
```javascript
gsap.to('.mask-reveal', {
  backgroundPosition: '0% 0%',
  scrollTrigger: { trigger: '.mask-reveal', start: 'top 80%' }
})
```
```css
.mask-reveal { background: linear-gradient(90deg, transparent 50%, #fff 50%); background-size: 200% 100%; background-clip: text; -webkit-text-fill-color: transparent; background-position: 100% 0; transition: background-position 1.2s cubic-bezier(0.65, 0, 0.35, 1); }
.mask-reveal.revealed { background-position: 0% 0; }
```

**3. SVG mask approach**
```svg
<mask id="sweepMask">
  <rect x="-100%" y="0" width="100%" height="100%" fill="white">
    <animate attributeName="x" values="-100%;100%" dur="2s" fill="freeze"/>
  </rect>
</mask>
<text mask="url(#sweepMask)">Revealed Text</text>
```

### When to Use
- Hero titles
- Brand slogans
- Loading/intro sequences
- Emphasis on specific words

---

## 8. Shimmer / Glitter Text

### Theory
A moving highlight sweeps across text, creating a metallic/shiny effect.

### Step by Step

**1. CSS shimmer**
```css
.shimmer { background: linear-gradient(90deg, #666 25%, #fff 50%, #666 75%); background-size: 200% 100%; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s ease-in-out infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
```

**2. Gold/metallic shimmer**
```css
.gold-shimmer { background: linear-gradient(90deg, #BF953F, #FCF6B5, #B38728, #FBF5B7, #AA771C); background-size: 200% 100%; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 4s linear infinite; }
```

### When to Use
- Premium/branding
- Sale/promotion announcements
- Awards or achievements
- Special offers
