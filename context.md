# Workspace Context & Development History

## Project Overview

- **Project Name**: Maharsh Solanki – Portfolio (`maharshsolanki-v2`)
- **Repository Model**: Frontend React SPA (backend is a separate repo)
- **Tech Stack**: React 19, Vite 8, React Router DOM v7, Vanilla CSS
- **Data Sources**:
  - Profile data: `public/me.json`
  - Tasks: Express API via `VITE_API_BASE_URL` (`.env`) → `src/api.js`
- **Backend repo**: [task-manager-api-24it093](https://github.com/maharsh-tech/task-manager-api-24it093)
- **Env config**: `.env` (gitignored) + `.env.example` (committed)

---

## Current Architecture

```
index.html
  └── main.jsx
        ├── fetch('/me.json') → profile
        └── BrowserRouter
              └── App.jsx (darkMode, routeLoading)
                    ├── Header → NavBar (Home | Projects | Tasks | Contact)
                    ├── Routes
                    │     ├── /         → Home → About, Skills, Education
                    │     ├── /projects → Projects → Featured projects only
                    │     ├── /tasks    → Tasks → Task Manager CRUD
                    │     ├── /contact  → Contact (local form only)
                    │     └── *         → NotFound
                    └── Footer

Tasks.jsx
  └── src/api.js  ← VITE_API_BASE_URL from .env
        └── Express backend (separate repo)
              └── MongoDB Atlas
```

This repository is the React/Vite frontend only. Practical 4–5 backend lives in `task-manager-api-24it093`. Practical 6 wires them together over HTTP (CORS origin configured on the backend via `CORS_ORIGIN`).

---

## Environment Variables

| Variable | File | Purpose |
|----------|------|---------|
| `VITE_API_BASE_URL` | `.env` | Backend API base URL (no trailing slash), e.g. `http://localhost:5000` |

Copy `.env.example` → `.env` before `npm run dev`. Vite only reads env at process start — restart the dev server after changing `.env`.

**Never hardcode** the API host in `src/api.js` or components. Missing `VITE_API_BASE_URL` throws at module load.

---

## Folder Structure & Responsibilities

```
maharshsolanki-v2/
├── context.md                    # Permanent project memory (this file)
├── README.md                     # Setup instructions & practical documentation
├── .env.example                  # VITE_API_BASE_URL template (committed)
├── .env                          # Local env — gitignored
├── package.json                  # Frontend dependencies (ESM, "type": "module")
├── vite.config.js                # Vite build configuration
├── index.html                    # SPA entry shell
├── public/
│   ├── me.json                   # Profile, skills, education, static projects
│   └── icons.svg                 # SVG icon asset
└── src/
    ├── main.jsx                  # Bootstraps app, fetches me.json
    ├── App.jsx                   # Routes, dark mode, route loading bar
    ├── App.css / index.css       # Component & global styles
    ├── api.js                    # Task CRUD; base URL from VITE_API_BASE_URL
    ├── components/
    │   ├── Header.jsx
    │   ├── NavBar.jsx
    │   ├── Footer.jsx
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Education.jsx
    │   ├── Spinner.jsx
    │   ├── ErrorMessage.jsx
    │   ├── TaskForm.jsx
    │   ├── TaskList.jsx
    │   ├── ConfirmDialog.jsx
    │   ├── Toast.jsx
    │   └── ProtectedRoute.jsx
    └── pages/
        ├── Home.jsx
        ├── Projects.jsx          # Featured projects from me.json
        ├── Tasks.jsx             # Task Manager CRUD (auth required)
        ├── Login.jsx
        ├── Register.jsx
        ├── Contact.jsx
        └── NotFound.jsx
```

---

## Major Design Decisions

### Profile-driven data via `public/me.json`

Profile, skills, education, and static project metadata load once at startup in `main.jsx`.

### Local component state only

No global state library. Task list state lives in `Tasks.jsx`. All HTTP goes through `src/api.js` which stores the JWT and attaches Bearer headers.

### Env-based API base URL (no hardcoded hosts)

`src/api.js` reads `import.meta.env.VITE_API_BASE_URL`. Changing backend host/port does not require editing source — only `.env`.

### Dedicated `/tasks` page (not under Projects)

Portfolio (`/projects`) and Task Manager (`/tasks`) are separate routes. `/tasks` is wrapped in `ProtectedRoute` (Practical 7).

### Optimistic create with rollback

New tasks appear immediately with a temporary `_id`; on success they are replaced by the MongoDB document; on failure the temp row is removed and a toast explains the error.

---

## Technologies & Versions

| Layer | Technology | Version |
|-------|-----------|---------|
| UI runtime | React | ^19.2.7 |
| Build tool | Vite | ^8.1.1 |
| Routing | react-router-dom | ^7.18.1 |
| Linting | oxlint | ^1.71.0 |
| Task API | Express + MongoDB | separate repo; URL from `VITE_API_BASE_URL` |

---

## Completed Practicals

### Practical 1 – Base Portfolio & Component Architecture

- Vite + React scaffold with reusable components
- Profile-driven data via `public/me.json`

### Practical 2 – Client-Side Routing & State Management

- Routes: `/`, `/projects`, `/contact`, `*` (later extended with `/tasks` in Practical 6)
- Controlled inputs in `Contact.jsx`, dark/light mode in `App.jsx`

### Practical 3 – API Integration & Asynchronous Data Rendering

- Originally GitHub REST API with loading/error/retry
- Patterns retained; data source replaced in Practical 6

### Practical 6 – Full Stack Integration

- `src/api.js` central client; base URL from `VITE_API_BASE_URL`
- Dedicated `/tasks` page with TaskForm / TaskList / ConfirmDialog / Toast
- Portfolio `/projects` remains featured-projects only
- Backend CORS via `CORS_ORIGIN` in backend `.env`; two repos kept separate

### Practical 7 – Authentication and Middleware Pipeline

- JWT stored in `localStorage` (`auth_token`); `Authorization: Bearer` on all API requests
- `/login`, `/register` pages; register → login → `/tasks`
- `ProtectedRoute` guards `/tasks`; NavBar logout clears token
- 401 responses clear token and redirect to `/login` (api.js + Tasks.jsx)
- Backend scopes tasks per user (`userId`); different logins see different task lists

---

## Current Implementation Status

| Area | Status |
|------|--------|
| Portfolio frontend (Practicals 1–3) | Complete |
| Client-side routing | Complete (`/`, `/projects`, `/tasks`, `/login`, `/register`, `/contact`) |
| Task Manager UI ↔ Express API | Complete (Practical 6) |
| Env-based API URL | Complete (`VITE_API_BASE_URL`) |
| JWT authentication (login, logout, protected `/tasks`) | Complete (Practical 7) |
| Per-user tasks (backend `userId` scoping) | Complete |
| Contact form | Local state only (no backend POST) |
| Route-based lazy loading | Not started (Week 8) |

---

## Coding Conventions

- ES modules (`import`/`export`), functional React components
- Local `useState`/`useEffect` for state; prop drilling for profile data
- Vanilla CSS with `.dark-mode` class toggle on `document.documentElement`
- SVG icons instead of emojis in UI components
- No hardcoded API hosts — use `.env`
- Git commits follow Conventional Commits format

---

## Important Constraints

- Frontend-only repository; backend practicals stay in `task-manager-api-24it093`
- Do not merge frontend and backend into one monorepo (Practical 6 deliverable)
- `.env` is gitignored; commit `.env.example` only
- Profile content from `public/me.json`
- Contact form submits via `alert()` with no server integration

---

## Known Issues / Technical Debt

- `index.html` references `/vite.svg` as favicon but the file may be missing from `public/`
- `public/me.json` references `/resume.pdf` which may not be present locally
- Artificial 3-second loading delay may still exist on `Home.jsx` (screenshot leftover); Task Manager fetch has no artificial delay

---

## Verification Commands

```bash
# Terminal 1 — backend (set MONGO_URI, PORT, CORS_ORIGIN in its .env)
cd ../task-manager-api-24it093 && npm start

# Terminal 2 — frontend
cp .env.example .env   # set VITE_API_BASE_URL if needed
npm install
npm run build
npm run dev
npm run lint
```

Open `/login`, register or sign in, then use `/tasks` to create/update/delete tasks. Logout and confirm `/tasks` redirects to login.
