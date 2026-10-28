import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Spinner from './components/Spinner'
import './App.css'

const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))

function App({ profile }) {
  const studentName = (profile && (profile.displayName || profile.name)) || 'Maharsh'
  const skills = (profile && profile.skills) || []

  const [darkMode, setDarkMode] = useState(false)
  const [routeLoading, setRouteLoading] = useState(false)
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
      return next
    })
  }

  // Trigger brief indicator on route change
  useEffect(() => {
    setRouteLoading(true)
    const timer = setTimeout(() => {
      setRouteLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="app">
      {routeLoading && <div className="route-loading-bar" />}
      <Header profile={profile} name={studentName} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main 
        className="app-main"
        style={{ 
          opacity: routeLoading ? 0.65 : 1,
          transition: 'opacity 0.15s ease'
        }}
      >
        <Suspense fallback={<Spinner message="Loading view..." />}>
          <Routes>
            <Route path="/" element={<Home skills={skills} profile={profile} />} />
            <Route path="/projects" element={<Projects profile={profile} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer profile={profile} />
    </div>
  )
}

export default App