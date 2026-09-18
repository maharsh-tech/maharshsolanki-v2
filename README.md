# Maharsh Solanki – Portfolio (v2)

A multi-page student portfolio application built with **React 19** and **Vite**, featuring client-side routing, state management, and full-stack task management against a separate Express + MongoDB API.

**Backend (separate repo):** [task-manager-api-24it093](https://github.com/maharsh-tech/task-manager-api-24it093)

---

## Getting Started (Practical 6 — dual servers)

1. Start the backend API:

```bash
cd ../task-manager-api-24it093
cp .env.example .env   # set MONGO_URI, PORT, CORS_ORIGIN
npm install
npm start
```

2. Start this frontend:

```bash
cp .env.example .env   # set VITE_API_BASE_URL
npm install
npm run dev
```

Open `http://localhost:5173/tasks` for the Task Manager UI (login required). The API base URL comes from `VITE_API_BASE_URL` (not hardcoded).

To build for production:

```bash
npm run build
```

---

## Practical 8 – Performance Optimization and Lazy Loading

### What Changed

The `Projects` and `Contact` page components are now **code-split** via `React.lazy()` + `<Suspense>`. Instead of being bundled into the main JS file, each is emitted as a separate chunk that loads on-demand when the user first navigates to that route. The existing `<Spinner message="Loading page..." />` component is reused as the Suspense fallback — no new dependencies were added.

### Before / After Bundle Sizes

| File | Before (kB) | After (kB) | gzip Before | gzip After |
|------|-------------|------------|-------------|------------|
| `index-*.js` (main) | 228.88 | 228.92 | 73.31 | 73.36 |
| `Projects-*.js` | — | 1.39 | — | 0.69 |
| `Contact-*.js` | — | 1.69 | — | 0.84 |
| `index-*.css` | 1.48 | 1.48 | 0.59 | 0.59 |
| `index.html` | 0.46 | 0.46 | 0.30 | 0.30 |

The main bundle size is essentially unchanged (the tiny increase is the `React.lazy`/`Suspense` + `Spinner` import overhead). Projects and Contact are now separate chunks loaded only when those routes are visited.

### Slow-3G Network Tab Evidence

<!-- TODO: student to paste Slow-3G Network tab screenshot here showing the lazy chunk being fetched on navigation -->

### Key Questions

#### 1. When does the initial bundle download vs when does a lazy chunk download?
The initial bundle (`index-*.js`) downloads immediately when the user first loads the page. A lazy chunk (e.g. `Projects-*.js`) only downloads when the user navigates to that route for the first time. On subsequent visits the chunk is already cached by the browser.

#### 2. Why does lazy loading improve perceived performance without reducing total bytes downloaded?
The total bytes across all chunks remain the same (or slightly larger due to chunk wrapper overhead). However, perceived performance improves because the user sees the first page faster — they only pay for the code they actually need right now. Deferred routes load in the background or on-demand, so the initial paint is not blocked by code the user may never visit.

#### 3. When is lazy loading not worth the added complexity?
For very small components (a few hundred bytes) or routes that nearly every user visits on every session, the overhead of an extra HTTP request and the flash of a loading spinner outweigh the savings. It is also unnecessary when the entire application bundle is already small enough that it loads in under a second on typical connections.

---

## Practical 7 – Authentication and Middleware Pipeline

### Frontend auth flow

```
/register → POST /auth/register → redirect /login
/login    → POST /auth/login → store JWT in localStorage → /tasks
/tasks    → ProtectedRoute checks token → Bearer header on all API calls
Logout    → clear token → redirect /login
401       → clear token → redirect /login (Tasks page + api.js)
```

### Features Implemented

- **JWT in `localStorage`** — `src/api.js` attaches `Authorization: Bearer` on every request
- **`/login` and `/register` pages** — register then sign in; login stores token and opens Task Manager
- **`ProtectedRoute`** — `/tasks` requires a token; otherwise redirect to `/login`
- **Logout** in NavBar clears token and sends user to login
- **401 handling** — expired or invalid tokens clear storage and redirect to login
- **Per-user tasks** — backend scopes all `/tasks` CRUD to the logged-in user; each account has its own list

### Theory & Analysis Questions

#### 1. Why store the JWT on the client after login instead of sending the password on every request?
Passwords must not be sent repeatedly — each transmission increases exposure. A short-lived JWT proves the user already authenticated; the server verifies the signature without storing session state in memory for every user.

#### 2. Why redirect to login on 401 instead of showing a generic error?
A 401 means the token is missing, invalid, or expired — the user is no longer authenticated. Continuing to show the Task Manager would imply they can still access protected data. Clearing the token and redirecting restores a consistent logged-out state.

#### 3. Why protect `/tasks` in the frontend if the backend already requires JWT?
The backend is the real security boundary, but the frontend guard improves UX (no flash of empty tasks or failed API calls) and hides the CRUD UI from anonymous visitors. Direct API calls without a token still fail with 401 on the server.

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
- **CORS-ready API client** in `src/api.js` using `VITE_API_BASE_URL` from `.env`
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
| `/tasks`    | `Tasks.jsx`   | Task Manager CRUD (login required; Practical 7 JWT) |
| `/login`    | `Login.jsx`   | Sign in; stores JWT and opens `/tasks`              |
| `/register` | `Register.jsx`| Create account; redirects to login                  |
| `/contact`  | `Contact.jsx` | Controlled contact form with live preview           |
| `*`         | `NotFound.jsx`| Custom 404 error page                               |
