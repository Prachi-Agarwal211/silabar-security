export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--color-midnight)',
      color: 'var(--color-gold)'
    }}>
      <div className="spinner">
        <style>{`
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(191, 149, 63, 0.3);
            border-radius: 50%;
            border-top-color: var(--color-gold);
            animation: spin 1s ease-in-out infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
