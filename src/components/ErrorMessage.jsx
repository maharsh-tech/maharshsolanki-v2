import React from 'react'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card" style={{
      border: '1px solid #f5c6cb',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '20px',
      borderRadius: '6px',
      margin: '20px 0',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#721c24' }}
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <h3 style={{ margin: 0, fontSize: '18px' }}>Unable to load repositories</h3>
      </div>
      <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
        {message || 'An unexpected network error occurred while contacting the GitHub API.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: '#721c24',
            color: '#ffffff',
            border: 'none',
            padding: '8px 18px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
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
