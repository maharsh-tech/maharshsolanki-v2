/**
 * Week 4 API verification script.
 * Run while the server is listening on port 5000.
 */

const BASE = 'http://localhost:5000'

async function request(method, path, body, headers = {}) {
  const options = {
    method,
    headers: { ...headers },
  }

  if (body !== undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }

  const res = await fetch(`${BASE}${path}`, options)
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = text
  }

  return { status: res.status, data }
}

async function runTests() {
  const results = []
  const log = (name, passed, detail) => {
    results.push({ name, passed, detail })
    const icon = passed ? 'PASS' : 'FAIL'
    console.log(`[${icon}] ${name}`)
    if (detail) console.log(`       ${detail}`)
  }

  // GET /tasks (baseline count)
  let r = await request('GET', '/tasks')
  const initialCount = r.data.length
  log('GET /tasks', r.status === 200 && Array.isArray(r.data), `status=${r.status}, count=${initialCount}`)

  // POST /tasks
  r = await request('POST', '/tasks', { title: 'Study Express', description: 'Week 4 lab', completed: false })
  log('POST /tasks', r.status === 201 && r.data.title === 'Study Express', `status=${r.status}, id=${r.data.id}`)
  const taskId = r.data.id

  // POST second task
  r = await request('POST', '/tasks', { title: 'Test middleware', completed: true })
  log('POST /tasks (second)', r.status === 201, `status=${r.status}, id=${r.data.id}`)

  // GET /tasks (with data)
  r = await request('GET', '/tasks')
  log('GET /tasks (with data)', r.status === 200 && r.data.length === initialCount + 2, `status=${r.status}, count=${r.data.length}`)

  // GET /tasks/:id (existing task)
  r = await request('GET', `/tasks/${taskId}`)
  log('GET /tasks/:id (existing)', r.status === 200 && r.data.id === taskId, `status=${r.status}`)

  // PUT /tasks/:id
  r = await request('PUT', `/tasks/${taskId}`, { title: 'Study Express (updated)', completed: true })
  log('PUT /tasks/:id', r.status === 200 && r.data.completed === true, `status=${r.status}`)

  // DELETE /tasks/:id
  r = await request('DELETE', `/tasks/${taskId}`)
  log('DELETE /tasks/:id', r.status === 200, `status=${r.status}`)

  // GET after delete
  r = await request('GET', '/tasks')
  log('GET /tasks (after delete)', r.status === 200 && r.data.length === initialCount + 1, `status=${r.status}, count=${r.data.length}`)

  // 404 task not found
  r = await request('GET', '/tasks/999')
  log('GET /tasks/999 (not found)', r.status === 404, `status=${r.status}`)

  r = await request('PUT', '/tasks/999', { title: 'Missing' })
  log('PUT /tasks/999 (not found)', r.status === 404, `status=${r.status}`)

  // Invalid ID format
  r = await request('GET', '/tasks/abc')
  log('GET /tasks/abc (invalid ID)', r.status === 400, `status=${r.status}`)

  r = await request('PUT', '/tasks/abc', { title: 'Bad id' })
  log('PUT /tasks/abc (invalid ID)', r.status === 400, `status=${r.status}`)

  // Missing Content-Type on POST
  const res = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: {},
    body: JSON.stringify({ title: 'No content type' }),
  })
  log('POST without Content-Type', res.status === 400, `status=${res.status}`)

  // Undefined route 404
  r = await request('GET', '/unknown-route')
  log('GET /unknown-route (404 handler)', r.status === 404 && r.data.error === 'Route not found', `status=${r.status}`)

  const failed = results.filter((t) => !t.passed)
  console.log('\n--- Summary ---')
  console.log(`Total: ${results.length}, Passed: ${results.length - failed.length}, Failed: ${failed.length}`)

  if (failed.length > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error(err)
  process.exit(1)
})
