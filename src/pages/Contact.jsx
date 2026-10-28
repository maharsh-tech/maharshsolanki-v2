import { useState } from 'react'

function Contact() {
  const [message, setMessage] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <section className="contact-container" aria-label="Contact Section">
      <div className="section-header">
        <h1 className="section-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Get In Touch
        </h1>
        <p className="section-desc">
          Send a quick message, inquiry, or feedback directly.
        </p>
      </div>

      <div className="contact-card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button 
            type="button" 
            onClick={() => setShowTooltip(!showTooltip)} 
            className="btn-secondary"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.8125rem' }}
          >
            {showTooltip ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {showTooltip && (
          <div
            style={{ 
              backgroundColor: 'var(--accent-yellow)', 
              border: '2px solid var(--border-color)', 
              boxShadow: '2.5px 2.5px 0px var(--border-color)',
              padding: '0.85rem 1rem', 
              borderRadius: 'var(--radius-brutal)', 
              marginBottom: '1.25rem',
              color: '#000000',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            <strong>Note:</strong> Messages are rendered dynamically with live character count analysis and instant preview.
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted with message: ' + message); setMessage(''); }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="message" className="form-label">
              Message Content
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your note or technical question..."
              className="search-input"
              style={{ resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
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
            Send Message
          </button>
        </form>

        <div className="preview-box">
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
            Real-Time Output Stream
          </div>
          <div style={{ color: message ? 'var(--text-main)' : 'var(--text-faint)', wordBreak: 'break-word', minHeight: '1.5rem' }}>
            {message || '// Output buffer empty. Begin typing above...'}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
