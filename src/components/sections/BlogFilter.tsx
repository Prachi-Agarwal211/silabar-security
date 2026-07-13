'use client'

import { useMemo, useState } from 'react'
import type { BlogPost } from '@/data/blog'
import BlogCard from '@/components/ui/BlogCard'
import ScrollReveal from '@/components/animations/ScrollReveal'

type Props = {
  posts: BlogPost[]
  categories?: string[]
}

export default function BlogFilter({ posts, categories }: Props) {
  const cats = useMemo(() => {
    if (categories?.length) return categories
    const set = new Set<string>(['All'])
    posts.forEach((p) => set.add(p.category || 'Updates'))
    return Array.from(set)
  }, [posts, categories])

  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <ScrollReveal>
        <div className="blog-categories">
          {cats.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`blog-cat-btn${active === cat ? ' is-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="blog-grid">
        {filtered.map((post, i) => (
          <ScrollReveal key={post.id} delay={Math.min(i * 0.06, 0.4)}>
            <BlogCard post={post} />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="blog-empty">No posts found in this category.</p>
      )}
    </>
  )
}
