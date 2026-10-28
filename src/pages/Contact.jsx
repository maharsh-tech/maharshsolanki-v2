import { useState } from 'react'

function Contact() {
  const [message, setMessage] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <section className="monolith-section" aria-label="Contact Section">
      <div className="monolith-section-header">
        <h1 className="monolith-section-title">Contact & Inquiries</h1>
        <p className="monolith-section-subtitle">
          Inquiries, technical roles, or software engineering collaboration.
        </p>
      </div>

      <div className="monolith-card contact-card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button 
            type="button" 
            onClick={() => setShowTooltip(!showTooltip)} 
            className="btn-monolith-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
          >
            {showTooltip ? 'Hide Details' : 'Contact Guidelines'}
          </button>
        </div>

        {showTooltip && (
          <div
            style={{ 
              backgroundColor: 'var(--bg-surface-elevated)', 
              border: 'var(--border-hairline)', 
              padding: '0.85rem 1rem', 
              borderRadius: 'var(--radius-sm)', 
              marginBottom: '1.25rem',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
            }}
          >
            <strong style={{ color: 'var(--accent-blue)' }}>Note:</strong> Maharsh is currently seeking a Java or Full Stack Development Internship. Inquiries about full-time opportunities or technical projects are welcome.
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent: ' + message); setMessage(''); }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="message" className="form-label">
              Your Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your inquiry or proposal..."
              className="search-input"
              style={{ resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.35rem' }}>
              <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {message.length} characters
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            Send Message &rarr;
          </button>
        </form>

        <div className="preview-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: 'var(--border-hairline)', paddingBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Live Message Preview
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
              Active
            </span>
          </div>
          <div style={{ color: message ? 'var(--text-main)' : 'var(--text-muted)', wordBreak: 'break-word', minHeight: '1.5rem', fontSize: '0.85rem' }}>
            {message || 'Type your message above to see a live preview...'}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
