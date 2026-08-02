# Maharsh Solanki – Portfolio (v2)

A full-semester monorepo containing a **React 19 + Vite** portfolio frontend and an **Express** task-management REST API backend.

---

## Getting Started

### Frontend (React + Vite)

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
npm run lint       # oxlint
```

### Backend (Express — Practical 4)

```bash
cd server
npm install
npm start          # http://localhost:5000
```

Both servers run independently. The frontend is unchanged from Practical 3; the backend is tested with Postman or Thunder Client.

---

## Practical 4 – RESTful API with Node.js and Express

### Architecture Overview

```
Client (Postman / Browser)
        |
        v
[Request Logging Middleware]
        |
        v
Express Router  (/tasks)
├── GET    /tasks       → getAllTasks
├── GET    /tasks/:id   → getTaskById
├── POST   /tasks       → createTask
├── PUT    /tasks/:id   → updateTask
└── DELETE /tasks/:id   → deleteTask
        |
        v
[404 Handler] → [Global Error Handler]
```

### Features Implemented

- **CRUD endpoints** for tasks stored in an in-memory array
- **Request logging middleware** — logs method, URL, and ISO timestamp for every request
- **Content-Type validation** — rejects POST/PUT requests without `application/json`
- **Task ID validation** — route-specific middleware validates numeric IDs on GET/PUT/DELETE by ID
- **404 handler** — structured JSON response for undefined routes
- **Global error handler** — last middleware in the pipeline; returns `{ error: 'Something went wrong' }` with status 500

### API Endpoints

| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/tasks` | 200 | List all tasks |
| GET | `/tasks/:id` | 200 / 404 | Retrieve a single task by ID |
| POST | `/tasks` | 201 | Create a task (`title` required) |
| PUT | `/tasks/:id` | 200 / 404 | Update a task by ID |
| DELETE | `/tasks/:id` | 200 / 404 | Delete a task by ID |

**Task object shape:**

```json
{
  "id": "1",
  "title": "Study Express",
  "description": "Week 4 lab",
  "completed": false
}
```

### Testing

Run the automated verification script while the server is running:

```bash
cd server
node test-api.js
```

Or test manually with Postman / Thunder Client against `http://localhost:5000`.

### Theory & Analysis Questions

#### 1. Why must the error handling middleware be defined last in the middleware chain?
Express processes middleware in registration order. The error handler has four parameters `(err, req, res, next)` and only runs when `next(err)` is called or an error is thrown. If it is registered before routes, unmatched errors from routes defined later will bypass it. Placing it last ensures every route and middleware has already executed, so any error propagates to the single centralized handler.

#### 2. What is the difference between `app.use()` and a route-specific middleware?
`app.use()` registers middleware globally — it runs for every request matching the path prefix (or all requests if no path is given). Route-specific middleware is attached to individual routes (e.g. `router.put('/:id', validateTaskId, updateTask)`) and only executes for requests hitting that route. Global middleware suits cross-cutting concerns like logging; route-specific middleware suits validation tied to a particular endpoint.

#### 3. Why is it considered bad practice to send raw error stack traces to the client?
Stack traces expose internal file paths, function names, and library versions that help attackers map the server architecture. They also leak implementation details unrelated to the user's request. A generic `{ error: 'Something went wrong' }` response keeps the client informed while detailed diagnostics are logged server-side via `console.error(err.stack)`.

---

## Practical 3 – API Integration & Data Rendering in React

### Architecture Overview

```
Projects.jsx
├── useEffect() → triggers GitHub REST API fetch on mount
├── useState: repos, loading, error, searchTerm
├── [loading]  → <Spinner />
├── [error]    → <ErrorMessage message={error} onRetry={fetchRepos} />
└── [success]  → <RepoList repos={filteredRepos} />
```

### Features Implemented

- **REST API Integration**: Consumes GitHub Public REST API (`https://api.github.com/users/maharsh-tech/repos`) dynamically.
- **Asynchronous State Management**:
  - `repos`: Array holding fetched repository objects.
  - `loading`: Boolean state managing loading spinner visibility.
  - `error`: Error state capturing HTTP error codes or network failures.
- **Conditional UI Feedback**:
  - `<Spinner />`: Custom CSS keyframe spinner with accessibility loading text.
  - `<ErrorMessage />`: Warning callout card with error details and **Retry button**.
  - `<RepoList />`: Grid of repository cards displaying name, GitHub link, stargazers count, primary language, and forks count.
- **Supplementary Features**:
  - **Retry Mechanism**: Re-executes the API fetch on network error.
  - **Real-Time Search Input**: Instant client-side filtering by repository name or description.
  - **Star Count**: Displays live star ratings for each repository.

### Theory & Analysis Questions

#### 1. Why is `useEffect` required to trigger a fetch on component mount instead of calling `fetch` directly in the component body?
Calling `fetch` directly in the component body executes the side-effect during React's render phase. When data arrives and updates state (`setRepos`), React triggers a re-render, which re-executes `fetch`, creating an **infinite network loop**. `useEffect` with an empty dependency array `[]` ensures the network request fires exactly once when the component mounts.

#### 2. What is the difference between a loading state and an error state, and why must both be handled separately?
- **Loading State**: Represents a pending asynchronous request. It signals to the user that data is being fetched and renders non-blocking indicators (`<Spinner />`).
- **Error State**: Represents a failed request (e.g., HTTP 404, rate limit, offline state). It renders diagnostic messages (`<ErrorMessage />`) and recovery actions like a Retry button.
- Both must be handled separately because rendering data before loading completes causes `null`/`undefined` errors, while omitting error handling leaves the UI stuck or broken without user recovery options.

#### 3. How would the user experience change if loading and error states were not implemented?
Without loading indicators, users experience a blank or frozen UI during network latency, leading them to think the application is broken. Without error handling, failed requests cause silent crashes or blank white screens without explaining what failed or offering a way to try again.

---

## Practical 2 – State Management & Routing

### Routes

| Path         | Component     | Description                              |
|-------------|---------------|------------------------------------------|
| `/`         | `Home.jsx`    | Hero, About, and Skills sections         |
| `/projects` | `Projects.jsx`| Static featured projects + Live GitHub Repositories |
| `/contact`  | `Contact.jsx` | Controlled contact form with live preview|
| `*`         | `NotFound.jsx`| Custom 404 error page                    |
