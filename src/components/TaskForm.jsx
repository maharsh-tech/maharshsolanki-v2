import { useState } from 'react'

function TaskForm({ onSubmit, submitting }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')

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
        <label htmlFor="task-description" className="form-label">
          Description (Optional)
        </label>
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
