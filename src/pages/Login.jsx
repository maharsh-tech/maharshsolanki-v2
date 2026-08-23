import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api'

function Login() {
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
      await login(email, password)
      navigate('/tasks')
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section style={{ padding: '20px 0', maxWidth: '400px' }}>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="login-email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="search-input"
            style={{ marginBottom: 0 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={submitting}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="login-password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="search-input"
            style={{ marginBottom: 0 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={submitting}
          />
        </div>
        {error && (
          <p style={{ color: '#721c24', fontSize: '14px', marginBottom: '12px' }}>{error}</p>
        )}
        <button type="submit" disabled={submitting} style={{ padding: '10px 18px', fontWeight: 'bold' }}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p style={{ marginTop: '16px', fontSize: '14px' }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </section>
  )
}

export default Login
