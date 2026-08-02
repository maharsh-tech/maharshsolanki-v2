# Workspace Context & Development History

## Project Overview

- **Project Name**: Maharsh Solanki – Portfolio (`maharshsolanki-v2`)
- **Repository Model**: Frontend-only portfolio repository
- **Tech Stack**: React 19, Vite 8, React Router DOM v7, Vanilla CSS
- **Data Sources**:
  - Profile data: `public/me.json`
  - Live repository data: GitHub Public REST API (`https://api.github.com/users/maharsh-tech/repos`)

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
                    │     ├── /projects → Projects → GitHub API + RepoList
                    │     ├── /contact  → Contact (local form only)
                    │     └── *         → NotFound
                    └── Footer
```

This repository contains the React/Vite portfolio SPA only. Practical 4 (Express task-management API) was extracted into a separate dedicated repository.

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
    ├── components/
    │   ├── Header.jsx            # Welcome heading + NavBar
    │   ├── NavBar.jsx            # Nav links + dark mode toggle
    │   ├── Footer.jsx            # Copyright footer
    │   ├── About.jsx             # Bio section
    │   ├── Skills.jsx            # Skills grid by category
    │   ├── Education.jsx         # Education timeline
    │   ├── Spinner.jsx           # Loading spinner
    │   ├── ErrorMessage.jsx      # Error card with retry button
    │   └── RepoList.jsx          # Paginated GitHub repo cards
    └── pages/
        ├── Home.jsx              # About, Skills, Education
        ├── Projects.jsx          # Featured projects + GitHub API
        ├── Contact.jsx           # Controlled contact form
        └── NotFound.jsx          # Custom 404 page
```

---

## Major Design Decisions

### Profile-driven data via `public/me.json`

Profile, skills, education, and static project metadata are loaded once at startup in `main.jsx` and passed as props through `App`. This keeps content editable without touching component code.

### Local component state only

No global state library is used. Each page manages its own `useState`/`useEffect`. Dark mode and route loading live in `App.jsx`; async GitHub fetching lives in `Projects.jsx`.

### GitHub API as external data source

`Projects.jsx` fetches live repository data from the GitHub Public REST API with loading, error, and retry handling — separate from the static profile data in `me.json`.

---

## Technologies & Versions

| Layer | Technology | Version |
|-------|-----------|---------|
| UI runtime | React | ^19.2.7 |
| Build tool | Vite | ^8.1.1 |
| Routing | react-router-dom | ^7.18.1 |
| Linting | oxlint | ^1.71.0 |

---

## Completed Practicals

### Practical 1 – Base Portfolio & Component Architecture
- Vite + React scaffold with reusable components (`Header`, `NavBar`, `Footer`, `About`, `Skills`, `Education`)
- Profile-driven data model via `public/me.json`

### Practical 2 – Client-Side Routing & State Management
- React Router routes: `/`, `/projects`, `/contact`, `*`
- Controlled inputs in `Contact.jsx`, dark/light mode toggle in `App.jsx`

### Practical 3 – API Integration & Asynchronous Data Rendering
- GitHub REST API integration in `Projects.jsx` with loading/error/retry states
- `Spinner`, `ErrorMessage`, `RepoList` components; search filter; pagination

---

## Current Implementation Status

| Area | Status |
|------|--------|
| Portfolio frontend (Practicals 1–3) | Complete, builds cleanly |
| Client-side routing | Complete |
| GitHub API integration | Complete |
| Contact form | Local state only (no backend POST) |

---

## Coding Conventions

- ES modules (`import`/`export`), functional React components
- Local `useState`/`useEffect` for state; prop drilling for profile data
- Vanilla CSS with `.dark-mode` class toggle on `document.documentElement`
- SVG icons instead of emojis in UI components
- Git commits follow Conventional Commits format

---

## Important Constraints

- This repository is frontend-only; backend practicals live in separate repositories
- Profile content is sourced from `public/me.json`
- Contact form submits via `alert()` with no server integration

---

## Known Issues / Technical Debt

- `index.html` references `/vite.svg` as favicon but the file does not exist (only `public/icons.svg` is present)
- `public/me.json` references `/resume.pdf` which may not be present locally
- `Contact.jsx` tooltip still contains an emoji (removed elsewhere in Practical 3)
- Artificial 3-second loading delays in `Home.jsx` and `Projects.jsx` (intentional for screenshot capture)

---

## Verification Commands

```bash
npm install
npm run build          # production build → dist/
npm run dev            # http://localhost:5173
npm run lint           # oxlint
```
