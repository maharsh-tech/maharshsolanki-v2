# Maharsh Solanki – Portfolio (v2)

A multi-page student portfolio application built with **React 19** and **Vite**, featuring client-side routing, state management, and asynchronous REST API integration.

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

### Getting Started

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```
