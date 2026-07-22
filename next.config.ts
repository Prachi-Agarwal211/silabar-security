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

const isDev = process.env.NODE_ENV !== 'production'

const csp = [
  `default-src 'self'`,
  `script-src 'self' ${isDev ? "'unsafe-eval' " : ''}'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `font-src 'self' https://fonts.gstatic.com`,
  `img-src 'self' data: blob: https:`,
  `media-src 'self' blob:`,
  `frame-src 'self' https://www.google.com https://maps.google.com`,
  `connect-src 'self' https://blog.silbarsecurity.in https://www.google-analytics.com https://www.googletagmanager.com https://fonts.googleapis.com https://fonts.gstatic.com`,
  `base-uri 'self'`,
  `form-action 'self' https://wa.me https://api.whatsapp.com`,
].join('; ')

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
      {
        protocol: 'https',
        hostname: 'blog.silbarsecurity.in',
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
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/silbar-advantage', destination: '/about', permanent: true },
      { source: '/financing', destination: '/contact', permanent: true },
      { source: '/own-a-franchise', destination: '/franchise', permanent: true },
      { source: '/get-a-security-quote', destination: '/contact', permanent: true },
      { source: '/industries-we-serve', destination: '/industries', permanent: true },
      { source: '/industries-we-serve/:slug', destination: '/industries/:slug', permanent: true },
      { source: '/security-services/vehicle-patrol', destination: '/services/mobile-patrol-security', permanent: true },
      { source: '/security-services/professional-security', destination: '/services/security-guard-services', permanent: true },
      { source: '/security-services/remote-video-monitoring', destination: '/services/cctv-surveillance-systems', permanent: true },
    ]
  },
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
      {
        source: '/((?!_next/static|_next/image|favicon.ico|icon-192.png|icon-512.png|apple-touch-icon.png|og-image.jpg|logo.png|logo.webp|manifest.json|llms.txt).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=0, must-revalidate',
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store',
          },
        ],
      },
    ]
  },
}

export default nextConfig
