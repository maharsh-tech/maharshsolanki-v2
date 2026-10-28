function ErrorMessage({ title = 'Unable to load data', message, onRetry }) {
  return (
    <div
      role="alert"
      style={{
        border: '2.5px solid var(--border-color)',
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-main)',
        boxShadow: 'var(--shadow-md)',
        padding: '1.75rem',
        borderRadius: 'var(--radius-brutal)',
        margin: '1.75rem 0',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.85rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--accent-red)',
            color: '#ffffff',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-brutal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900 }}>{title}</h3>
      </div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '500px', fontWeight: 600 }}>
        {message || 'An unexpected network error occurred while communicating with the service.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-danger"
          style={{ marginTop: '0.5rem', padding: '0.5rem 1.15rem' }}
        >
          <svg
            width="14"
            height="14"
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
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
