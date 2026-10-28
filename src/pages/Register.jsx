import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(email, password)
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="monolith-card auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Register to initialize scoped developer task operations</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="register-email" className="form-label">
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              className="search-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={submitting}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="register-password" className="form-label">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              className="search-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={submitting}
            />
          </div>

          {error && (
            <div
              style={{
                backgroundColor: 'var(--accent-red)',
                color: '#ffffff',
                border: '2px solid var(--border-color)',
                boxShadow: '2px 2px 0px var(--border-color)',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-brutal)',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            style={{ width: '100%', padding: '0.7rem' }}
          >
            {submitting ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
