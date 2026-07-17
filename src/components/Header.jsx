import NavBar from './NavBar'

function Header({ name, darkMode, toggleDarkMode }) {
  return (
    <header>
      <h1>Welcome, {name}!</h1>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </header>
  );
}

export default Header;