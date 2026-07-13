import { WORDPRESS_BLOG } from '@/lib/config'
import type { BlogPost } from '@/data/blog'

type WpRendered = { rendered: string; protected?: boolean }

type WpPost = {
  id: number
  date: string
  slug: string
  link: string
  title: WpRendered
  excerpt: WpRendered
  content: WpRendered
  author: number
  featured_media: number
  categories: number[]
  _embedded?: {
    author?: Array<{ name?: string }>
    'wp:featuredmedia'?: Array<{
      source_url?: string
      alt_text?: string
      media_details?: { sizes?: Record<string, { source_url?: string }> }
    }>
    'wp:term'?: Array<Array<{ id: number; name: string; taxonomy: string }>>
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&ldquo;/g, '"')
    .replace(/&#8221;|&rdquo;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

function estimateReadTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.ceil(words / 200))
  return `${mins} min read`
}

function featuredImage(post: WpPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return ''
  const medium =
    media.media_details?.sizes?.medium_large?.source_url ||
    media.media_details?.sizes?.large?.source_url ||
    media.media_details?.sizes?.medium?.source_url
  return medium || media.source_url || ''
}

function categoryName(post: WpPost): string {
  const terms = post._embedded?.['wp:term']?.flat() || []
  const cat = terms.find((t) => t.taxonomy === 'category')
  if (!cat || cat.name.toLowerCase() === 'uncategorized') return 'Company Updates'
  return cat.name
}

export function mapWpPostToBlogPost(post: WpPost): BlogPost {
  return {
    id: `wp-${post.id}`,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered) || stripHtml(post.content.rendered).slice(0, 160),
    content: post.content.rendered,
    coverImage: featuredImage(post),
    author: post._embedded?.author?.[0]?.name || 'Silbar Security',
    publishedAt: post.date,
    category: categoryName(post),
    readTime: estimateReadTime(post.content.rendered),
    externalUrl: post.link || `${WORDPRESS_BLOG.origin}/${post.slug}/`,
    source: 'wordpress',
  }
}

/**
 * Fetch published posts from WordPress REST API.
 * Uses ISR revalidation so new WP posts appear without redeploy.
 */
export async function fetchWordPressPosts(limit = 24): Promise<BlogPost[]> {
  try {
    const url = `${WORDPRESS_BLOG.api}/posts?per_page=${limit}&_embed=1&status=publish&orderby=date&order=desc`
    const res = await fetch(url, {
      next: { revalidate: 300 }, // 5 minutes
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      console.error('[wordpress] posts fetch failed', res.status)
      return []
    }
    const data = (await res.json()) as WpPost[]
    if (!Array.isArray(data)) return []
    return data
      .map(mapWpPostToBlogPost)
      // Skip default WP hello-world noise if still present and alone
      .filter((p) => !(p.slug === 'hello-world' && p.title.toLowerCase() === 'hello world!'))
  } catch (err) {
    console.error('[wordpress] fetch error', err)
    return []
  }
}

export async function fetchWordPressPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const url = `${WORDPRESS_BLOG.api}/posts?slug=${encodeURIComponent(slug)}&_embed=1&status=publish`
    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as WpPost[]
    if (!Array.isArray(data) || data.length === 0) return null
    return mapWpPostToBlogPost(data[0]!)
  } catch {
    return null
  }
}
