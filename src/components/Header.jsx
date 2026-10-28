import { Link } from 'react-router-dom'
import NavBar from './NavBar'

function Header({ profile, name, darkMode, toggleDarkMode }) {
  const displayName = (profile && (profile.displayName || profile.name)) || name || 'Maharsh'
  const title = (profile && profile.title) || 'Full Stack & Cloud Developer'

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand-section">
          <div className="brand-avatar" aria-hidden="true">MS</div>
          <div className="brand-meta">
            <span className="brand-name">{displayName}</span>
            <span className="brand-role">{title.split('|')[0].trim()}</span>
          </div>
        </Link>
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </header>
  )
}

export default Header