function Spinner({ message = "Loading content..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 0',
      }}
    >
      <div
        className="spinner"
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid var(--border-light)',
          borderTopColor: 'var(--accent-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        {message}
      </p>
    </div>
  )
}

export default Spinner
