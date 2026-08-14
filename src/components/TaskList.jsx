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
      <p style={{ color: '#666', fontSize: '14px' }}>
        No tasks yet. Create one above — data is stored in MongoDB.
      </p>
    )
  }

  return (
    <ul className="task-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {tasks.map((task) => {
        const id = task._id
        const isBusy = busyId === id
        const isEditing = editingId === id
        const isOptimistic = Boolean(task._optimistic)

        return (
          <li
            key={id}
            className="repo-card"
            style={{
              opacity: isOptimistic ? 0.75 : 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {isEditing ? (
              <>
                <input
                  className="search-input"
                  style={{ marginBottom: 0 }}
                  value={editDraft.title}
                  onChange={(e) => onEditDraftChange({ ...editDraft, title: e.target.value })}
                  disabled={isBusy}
                  aria-label="Edit title"
                />
                <textarea
                  className="search-input"
                  style={{ marginBottom: 0, minHeight: '60px', resize: 'vertical' }}
                  value={editDraft.description}
                  onChange={(e) => onEditDraftChange({ ...editDraft, description: e.target.value })}
                  disabled={isBusy}
                  aria-label="Edit description"
                />
                <select
                  className="search-input"
                  style={{ marginBottom: 0 }}
                  value={editDraft.priority}
                  onChange={(e) => onEditDraftChange({ ...editDraft, priority: e.target.value })}
                  disabled={isBusy}
                  aria-label="Edit priority"
                >
                  <option value="">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => onSaveEdit(id)} disabled={isBusy || !editDraft.title.trim()}>
                    {isBusy ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={onCancelEdit} disabled={isBusy}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(task.completed)}
                    onChange={() => onToggleComplete(task)}
                    disabled={isBusy || isOptimistic}
                    aria-label={`Mark ${task.title} complete`}
                    style={{ marginTop: '4px' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        margin: '0 0 6px 0',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#888' : 'inherit',
                      }}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#555' }}>
                        {task.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                      {task.priority && (
                        <span className="repo-badge">{task.priority}</span>
                      )}
                      {task.createdAt && (
                        <span style={{ fontSize: '12px', color: '#777' }}>
                          {new Date(task.createdAt).toLocaleString()}
                        </span>
                      )}
                      {isOptimistic && (
                        <span style={{ fontSize: '12px', color: '#0056b3' }}>Saving...</span>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => onStartEdit(task)} disabled={isBusy || isOptimistic}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onRequestDelete(task)}
                    disabled={isBusy || isOptimistic}
                    style={{ color: '#721c24' }}
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
