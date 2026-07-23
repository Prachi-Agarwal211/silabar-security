import Link from 'next/link'
import type { Metadata } from 'next'
import { Shield, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found | Silbar Security Services Pvt. Ltd.',
  description: 'The page you are looking for does not exist or has been moved. Return to Silbar Security Services Pvt. Ltd. home.',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="not-found-page" role="alert">
      <style>{`
        .not-found-page {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-midnight, #0B0E14);
          padding: 2rem;
        }
        .not-found-content {
          text-align: center;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .not-found-icon { color: var(--color-gold, #BF953F); }
        .not-found-code {
          font-family: var(--font-display, serif);
          font-size: clamp(5rem, 12vw, 8rem);
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, var(--color-gold, #BF953F), var(--color-gold-light, #D4AF37));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .not-found-title {
          font-family: var(--font-display, serif);
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: var(--color-cream, #FAF6EC);
        }
        .not-found-desc {
          font-family: var(--font-body, sans-serif);
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(250, 248, 244, 0.7);
          margin-bottom: 0.5rem;
        }
        .not-found-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body, sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-gold, #BF953F);
          text-decoration: none;
          padding: 0.75em 1.5em;
          border: 1px solid rgba(191, 149, 63, 0.3);
          border-radius: 4px;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
        }
        .not-found-link:hover {
          background: rgba(191, 149, 63, 0.1);
          border-color: var(--color-gold, #BF953F);
          color: var(--color-gold-light, #D4AF37);
        }
        .not-found-link:focus-visible {
          outline: 2px solid var(--color-gold, #BF953F);
          outline-offset: 3px;
        }
      `}</style>
      <div className="not-found-content">
        <Shield size={48} className="not-found-icon" strokeWidth={1.5} />
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="not-found-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </main>
  )
}
