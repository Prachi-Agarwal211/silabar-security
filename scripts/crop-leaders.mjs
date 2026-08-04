import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'fs'

const out = 'public/images/team'
mkdirSync(out, { recursive: true })

const jobs = [
  { src: 'public/sonu-singh.jpg', name: 'sonu-singh' },
  { src: 'public/nakul-singh.jpg', name: 'nakul-singh' },
]

for (const { src, name } of jobs) {
  const meta = await sharp(src).metadata()
  const { width: w = 0, height: h = 0 } = meta
  console.log(name, w + 'x' + h)
  const size = Math.min(w, h)
  // Focus crop toward upper portion (face area), slight upward bias
  const left = Math.round((w - size) / 2)
  const top = Math.round((h - size) * 0.15)
  await sharp(src)
    .extract({ left, top, width: size, height: size })
    .resize(800, 800)
    .jpeg({ quality: 85 })
    .toFile(`${out}/${name}-square.jpg`)
  await sharp(src)
    .extract({ left, top, width: size, height: size })
    .resize(800, 800)
    .webp({ quality: 85 })
    .toFile(`${out}/${name}-square.webp`)
  console.log('wrote', name, 'square')
}
