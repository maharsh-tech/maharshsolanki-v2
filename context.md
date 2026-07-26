# Workspace Context & Development History

## Project Overview
- **Project Name**: Maharsh Solanki – Portfolio (`maharshsolanki-v2`)
- **Tech Stack**: React 19, Vite 8, React Router DOM v7, Vanilla CSS
- **Data Source**: Dynamic profile data driven by `public/me.json` + GitHub Public REST API (`https://api.github.com/users/maharsh-tech/repos`)

---

## Completed Practicals & Timeline

### Practical 1 – Base Portfolio & Component Architecture
- Initialized React application with Vite.
- Structured component hierarchy into reusable sections:
  - `Header.jsx`, `NavBar.jsx`, `Footer.jsx`
  - `About.jsx`, `Skills.jsx`, `Education.jsx`
- Converted hardcoded student details into a profile-driven model reading directly from `public/me.json`.

### Practical 2 – Client-Side Routing & State Management
- Integrated **React Router DOM**:
  - `/` -> `Home.jsx` (Hero, About, Skills, Education)
  - `/projects` -> `Projects.jsx` (Featured static projects grid)
  - `/contact` -> `Contact.jsx` (Controlled contact form)
  - `*` -> `NotFound.jsx` (Custom 404 page)
- Implemented **Controlled Inputs** in `Contact.jsx` with live character counter and preview.
- Implemented **Dark / Light Mode Toggle** in `App.jsx` + `Header.jsx` controlling `.dark-mode` CSS class on `document.documentElement`.

### Practical 3 – API Integration & Asynchronous Data Rendering
- Integrated **GitHub REST API** on the `Projects.jsx` page using React `useEffect` and `useState` hooks.
- **Asynchronous State Management**:
  - `repos`: Stores fetched repository objects.
  - `loading`: Manages loading state and spinner visibility.
  - `error`: Stores network/HTTP errors (`res.ok` validation).
  - `searchTerm`: Manages controlled input for client-side search filtering.
- **UI Components Created**:
  - `Spinner.jsx`: Accessible CSS keyframe loader.
  - `ErrorMessage.jsx`: Error badge with diagnostic text and interactive **🔄 Try Again** retry button.
  - `RepoList.jsx`: Renders GitHub repositories displaying stars count (`⭐`), primary language (`🛠️`), forks count (`🍴`), and direct links.
- **Supplementary Features**:
  - Interactive **Retry button** re-triggering API requests on failure.
  - **Live Search Filter** filtering rendered repositories dynamically by name/description with item count indicators.
- **Atomic Git Commit Trajectory**:
  1. `15ed2cd` - `feat: add Spinner and ErrorMessage UI components`
  2. `b0cce52` - `feat: integrate GitHub REST API fetching in Projects page with loading and error states`
  3. `889eb19` - `feat: add search filter, star counts, and retry button to Projects page`
  4. `35b03bc` - `docs: update README with Practical 3 documentation and theory reflections`

---

## File Structure

```
maharshsolanki-v2/
├── context.md                    # Project history & workspace context log
├── README.md                     # Lab evaluation docs & theory Q&A
├── package.json                  # Dependencies (React 19, Vite, React Router)
├── vite.config.js                # Vite build configuration
├── public/
│   ├── me.json                   # Central profile & static project data
│   └── resume.pdf                # Student resume document
└── src/
    ├── App.jsx                   # Main layout, Router, & Dark mode state
    ├── App.css                   # Global styles & keyframe animations
    ├── main.jsx                  # Entry point
    ├── index.css                 # Base theme variables
    ├── components/
    │   ├── Header.jsx            # Header & theme toggle button
    │   ├── NavBar.jsx            # Navigation bar links
    │   ├── Footer.jsx            # Footer section
    │   ├── About.jsx             # About section
    │   ├── Skills.jsx            # Skills badge list
    │   ├── Education.jsx         # Education timeline
    │   ├── Spinner.jsx           # Loading spinner component
    │   ├── ErrorMessage.jsx      # Error alert & retry component
    │   └── RepoList.jsx          # GitHub repository list renderer
    └── pages/
        ├── Home.jsx              # Home page assembling components
        ├── Projects.jsx          # Projects page with GitHub REST API
        ├── Contact.jsx           # Contact form page
        └── NotFound.jsx          # Custom 404 error page
```

---

## Verification & Build Command
- Build command: `npm run build` (verified passing cleanly).
- Dev server command: `npm run dev`.
