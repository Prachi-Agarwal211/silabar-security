import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, ExternalLink } from 'lucide-react'
import type { BlogPost } from '@/data/blog'

interface BlogCardProps {
  post: BlogPost
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

  const inner = (
    <>
      <div className="blog-card__image-placeholder">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="blog-card__cover"
          />
        ) : null}
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
