import React from 'react'

function Spinner({ message = "Fetching repositories from GitHub..." }) {
  return (
    <div className="spinner-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
      <div className="spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderTop: '4px solid #0056b3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ marginTop: '15px', color: '#666', fontSize: '14px', fontWeight: '500' }}>
        {message}
      </p>
    </div>
  )
}

export default Spinner
