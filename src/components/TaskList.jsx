function TaskList({
  tasks,
  busyId,
  editingId,
  editDraft,
  onEditDraftChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onToggleComplete,
  onRequestDelete,
}) {
  if (!tasks.length) {
    return (
      <div className="monolith-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8875rem', fontFamily: 'var(--font-mono)' }}>
          // NO TASKS BUFFERED. CREATE A NEW TASK ENTRY ABOVE.
        </p>
      </div>
    )
  }

  const getPriorityClass = (priority) => {
    const p = String(priority).toLowerCase()
    if (p === 'high') return 'priority-pill priority-high'
    if (p === 'medium') return 'priority-pill priority-medium'
    if (p === 'low') return 'priority-pill priority-low'
    return 'priority-pill'
  }

  return (
    <ul className="task-list" aria-label="Task items">
      {tasks.map((task) => {
        const id = task._id
        const isBusy = busyId === id
        const isEditing = editingId === id
        const isOptimistic = Boolean(task._optimistic)

        return (
          <li
            key={id}
            className={`task-item-card${task.completed ? ' completed' : ''}`}
            style={{ opacity: isOptimistic ? 0.7 : 1 }}
          >
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label htmlFor={`edit-title-${id}`} className="form-label">
                    Edit Title
                  </label>
                  <input
                    id={`edit-title-${id}`}
                    className="search-input"
                    value={editDraft.title}
                    onChange={(e) => onEditDraftChange({ ...editDraft, title: e.target.value })}
                    disabled={isBusy}
                    aria-label="Edit task title"
                  />
                </div>

                <div>
                  <label htmlFor={`edit-desc-${id}`} className="form-label">
                    Edit Description
                  </label>
                  <textarea
                    id={`edit-desc-${id}`}
                    className="search-input"
                    style={{ minHeight: '60px', resize: 'vertical' }}
                    value={editDraft.description}
                    onChange={(e) => onEditDraftChange({ ...editDraft, description: e.target.value })}
                    disabled={isBusy}
                    aria-label="Edit task description"
                  />
                </div>

                <div>
                  <label htmlFor={`edit-priority-${id}`} className="form-label">
                    Priority
                  </label>
                  <select
                    id={`edit-priority-${id}`}
                    className="search-input"
                    value={editDraft.priority}
                    onChange={(e) => onEditDraftChange({ ...editDraft, priority: e.target.value })}
                    disabled={isBusy}
                    aria-label="Edit task priority"
                  >
                    <option value="">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => onSaveEdit(id)}
                    disabled={isBusy || !editDraft.title.trim()}
                  >
                    {isBusy ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={onCancelEdit}
                    disabled={isBusy}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="task-row-main">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={Boolean(task.completed)}
                    onChange={() => onToggleComplete(task)}
                    disabled={isBusy || isOptimistic}
                    aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                  />
                  <div className="task-content">
                    <h3 className={`task-title-text${task.completed ? ' completed' : ''}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="task-desc-text">
                        {task.description}
                      </p>
                    )}
                    <div className="task-meta-bar">
                      {task.priority && (
                        <span className={getPriorityClass(task.priority)}>
                          {task.priority}
                        </span>
                      )}
                      {task.createdAt && (
                        <span style={{ fontFamily: 'var(--font-mono)' }}>
                          {new Date(task.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                      {isOptimistic && (
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                          Syncing with API...
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="task-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ padding: '0.3rem 0.65rem', fontSize: '0.8125rem' }}
                    onClick={() => onStartEdit(task)}
                    disabled={isBusy || isOptimistic}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger-outline"
                    onClick={() => onRequestDelete(task)}
                    disabled={isBusy || isOptimistic}
                  >
                    {isBusy ? 'Working...' : 'Delete'}
                  </button>
                </div>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default TaskList
