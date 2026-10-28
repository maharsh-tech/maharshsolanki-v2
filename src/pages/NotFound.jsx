import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found" role="alert">
      <div className="not-found-code">404</div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
        The route you requested does not exist or has been relocated.
      </p>
      <Link to="/" className="btn-primary">
        &larr; Back to Portfolio
      </Link>
    </div>
  )
}

export default NotFound
