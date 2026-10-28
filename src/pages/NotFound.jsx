import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found" role="alert">
      <div className="not-found-code">404</div>
      <h1 style={{ fontSize: '1.65rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>ROUTE NOT FOUND</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        // The requested transmission path does not exist on this host.
      </p>
      <Link to="/" className="btn-monolith-primary">
        <span>&larr; Return to Base</span>
      </Link>
    </div>
  )
}

export default NotFound
