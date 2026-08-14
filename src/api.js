const BASE_URL = 'http://localhost:5000'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, options)
  } catch {
    throw new Error('Network error: is the backend running on port 5000?')
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
