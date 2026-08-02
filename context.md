# Workspace Context & Development History



## Project Overview



- **Project Name**: Maharsh Solanki – Portfolio (`maharshsolanki-v2`)

- **Repository Model**: Single monorepo for the entire semester (frontend + backend)

- **Frontend Stack**: React 19, Vite 8, React Router DOM v7, Vanilla CSS

- **Backend Stack**: Node.js, Express 4 (CommonJS), in-memory storage

- **Data Sources**:

  - Frontend profile: `public/me.json`

  - Frontend live data: GitHub Public REST API

  - Backend tasks: in-memory array (no database in Week 4)



---



## Current Architecture



```

maharshsolanki-v2/

├── Frontend (Vite :5173)          ← React SPA, unchanged since Practical 3

│   └── src/ → pages, components

│

└── Backend (Express :5000)        ← Practical 4 addition

    └── server/ → routes, controllers, middleware

```



The frontend and backend are **separate Node projects** with independent `package.json` files. They run as two processes and are not wired together in Week 4. API testing is done via Postman / Thunder Client or the included `server/test-api.js` script.



---



## Folder Structure & Responsibilities



```

maharshsolanki-v2/

├── context.md                      # Permanent project memory (this file)

├── README.md                       # Setup instructions & practical documentation

├── package.json                    # Frontend dependencies (ESM, "type": "module")

├── vite.config.js                  # Vite build config (React plugin only)

├── index.html                      # SPA entry shell

├── public/

│   ├── me.json                     # Profile, skills, education, static projects

│   └── icons.svg                   # SVG icon asset

├── server/                         # Backend — separate Node project (CommonJS)

│   ├── package.json                # Express dependency & start script

│   ├── server.js                   # App entry: middleware pipeline + listen(5000)

│   ├── test-api.js                 # Automated endpoint verification script

│   ├── routes/

│   │   └── tasks.js                # CRUD route definitions + route middleware

│   ├── controllers/

│   │   └── taskController.js       # In-memory task storage & handler logic

│   └── middleware/

│       ├── logger.js               # Global request logging

│       ├── validateContentType.js  # POST/PUT Content-Type check

│       ├── validateTaskId.js       # Route-specific numeric ID validation

│       ├── notFound.js             # 404 handler for undefined routes

│       └── errorHandler.js         # Global error handler (last in chain)

└── src/                            # React frontend (untouched in Week 4)

    ├── main.jsx                    # Bootstraps app, fetches me.json

    ├── App.jsx                     # Routes, dark mode, loading bar

    ├── App.css / index.css         # Component & global styles

    ├── components/                 # Header, NavBar, Footer, Spinner, etc.

    └── pages/                      # Home, Projects, Contact, NotFound

```



---



## Major Design Decisions



### 1. Separate `server/` directory with its own `package.json`



**Why:** The root `package.json` uses `"type": "module"` for Vite/React (ESM). The Week 4 handbook uses CommonJS (`require`). A nested backend project avoids module-system conflicts and keeps Express out of frontend dependencies.



**Benefit:** Backend can grow (database, auth, additional routes) without touching the React build pipeline.



### 2. Modular structure from the start (`routes/`, `controllers/`, `middleware/`)



**Why:** The handbook teaches middleware pipeline architecture. Splitting concerns into folders mirrors Express best practices and makes each middleware independently testable.



**Benefit:** Adding new routes or middleware in later weeks requires no restructuring.



### 3. Frontend left untouched



**Why:** Week 4 scope is backend-only, tested via Postman. No Vite proxy, CORS, or frontend API calls were needed.



**Benefit:** Zero regression risk to the working portfolio from Practicals 1–3.



### 4. Numeric string IDs with auto-increment



**Why:** Simple in-memory ID generation (`String(nextId++)`) satisfies the handbook's `:id` parameter and enables straightforward regex validation (`/^\d+$/`) in `validateTaskId`.



**Assumption:** IDs are positive integers stored as strings for consistent JSON serialization.



### 5. Validation split between middleware and controller



**Why:** Route-specific concerns (ID format, Content-Type) live in middleware. Business rules (title required, field types) live in the controller. This matches the handbook's distinction between `app.use()` and route-specific middleware.



