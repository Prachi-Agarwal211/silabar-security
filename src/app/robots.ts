import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'OAI-SearchBot', 'Claude-Web', 'ClaudeBot', 'anthropic-ai'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.silbarsecurity.in/sitemap.xml',
    host: 'https://www.silbarsecurity.in',
  }
}
