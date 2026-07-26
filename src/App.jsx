import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
  
  // Navigation route transitions loading state
  const [routeLoading, setRouteLoading] = useState(false)
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark-mode')
  }

  // Trigger loading state on route change
  useEffect(() => {
    setRouteLoading(true)
    const timer = setTimeout(() => {
      setRouteLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="app">
      {routeLoading && (
        <div 
          className="route-loading-bar" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '4px',
            backgroundColor: '#0056b3',
            zIndex: 9999,
            width: '100%',
            animation: 'loadingProgress 0.3s ease-out-in'
          }}
        />
      )}
      <Header name={studentName} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main 
        style={{ 
          padding: '20px', 
          minHeight: '60vh', 
          maxWidth: '800px', 
          margin: '0 auto',
          opacity: routeLoading ? 0.6 : 1,
          transition: 'opacity 0.2s ease-in-out'
        }}
      >
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