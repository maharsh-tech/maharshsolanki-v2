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
    <form className="task-form" onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
      <h3 style={{ marginTop: 0 }}>Create Task</h3>
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="task-title" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
          Title *
        </label>
        <input
          id="task-title"
          type="text"
          className="search-input"
          style={{ marginBottom: 0 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required
          disabled={submitting}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="task-description" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
          Description
        </label>
        <textarea
          id="task-description"
          className="search-input"
          style={{ marginBottom: 0, minHeight: '72px', resize: 'vertical' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details"
          disabled={submitting}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="task-priority" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
          Priority
        </label>
        <select
          id="task-priority"
          className="search-input"
          style={{ marginBottom: 0 }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={submitting}
        >
          <option value="">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting || !title.trim()}
        style={{
          backgroundColor: '#0056b3',
          color: '#fff',
          border: 'none',
          padding: '10px 18px',
          borderRadius: '4px',
          cursor: submitting || !title.trim() ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          opacity: submitting || !title.trim() ? 0.6 : 1,
        }}
      >
        {submitting ? 'Creating...' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskForm
