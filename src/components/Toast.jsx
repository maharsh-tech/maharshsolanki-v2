import { useEffect } from 'react'

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => onClose(), 3200)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const isError = toast.type === 'error'

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        right: '1.5rem',
        bottom: '1.5rem',
        zIndex: 10001,
        maxWidth: '380px',
        padding: '0.85rem 1.15rem',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${isError ? 'var(--accent-red)' : 'var(--accent-green)'}`,
        backgroundColor: 'var(--bg-surface-elevated)',
        color: isError ? 'var(--accent-red)' : 'var(--accent-green)',
        boxShadow: 'var(--shadow-card)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.825rem',
        fontWeight: 700,
      }}
    >
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <span aria-hidden="true" style={{ display: 'flex' }}>
          {isError ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </span>
        <span style={{ flex: 1, color: 'var(--text-main)' }}>{toast.message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '900',
            color: 'var(--text-muted)',
            padding: '0 0 0 0.5rem',
            fontSize: '1.1rem',
            lineHeight: 1,
          }}
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default Toast
