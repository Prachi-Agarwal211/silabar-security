import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `font-src 'self' https://fonts.gstatic.com`,
  `img-src 'self' data: blob: https:`,
  `media-src 'self' blob:`,
  `frame-src 'self' https://www.google.com https://maps.google.com`,
  `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://fonts.googleapis.com https://fonts.gstatic.com`,
  `base-uri 'self'`,
  `form-action 'self' https://wa.me https://api.whatsapp.com`,
].join('; ')

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // MacBook Retina + Studio Display widths
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1728, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap', '@gsap/react'],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : undefined,
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      {
        source: '/:path*\\.(webp|jpg|jpeg|png|svg|ico|mp4|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
