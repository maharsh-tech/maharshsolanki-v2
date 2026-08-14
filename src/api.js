const BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!BASE_URL) {
  throw new Error('Missing VITE_API_BASE_URL. Copy .env.example to .env and set the API base URL.')
}

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, options)
  } catch {
    throw new Error('Network error: could not reach the API. Is the backend running?')
  }

  let data = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error('Unexpected non-JSON response from the API.')
    }
  }

  if (!res.ok) {
    if (data?.details?.length) {
      const details = data.details.map((d) => d.message).join('; ')
      throw new Error(details || data.error || `Request failed (${res.status})`)
    }
    throw new Error(data?.error || data?.message || `Request failed (${res.status})`)
  }

  return data
}

export const getTasks = () => request('/tasks')

export const createTask = (body) =>
  request('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

export const updateTask = (id, body) =>
  request(`/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

export const deleteTask = (id) =>
  request(`/tasks/${id}`, {
    method: 'DELETE',
  })
