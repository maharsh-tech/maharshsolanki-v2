import { NavLink, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../api'

function NavBar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate()
  const loggedIn = isAuthenticated()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="nav-container" aria-label="Main Navigation">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <div className="nav-controls">
        {loggedIn ? (
          <button 
            type="button" 
            onClick={handleLogout} 
            className="btn-auth"
          >
            Logout
          </button>
        ) : (
          <NavLink 
            to="/login" 
            className={({ isActive }) => `btn-auth${isActive ? ' active' : ''}`}
          >
            Login
          </NavLink>
        )}

        <button 
          type="button"
          onClick={toggleDarkMode}
          className="btn-theme-toggle"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          {darkMode ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <span>Light</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <span>Dark</span>
            </>
          )}
        </button>
      </div>
    </nav>
  )
}

export default NavBar
