import { useState } from 'react'
import { generateTaskDescription } from '../api'

function TaskForm({ onSubmit, submitting }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiNotice, setAiNotice] = useState('')
  const [aiStatus, setAiStatus] = useState(null) // 'success' | 'fallback' | 'error' | null

  const handleGenerateAiDescription = async () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle || aiLoading || submitting) return

    setAiLoading(true)
    setAiNotice('')
    setAiStatus(null)

    try {
      const res = await generateTaskDescription(trimmedTitle)
      if (res?.fallback) {
        setAiStatus('fallback')
        setAiNotice(res.error || 'AI service unavailable. You can type the description manually.')
      } else if (res?.description) {
        setDescription(res.description)
        setAiStatus('success')
        setAiNotice('AI suggestion generated. Please review and edit before saving.')
      } else {
        setAiStatus('fallback')
        setAiNotice('No description generated. You can type one manually.')
      }
    } catch (err) {
      setAiStatus('error')
      setAiNotice(err.message || 'Failed to generate AI description. You can type it manually.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    const body = { title: trimmed }
    if (description.trim()) body.description = description.trim()
    if (priority) body.priority = priority

    const ok = await onSubmit(body)
    if (ok !== false) {
      setTitle('')
      setDescription('')
      setPriority('')
      setAiNotice('')
      setAiStatus(null)
    }
  }

  return (
    <form className="task-form-card" onSubmit={handleSubmit}>
      <h2 className="task-form-title">Add New Task</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="task-title" className="form-label">
          Task Title <span style={{ color: 'var(--danger-solid)' }}>*</span>
        </label>
        <input
          id="task-title"
          type="text"
          className="search-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Implement Redis token blacklist middleware"
          required
          disabled={submitting}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <label htmlFor="task-description" className="form-label" style={{ marginBottom: 0 }}>
            Description (Optional)
          </label>
          <button
            type="button"
            id="generate-ai-desc-btn"
            onClick={handleGenerateAiDescription}
            disabled={!title.trim() || aiLoading || submitting}
            className="btn-secondary"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              gap: '0.35rem',
              borderColor: 'rgba(56, 189, 248, 0.3)',
              background: 'rgba(56, 189, 248, 0.08)',
              color: '#38bdf8',
            }}
            title={!title.trim() ? 'Enter a title first to generate description' : 'Generate description with AI'}
          >
            {aiLoading ? (
              <>
                <span className="spinner" style={{ width: '12px', height: '12px', borderWidth: '2px', borderTopColor: '#38bdf8' }} />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>

        {aiNotice && (
          <div
            id="ai-notice-banner"
            style={{
              padding: '0.5rem 0.75rem',
              marginBottom: '0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              backgroundColor: aiStatus === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
              border: `1px solid ${aiStatus === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`,
              color: aiStatus === 'success' ? '#4ade80' : '#facc15',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              {aiStatus === 'success' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              )}
              <span>{aiNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setAiNotice('')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', opacity: 0.7 }}
              title="Dismiss notice"
              aria-label="Dismiss notice"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <textarea
          id="task-description"
          className="search-input"
          style={{ minHeight: '68px', resize: 'vertical' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Technical context, acceptance criteria, or endpoints..."
          disabled={submitting}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '180px' }}>
          <label htmlFor="task-priority" className="form-label">
            Priority Level
          </label>
          <select
            id="task-priority"
            className="search-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={submitting}
          >
            <option value="">Standard (None)</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="btn-primary"
            style={{ minHeight: '42px' }}
          >
            {submitting ? (
              <>
                <span className="spinner" style={{ width: '14px', height: '14px', borderWidth: '2px', borderTopColor: '#fff', marginRight: '6px' }} />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default TaskForm
