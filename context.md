# Workspace Context & Development History

## Project Overview

- **Project Name**: Maharsh Solanki – Portfolio (`maharshsolanki-v2`)
- **Repository Model**: Frontend React SPA (backend is a separate repo)
- **Tech Stack**: React 19, Vite 8, React Router DOM v7, Vanilla CSS
- **Data Sources**:
  - Profile data: `public/me.json`
  - Tasks: Express API via `VITE_API_BASE_URL` in `.env` → `src/api.js`
- **Backend repo**: [task-manager-api-24it093](https://github.com/maharsh-tech/task-manager-api-24it093)

---

## Current Architecture

```
index.html
  └── main.jsx
        ├── fetch('/me.json') → profile
        └── BrowserRouter
              └── App.jsx (darkMode, routeLoading)
                    ├── Header → NavBar
                    ├── Routes
                    │     ├── /         → Home → About, Skills, Education
                    │     ├── /projects → Projects → Featured projects only
                    │     ├── /tasks    → Tasks → Task Manager CRUD
                    │     ├── /contact  → Contact (local form only)
                    │     └── *         → NotFound
                    └── Footer
```

This repository is the React/Vite frontend only. Practical 4–5 backend lives in `task-manager-api-24it093`. Practical 6 wires them together over HTTP (CORS on the backend).

---

## Folder Structure & Responsibilities

```
maharshsolanki-v2/
├── context.md                    # Permanent project memory (this file)
├── README.md                     # Setup instructions & practical documentation
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
    ├── api.js                    # Task CRUD helpers; base URL from VITE_API_BASE_URL
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
    │   └── Toast.jsx
    └── pages/
        ├── Home.jsx
        ├── Projects.jsx          # Featured projects from me.json
        ├── Tasks.jsx             # Task Manager CRUD (Practical 6)
        ├── Contact.jsx
        └── NotFound.jsx
```

---

## Major Design Decisions

### Profile-driven data via `public/me.json`

Profile, skills, education, and static project metadata load once at startup in `main.jsx`.

### Local component state only

No global state library. Task list state lives in `Tasks.jsx`. All HTTP goes through `src/api.js` so Week 7 can attach JWT headers in one place.

### Own backend instead of GitHub (Practical 6)

The Live GitHub Repositories section from Practical 3 was replaced by a dedicated Task Manager page at `/tasks` (MongoDB-backed). Portfolio Featured Projects stay on `/projects`.

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
| Task API | Express + MongoDB | separate repo, port 5000 |

---

## Completed Practicals

### Practical 1 – Base Portfolio & Component Architecture

- Vite + React scaffold with reusable components
- Profile-driven data via `public/me.json`

### Practical 2 – Client-Side Routing & State Management

- Routes: `/`, `/projects`, `/contact`, `*`
- Controlled inputs in `Contact.jsx`, dark/light mode in `App.jsx`

### Practical 3 – API Integration & Asynchronous Data Rendering

- Originally GitHub REST API with loading/error/retry
- Patterns retained; data source replaced in Practical 6

### Practical 6 – Full Stack Integration

- `src/api.js` central client for `/tasks`
- Dedicated `/tasks` page with TaskForm / TaskList / ConfirmDialog / Toast
- Portfolio `/projects` remains featured-projects only
- CORS enabled on backend repo; two repos kept separate (no monorepo)

---

## Current Implementation Status

| Area | Status |
|------|--------|
| Portfolio frontend (Practicals 1–3) | Complete |
| Client-side routing | Complete |
| Task Manager UI ↔ Express API | Complete (Practical 6) |
| Contact form | Local state only (no backend POST) |
| JWT authentication | Not started (Week 7) |
| Route-based lazy loading | Not started (Week 8) |

---

## Coding Conventions

- ES modules (`import`/`export`), functional React components
- Local `useState`/`useEffect` for state; prop drilling for profile data
- Vanilla CSS with `.dark-mode` class toggle on `document.documentElement`
- SVG icons instead of emojis in UI components
- Git commits follow Conventional Commits format

---

## Important Constraints

- Frontend-only repository; backend practicals stay in `task-manager-api-24it093`
- Do not merge frontend and backend into one monorepo (Practical 6 deliverable)
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
# Terminal 1 — backend
cd ../task-manager-api-24it093 && npm start

# Terminal 2 — frontend
npm install
npm run build
npm run dev          # http://localhost:5173
npm run lint
```

Open `/tasks`, create/update/delete a task, refresh the browser, and confirm MongoDB persistence.
