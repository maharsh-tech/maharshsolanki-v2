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
        right: '20px',
        bottom: '20px',
        zIndex: 10001,
        maxWidth: '360px',
        padding: '12px 16px',
        borderRadius: '6px',
        border: `1px solid ${isError ? '#f5c6cb' : '#c3e6cb'}`,
        backgroundColor: isError ? '#f8d7da' : '#d4edda',
        color: isError ? '#721c24' : '#155724',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <span style={{ flex: 1 }}>{toast.message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'inherit',
            padding: 0,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast
