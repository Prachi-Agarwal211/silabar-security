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
          'Claude-SearchBot',
          'Claude-User',

          'Applebot-Extended',
          'Amazonbot',
          'Bytespider',
          'CCBot',
          'cohere-ai',
          'Grokbot',
          'Google-InspectionTool',
        ],
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
