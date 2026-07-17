import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

function App({ profile }) {
  const studentName = (profile && (profile.displayName || profile.name)) || 'Your Name'

  const skills = (profile && profile.skills) || []

  // useState for dark/light mode toggle
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark-mode')
  }

  return (
    <div className="app">
      <Header name={studentName} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main style={{ padding: '20px', minHeight: '60vh', maxWidth: '800px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home skills={skills} profile={profile} />} />
          <Route path="/projects" element={<Projects profile={profile} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer profile={profile} />
    </div>
  )
}

export default App