---



## Technologies & Versions



| Layer | Technology | Version |

|-------|-----------|---------|

| Frontend runtime | React | ^19.2.7 |

| Frontend build | Vite | ^8.1.1 |

| Frontend routing | react-router-dom | ^7.18.1 |

| Frontend lint | oxlint | ^1.71.0 |

| Backend runtime | Node.js | 18+ |

| Backend framework | Express | ^4.21.2 |

| Backend module system | CommonJS | (default in `server/`) |



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



### Practical 4 – RESTful API with Node.js and Express

- Express server on port 5000 with full CRUD for `/tasks`

- In-memory task array (no database)

- Middleware pipeline: logging → routes → 404 handler → global error handler

- Supplementary: Content-Type validation, task ID validation, structured 404 responses

- Automated test script: `server/test-api.js` (11 tests, all passing on fresh server)



---



## Current Implementation Status



| Area | Status |

|------|--------|

| Frontend (Practicals 1–3) | Complete, builds cleanly |

| Backend CRUD (`/tasks`) | Complete, tested |

| Logging middleware | Complete |

| Content-Type validation | Complete |

| Task ID validation | Complete |

| 404 handler | Complete |

| Global error handler | Complete |

| Frontend ↔ backend integration | Not started (future week) |

| Database (MongoDB) | Not started (future week) |

| Lab screenshots | Captured manually outside the repository |



---



## Coding Conventions



- **Frontend**: ES modules (`import`/`export`), functional React components, local `useState`/`useEffect`, prop drilling for profile data, vanilla CSS with `.dark-mode` class toggle

- **Backend**: CommonJS (`require`/`module.exports`), one export per middleware file, controllers handle business logic, routes wire middleware + handlers

- **API responses**: Consistent JSON objects with `{ error: "..." }` for failures and task objects for successes

- **HTTP status codes**: 200 (read/update/delete success), 201 (create), 400 (validation), 404 (not found), 500 (server error)

- **Git commits**: Conventional Commits format (`feat:`, `docs:`, etc.)



---



## Important Constraints



- Single Git repository for the entire semester — backend lives in `server/`, not a separate repo

- Week 4 uses in-memory storage only — no MongoDB, Docker, or authentication

- Frontend must not be modified unless a practical explicitly requires it

- No speculative preparation for future weeks

- Screenshots are captured manually by the developer



---



## Known Issues / Technical Debt



- `index.html` references `/vite.svg` as favicon but the file does not exist (only `public/icons.svg` is present)

- `public/me.json` references `/resume.pdf` which may not be present locally

- `Contact.jsx` tooltip still contains an emoji (removed elsewhere in Practical 3)

- Artificial 3-second loading delays in `Home.jsx` and `Projects.jsx` (intentional for screenshot capture)

- Backend task data is lost on server restart (expected for in-memory storage)

- No CORS configuration on the backend (not needed until frontend integration)



---



## Future Considerations



These are noted for awareness only — not implemented or prepared:



- **Frontend ↔ backend wiring**: Will require Vite dev proxy or CORS config in a future practical

- **Persistent storage**: MongoDB integration will extend `server/` without restructuring

- **Contact form**: Currently uses `alert()` — may connect to a backend endpoint later

- **Environment variables**: `.env` for port, database URI, etc. when needed



---



## Verification Commands



```bash

# Frontend

npm install

npm run build          # verified passing

npm run dev            # http://localhost:5173



# Backend

cd server

npm install

npm start              # http://localhost:5000

node test-api.js       # 11/11 tests passing (restart server for clean state)

```



---



## Assumptions Made During Week 4 Implementation



- Task objects include `id`, `title`, `description`, and `completed` fields (handbook specifies CRUD but not exact schema; `title` is required)

- IDs are auto-incremented positive integers stored as strings

- The handbook's separate-repo deliverable (`task-manager-api-<rollno>`) is satisfied by the `server/` subfolder within this monorepo per semester instructions

- Postman/Thunder Client is the primary manual testing tool; `test-api.js` serves as automated verification

- Lab screenshots are captured manually outside the repository


