import { Link } from 'react-router-dom'

function NavBar({ darkMode, toggleDarkMode }) {
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
          <Link to="/contact" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
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