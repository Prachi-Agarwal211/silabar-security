export default function Loading() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100dvh', background: 'var(--color-midnight)',
      flexDirection: 'column', gap: '1.5rem', padding: '2rem'
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        border: '3px solid rgba(191, 149, 63, 0.15)',
        borderTopColor: 'var(--color-gold)',
        animation: 'loadingSpin 0.8s linear infinite',
      }} />
      <div style={{
        width: 160, height: 12, borderRadius: 6,
        background: 'rgba(191, 149, 63, 0.1)',
        animation: 'loadingPulse 1.5s ease-in-out infinite',
      }} />
      <div style={{
        width: 240, height: 12, borderRadius: 6,
        background: 'rgba(191, 149, 63, 0.08)',
        animation: 'loadingPulse 1.5s ease-in-out infinite 0.2s',
      }} />
      <style>{`
        @keyframes loadingSpin { to { transform: rotate(360deg); } }
        @keyframes loadingPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
