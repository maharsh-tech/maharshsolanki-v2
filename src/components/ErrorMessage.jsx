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
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>⚠️ Unable to load repositories</h3>
      <p style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
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
            fontSize: '14px'
          }}
        >
          🔄 Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
