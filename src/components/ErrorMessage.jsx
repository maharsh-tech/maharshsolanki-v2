function ErrorMessage({ title = 'Unable to load data', message, onRetry }) {
  return (
    <div
      role="alert"
      className="monolith-card"
      style={{
        borderColor: 'var(--accent-red)',
        margin: '1.5rem 0',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: 'var(--accent-red)',
            border: '1px solid var(--accent-red)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>{title}</h3>
      </div>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '480px' }}>
        {message || 'An unexpected network error occurred while communicating with the service.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-danger"
          style={{ marginTop: '0.4rem', padding: '0.45rem 1rem', fontSize: '0.75rem' }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          Retry Connection
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
