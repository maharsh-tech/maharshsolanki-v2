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
        maxWidth: '400px',
        padding: '0.85rem 1.25rem',
        borderRadius: 'var(--radius-brutal)',
        border: '2.5px solid var(--border-color)',
        backgroundColor: isError ? 'var(--accent-red)' : 'var(--accent-green)',
        color: isError ? '#ffffff' : '#000000',
        boxShadow: 'var(--shadow-lg)',
        fontSize: '0.9rem',
        fontWeight: 800,
      }}
    >
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <span aria-hidden="true" style={{ display: 'flex' }}>
          {isError ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </span>
        <span style={{ flex: 1 }}>{toast.message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '900',
            color: 'inherit',
            padding: '0 0 0 0.5rem',
            fontSize: '1.25rem',
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
