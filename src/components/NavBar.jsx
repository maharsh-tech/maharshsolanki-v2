import { Link } from 'react-router-dom'

function NavBar({ darkMode, toggleDarkMode }) {
  return (
    <nav>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
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
          <Link to="/contact" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
        </li>
        <li>
          <button onClick={toggleDarkMode} style={{ cursor: 'pointer', padding: '2px 8px' }}>
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar