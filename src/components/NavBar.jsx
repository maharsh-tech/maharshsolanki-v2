import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../api'

function NavBar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate()
  const loggedIn = isAuthenticated()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
        padding: '10px 0',
        margin: '10px 0',
        background: '#e4e4eb',
        borderRadius: '5px'
      }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        </li>
        <li>
          <Link to="/projects" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Projects</Link>
        </li>
        <li>
          <Link to="/tasks" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Tasks</Link>
        </li>
        <li>
          <Link to="/contact" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
        </li>
        <li>
          {loggedIn ? (
            <button type="button" onClick={handleLogout} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
          )}
        </li>
        <li>
          <button 
            type="button"
            onClick={toggleDarkMode} 
            style={{ 
              cursor: 'pointer', 
              padding: '4px 10px', 
              fontWeight: '500', 
              borderRadius: '4px',
              border: '1px solid #999',
              background: '#fff',
              color: '#333'
            }}
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
