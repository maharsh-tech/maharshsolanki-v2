function Spinner({ message = "Querying data stream..." }) {
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
          width: '32px',
          height: '32px',
          border: '2px solid var(--border-color)',
          borderTopColor: 'var(--accent-blue)',
          borderRadius: '50%',
          animation: 'spin 0.75s linear infinite',
        }}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {message}
      </p>
    </div>
  )
}

export default Spinner
