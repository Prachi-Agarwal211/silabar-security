import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Shield,
  ShieldCheck,
  Eye,
  Building2,
  Flame,
  Warehouse,
  Users,
} from 'lucide-react'
import type { BlogPost } from '@/data/blog'

interface BlogCardProps {
  post: BlogPost
}

// Returns a rendered icon element, not a component reference — keeps the
// react-hooks/static-components rule happy (no JSX tag bound to a per-render value).
function getCategoryIcon(category: string = '', title: string = '', size = 26): ReactNode {
  const cat = category.toLowerCase()
  const t = title.toLowerCase()
  if (t.includes('fire') || cat.includes('fire')) return <Flame size={size} />
  if (t.includes('cctv') || t.includes('ai') || t.includes('surveillance')) return <Eye size={size} />
  if (t.includes('warehouse') || t.includes('theft')) return <Warehouse size={size} />
  if (t.includes('iso') || t.includes('certif') || t.includes('psara') || cat.includes('compliance')) return <ShieldCheck size={size} />
  if (t.includes('hotel') || t.includes('school') || t.includes('event') || t.includes('bank')) return <Building2 size={size} />
  if (t.includes('women')) return <Users size={size} />
  return <Shield size={size} />
}

export default function BlogCard({ post }: BlogCardProps) {
  const dateObj = new Date(post.publishedAt)
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const href = post.externalUrl || `/blog/${post.slug}`
  const isExternal = Boolean(post.externalUrl)
  const isSvgImage = post.coverImage?.endsWith('.svg')
  const isPhoto = Boolean(post.coverImage && !isSvgImage)

  const inner = (
    <>
      <div className="blog-card__image-placeholder">
        {isPhoto ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="blog-card__cover"
          />
        ) : (
          <div className="blog-card__graphic-cover">
            <div className="blog-card__graphic-badge">
              {getCategoryIcon(post.category, post.title)}
            </div>
            <div className="blog-card__graphic-title">{post.title}</div>
          </div>
        )}
        <div className="blog-card__category">{post.category}</div>
        {isExternal ? (
          <span className="blog-card__source">WordPress</span>
        ) : null}
      </div>

      <div className="blog-card__content">
        <div className="blog-card__meta">
          <span className="blog-card__meta-item">
            <Calendar size={14} /> {formattedDate}
          </span>
          <span className="blog-card__meta-item">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>

        <div className="blog-card__footer">
          <span className="blog-card__author">{post.author}</span>
          <span className="blog-card__read-more">
            {isExternal ? (
              <>
                Read on Blog <ExternalLink size={14} />
              </>
            ) : (
              <>
                Read Article <ArrowRight size={14} />
              </>
            )}
          </span>
        </div>
      </div>
    </>
  )

  return (
    <article className="blog-card glass-panel--light">
      {isExternal ? (
        <a
          href={href}
          className="blog-card__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${post.title} on Silbar blog`}
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className="blog-card__link" aria-label={`Read ${post.title}`}>
          {inner}
        </Link>
      )}
    </article>
  )
}
