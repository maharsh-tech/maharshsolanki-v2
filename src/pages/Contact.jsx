import { useState } from 'react'

function Contact() {
  // useState 1: Form input (message)
  const [message, setMessage] = useState('')
  
  // useState 2: Toggle UI visibility (help tooltip)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <section className="contact" style={{ padding: '20px 0', maxWidth: '500px' }}>
      <h2>Contact Me</h2>
      
      {/* Help tooltip toggle button */}
      <button 
        type="button" 
        onClick={() => setShowTooltip(!showTooltip)} 
        style={{ marginBottom: '15px', cursor: 'pointer' }}
      >
        {showTooltip ? 'Hide Help' : 'Show Help'}
      </button>

      {/* Conditional Rendering of Tooltip */}
      {showTooltip && (
        <div style={{ 
          background: '#eef2f7', 
          border: '1px solid #d0d7de', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '15px',
          color: '#24292f'
        }}>
          <p style={{ margin: 0 }}>💡 Tip: Type your message below. You will see a live character count and real-time preview instantly!</p>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted with message: ' + message); setMessage(''); }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
            Message:
          </label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
          {/* Live character count */}
          <p style={{ fontSize: '14px', margin: '5px 0 0 0', color: '#555' }}>
            Character Count: {message.length}
          </p>
        </div>
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Submit</button>
      </form>

      {/* Real-time Display */}
      <div style={{ marginTop: '25px', padding: '15px', border: '1px dashed #ccc', borderRadius: '5px' }}>
        <h3>Real-time Preview:</h3>
        <p style={{ fontStyle: 'italic', wordBreak: 'break-all' }}>
          {message || 'Type something to see preview...'}
        </p>
      </div>
    </section>
  )
}

export default Contact
