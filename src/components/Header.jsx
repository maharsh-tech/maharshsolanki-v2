import NavBar from './NavBar'

function Header({ name, darkMode, toggleDarkMode }) {
  return (
    <header>
      <h1>Student Portfolio</h1>
      <h2>Welcome, {name}!</h2>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </header>
  );
}

export default Header;