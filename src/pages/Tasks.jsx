import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import ConfirmDialog from '../components/ConfirmDialog'
import Toast from '../components/Toast'
import { getTasks, createTask, updateTask, deleteTask } from '../api'

function Tasks() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [creating, setCreating] = useState(false)
  const [busyId, setBusyId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState({ title: '', description: '', priority: '' })
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'completed'

  const showToast = useCallback((type, message) => {
    setToast({ type, message })
  }, [])

  const handleAuthError = useCallback((err) => {
    if (err.status === 401) {
      navigate('/login')
      return true
    }
    return false
  }, [navigate])

  const fetchTasks = useCallback(() => {
    setLoading(true)
    setError(null)

    getTasks()
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Unexpected API response payload format.')
        }
        setTasks(data)
      })
      .catch((err) => {
        if (handleAuthError(err)) return
        setError(err.message || 'Failed to fetch tasks.')
        setTasks([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [handleAuthError])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleCreate = async (body) => {
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const optimisticTask = {
      _id: tempId,
      title: body.title,
      description: body.description || '',
      priority: body.priority || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
      _optimistic: true,
    }

    setCreating(true)
    setTasks((prev) => [optimisticTask, ...prev])

    try {
      const created = await createTask(body)
      setTasks((prev) => prev.map((t) => (t._id === tempId ? created : t)))
      showToast('success', 'Task created successfully.')
      return true
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t._id !== tempId))
      if (!handleAuthError(err)) {
        showToast('error', err.message || 'Failed to create task.')
      }
      return false
    } finally {
      setCreating(false)
    }
  }

  const handleToggleComplete = async (task) => {
    setBusyId(task._id)
    try {
      const updated = await updateTask(task._id, { completed: !task.completed })
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)))
      showToast('success', updated.completed ? 'Marked complete.' : 'Marked active.')
    } catch (err) {
      if (!handleAuthError(err)) {
        showToast('error', err.message || 'Failed to update task.')
      }
    } finally {
      setBusyId(null)
    }
  }

  const handleStartEdit = (task) => {
    setEditingId(task._id)
    setEditDraft({
      title: task.title || '',
      description: task.description || '',
      priority: task.priority || '',
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditDraft({ title: '', description: '', priority: '' })
  }

  const handleSaveEdit = async (id) => {
    const payload = {
      title: editDraft.title.trim(),
      description: editDraft.description.trim(),
    }
    if (editDraft.priority) payload.priority = editDraft.priority

    setBusyId(id)
    try {
      const updated = await updateTask(id, payload)
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)))
      handleCancelEdit()
      showToast('success', 'Task updated.')
    } catch (err) {
      if (!handleAuthError(err)) {
        showToast('error', err.message || 'Failed to update task.')
      }
    } finally {
      setBusyId(null)
    }
  }

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return
    const id = pendingDelete._id
    setDeleting(true)
    setBusyId(id)
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t._id !== id))
      if (editingId === id) handleCancelEdit()
      setPendingDelete(null)
      showToast('success', 'Task deleted.')
    } catch (err) {
      if (!handleAuthError(err)) {
        showToast('error', err.message || 'Failed to delete task.')
      }
    } finally {
      setDeleting(false)
      setBusyId(null)
    }
  }

  // Derived metrics
  const totalCount = tasks.length
  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])
  const activeCount = totalCount - completedCount

  const visibleTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  return (
    <section className="tasks-container" aria-label="Task Manager">
      <div className="section-header">
        <h1 className="section-title">
          <span className="section-index">// TASK_OPS</span>
          Task Management System
        </h1>
        <p className="section-desc">
          Authenticated CRUD interface communicating with the Express &amp; MongoDB REST API.
        </p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-value">{totalCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active</div>
          <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{activeCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value" style={{ color: 'var(--success-solid)' }}>{completedCount}</div>
        </div>
      </div>

      <TaskForm onSubmit={handleCreate} submitting={creating} />

      <div className="filter-bar">
        <button
          type="button"
          className={`filter-btn${filter === 'all' ? ' active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({totalCount})
        </button>
        <button
          type="button"
          className={`filter-btn${filter === 'active' ? ' active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({activeCount})
        </button>
        <button
          type="button"
          className={`filter-btn${filter === 'completed' ? ' active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      {loading && <Spinner message="Syncing tasks from API..." />}

      {error && (
        <ErrorMessage
          title="API Connection Error"
          message={error}
          onRetry={fetchTasks}
        />
      )}

      {!loading && !error && (
        <TaskList
          tasks={visibleTasks}
          busyId={busyId}
          editingId={editingId}
          editDraft={editDraft}
          onEditDraftChange={setEditDraft}
          onStartEdit={handleStartEdit}
          onCancelEdit={handleCancelEdit}
          onSaveEdit={handleSaveEdit}
          onToggleComplete={handleToggleComplete}
          onRequestDelete={setPendingDelete}
        />
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Task"
        message={
          pendingDelete
            ? `Are you sure you want to delete "${pendingDelete.title}"? This action cannot be reversed.`
            : ''
        }
        confirmLabel="Delete Task"
        onConfirm={handleConfirmDelete}
        onCancel={() => !deleting && setPendingDelete(null)}
        busy={deleting}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  )
}

export default Tasks
