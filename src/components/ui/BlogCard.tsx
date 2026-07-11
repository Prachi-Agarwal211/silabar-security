import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import type { BlogPost } from '@/data/blog'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format the date
  const dateObj = new Date(post.publishedAt)
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <article className="blog-card glass-panel">
      <Link href={`/blog/${post.slug}`} className="blog-card__link" aria-label={`Read ${post.title}`}>
        {/* We use a CSS gradient placeholder for the image since we don't have actual images */}
        <div className="blog-card__image-placeholder">
          <div className="blog-card__category">{post.category}</div>
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
              Read Article <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
