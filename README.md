# Maharsh Solanki – Portfolio (v2)

A multi-page student portfolio application built with **React 19** and **Vite**, featuring client-side routing and dynamic state management.

## Practical 2 – State Management & Routing

### Routes

| Path         | Component     | Description                              |
|-------------|---------------|------------------------------------------|
| `/`         | `Home.jsx`    | Hero, About, and Skills sections         |
| `/projects` | `Projects.jsx`| Project cards grid                       |
| `/contact`  | `Contact.jsx` | Controlled contact form with live preview|
| `*`         | `NotFound.jsx`| Custom 404 error page                    |

### Features

- **React Router v6** – Client-side navigation using `<Link>` (no full page reloads)
- **`useState` – Form Input**: Controlled inputs for name, email, and message on the Contact page with live character count
- **`useState` – UI Toggle**: Help tooltip visibility toggle on the Contact page
- **`useState` – Dark/Light Mode**: Theme toggle button in the navbar that applies CSS class to the root element
- **404 Route**: Custom error component for unknown paths
- **Responsive Design**: Fully responsive across all screen sizes

### Tech Stack

- React 19 + Vite
- React Router v6
- Vanilla CSS with CSS Custom Properties

### Getting Started

```bash
npm install
npm run dev
```
