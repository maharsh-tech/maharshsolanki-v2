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
    <section style={{ padding: '20px 0', maxWidth: '400px' }}>
      <h2 style={{ marginTop: 0 }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="register-email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
            Email
          </label>
          <input
            id="register-email"
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
          <label htmlFor="register-password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
            Password
          </label>
          <input
            id="register-password"
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
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <p style={{ marginTop: '16px', fontSize: '14px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  )
}

export default Register
