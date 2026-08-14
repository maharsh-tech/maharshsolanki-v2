# Maharsh Solanki – Portfolio (v2)

A multi-page student portfolio application built with **React 19** and **Vite**, featuring client-side routing, state management, and full-stack task management against a separate Express + MongoDB API.

**Backend (separate repo):** [task-manager-api-24it093](https://github.com/maharsh-tech/task-manager-api-24it093)

---

## Getting Started (Practical 6 — dual servers)

1. Start the backend API (port 5000):

```bash
cd ../task-manager-api-24it093
cp .env.example .env   # set MONGO_URI if needed
npm install
npm start
```

2. Start this frontend (port 5173):

```bash
npm install
npm run dev
```

Open `http://localhost:5173/tasks` to use the Task Manager UI. All task data is persisted in MongoDB via `http://localhost:5000/tasks`.

To build for production:

```bash
npm run build
```

---

## Practical 6 – Full Stack Integration (React + Node + MongoDB)

### Architecture Overview

```
React Frontend (localhost:5173)
        |  src/api.js  (fetch)
        v
Express Backend (localhost:5000)  — separate repo
        |  Mongoose
        v
   MongoDB Atlas

Flow: /tasks page → TaskForm → POST /tasks → MongoDB → UI updates list → refresh keeps data
```

### Features Implemented

- **Dedicated `/tasks` route** (separate from portfolio `/projects`) for Task Manager CRUD
- **CORS-ready API client** in `src/api.js` with a single `BASE_URL` (`http://localhost:5000`)
- **Replaced Practical 3 GitHub fetch** with own `/tasks` API (Task Manager page)
- **Create / read / update / delete** tasks from the React UI
- **Loading and error states** for list fetch (Spinner + ErrorMessage + Retry)
- **Write-operation feedback** via toast notifications
- **Delete confirmation dialog** before removing a task
- **Optimistic create** — new task appears immediately; rolls back if the API fails
- Portfolio **Featured Projects** remain on `/projects` only (from `me.json`)

### Theory & Analysis Questions

#### 1. What changes are required on the backend (CORS) to allow the React dev server to call the Express API?
Browsers enforce the same-origin policy. Vite runs on `http://localhost:5173` while Express runs on `http://localhost:5000`, so they are different origins. Without CORS headers, the browser blocks the response. The backend installs `cors` and calls `app.use(cors())` before routes so preflight and actual requests receive `Access-Control-Allow-*` headers.

#### 2. Why should the UI re-fetch or update local state after a successful POST/PUT/DELETE rather than assuming success silently?
The server is the source of truth (validation, defaults, `_id`, timestamps). Updating UI only after a successful response (or replacing an optimistic row with the server document) keeps React state aligned with MongoDB. Silent assumptions leave the UI showing data that never persisted or missing fields the database applied.

#### 3. What is the risk of not handling errors on write operations (POST/PUT/DELETE) the same way as read operations (GET)?
Failed writes with no error UI make users believe a create/update/delete succeeded when it did not. On refresh, data disappears or reappears, eroding trust. Write errors must surface toasts (or error cards) the same way GET failures use loading/error states.

---

## Practical 3 – API Integration & Data Rendering in React

> Historical lab: originally consumed the GitHub REST API. Practical 6 replaced that live data source with the Task Manager API while keeping the same loading/error/retry patterns.

### Architecture Overview (as completed in Week 3)

```
Tasks.jsx
├── useEffect() → triggers API fetch on mount
├── useState: data, loading, error
├── [loading]  → <Spinner />
├── [error]    → <ErrorMessage message={error} onRetry={...} />
└── [success]  → TaskList UI
```

### Theory & Analysis Questions

#### 1. Why is `useEffect` required to trigger a fetch on component mount instead of calling `fetch` directly in the component body?
Calling `fetch` directly in the component body executes the side-effect during React's render phase. When data arrives and updates state, React triggers a re-render, which re-executes `fetch`, creating an **infinite network loop**. `useEffect` ensures the network request fires when the component mounts, not on every render.

#### 2. What is the difference between a loading state and an error state, and why must both be handled separately?
- **Loading State**: Pending request — show `<Spinner />`.
- **Error State**: Failed request — show `<ErrorMessage />` with Retry.
- Both must be handled separately so the UI never renders incomplete data as success, and failures remain recoverable.

#### 3. How would the user experience change if loading and error states were not implemented?
Without loading indicators, users see a blank UI during latency. Without error handling, failed requests cause silent failures with no recovery path.

---

## Practical 2 – State Management & Routing

### Routes

| Path         | Component     | Description                                         |
|-------------|---------------|-----------------------------------------------------|
| `/`         | `Home.jsx`    | Hero, About, and Skills sections                    |
| `/projects` | `Projects.jsx`| Static featured projects from `me.json`             |
| `/tasks`    | `Tasks.jsx`   | Task Manager CRUD (Practical 6; JWT in Week 7)      |
| `/contact`  | `Contact.jsx` | Controlled contact form with live preview           |
| `*`         | `NotFound.jsx`| Custom 404 error page                               |
