import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.silbarsecurity.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      // Explicit allow for major AI / answer-engine crawlers (GEO)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'PerplexityBot',
          'OAI-SearchBot',
          'Claude-Web',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
