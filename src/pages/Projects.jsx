import { useState, useEffect, useCallback } from 'react'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import ConfirmDialog from '../components/ConfirmDialog'
import Toast from '../components/Toast'
import { getTasks, createTask, updateTask, deleteTask } from '../api'

function Projects({ profile }) {
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

  const showToast = useCallback((type, message) => {
    setToast({ type, message })
  }, [])

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
        setError(err.message || 'Failed to fetch tasks.')
        setTasks([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleCreate = async (body) => {
    const tempId = `temp-${Date.now()}`
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
      showToast('error', err.message || 'Failed to create task.')
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
      showToast('success', updated.completed ? 'Task marked complete.' : 'Task marked incomplete.')
    } catch (err) {
      showToast('error', err.message || 'Failed to update task.')
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
      showToast('success', 'Task updated successfully.')
    } catch (err) {
      showToast('error', err.message || 'Failed to update task.')
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
      showToast('success', 'Task deleted successfully.')
    } catch (err) {
      showToast('error', err.message || 'Failed to delete task.')
    } finally {
      setDeleting(false)
      setBusyId(null)
    }
  }

  const staticProjects = (profile && profile.projects) || []

  return (
    <section className="projects" style={{ padding: '20px 0' }}>
      <h2>Featured Projects</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Curated highlight of architectural and enterprise projects.
      </p>

      {staticProjects.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {staticProjects.map((project, index) => (
            <div key={index} className="repo-card">
              <h3 style={{ margin: '0 0 10px 0' }}>{project.title}</h3>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>
                {project.description}
              </p>
              <div style={{ marginBottom: '15px' }}>
                <strong>Tech Stack: </strong>
                <span style={{ fontSize: '13px', color: '#333' }}>
                  {(project.techStack || []).join(', ')}
                </span>
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
                >
                  Live Demo →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
        <h2 style={{ margin: 0 }}>Task Manager</h2>
        <span style={{ fontSize: '13px', color: '#777' }}>
          API Source: <code>http://localhost:5000/tasks</code>
        </span>
      </div>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
        Full-stack CRUD against the Express + MongoDB backend (Practical 6). Refresh the page to confirm persistence.
      </p>

      <TaskForm onSubmit={handleCreate} submitting={creating} />

      {loading && <Spinner message="Loading tasks from your API..." />}

      {error && (
        <ErrorMessage
          title="Unable to load tasks"
          message={error}
          onRetry={fetchTasks}
        />
      )}

      {!loading && !error && (
        <TaskList
          tasks={tasks}
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
        title="Delete task?"
        message={
          pendingDelete
            ? `Are you sure you want to delete "${pendingDelete.title}"? This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => !deleting && setPendingDelete(null)}
        busy={deleting}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  )
}

export default Projects
