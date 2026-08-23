const BASE_URL = import.meta.env.VITE_API_BASE_URL
const TOKEN_KEY = 'auth_token'

if (!BASE_URL) {
  throw new Error('Missing VITE_API_BASE_URL. Copy .env.example to .env and set the API base URL.')
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = () => Boolean(getToken())

async function request(path, options = {}) {
  const headers = { ...options.headers }
  const token = getToken()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
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

  if (res.status === 401) {
    clearToken()
    const err = new Error(data?.error || 'Unauthorized')
    err.status = 401
    throw err
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

export const register = (email, password) =>
  request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

export const login = async (email, password) => {
  const data = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (data?.token) {
    setToken(data.token)
  }
  return data
}

export const logout = () => {
  clearToken()
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
