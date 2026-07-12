'use client'

import { useState } from 'react'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog'
import BlogCard from '@/components/ui/BlogCard'
import ScrollReveal from '@/components/animations/ScrollReveal'

export default function BlogFilter() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === active)

  return (
    <>
      <ScrollReveal>
        <div className="blog-categories" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem', justifyContent: 'center' }}>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid rgba(191, 149, 63, 0.4)',
                background: active === cat ? 'var(--color-cherry)' : 'transparent',
                color: active === cat ? 'white' : 'var(--color-midnight)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {filtered.map((post, i) => (
          <ScrollReveal key={post.id} delay={i * 0.1}>
            <BlogCard post={post} />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)', padding: '3rem 0', fontSize: '1rem' }}>
          No posts found in this category.
        </p>
      )}
    </>
  )
}
