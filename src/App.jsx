import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Demonstrative lazy loading wrapper with 400ms micro-delay so screen share captures Suspense transitions
const lazyWithDemo = (importFn, delay = 400) =>
  lazy(() =>
    Promise.all([
      importFn(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module)
  )

// Route-level lazy loading (Practical 8 architecture)
const Home = lazyWithDemo(() => import('./pages/Home'))
const Projects = lazyWithDemo(() => import('./pages/Projects'))
const Contact = lazyWithDemo(() => import('./pages/Contact'))
const Tasks = lazyWithDemo(() => import('./pages/Tasks'))
const Login = lazyWithDemo(() => import('./pages/Login'))
const Register = lazyWithDemo(() => import('./pages/Register'))
const NotFound = lazyWithDemo(() => import('./pages/NotFound'))

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

  // Trigger loading indicator on route change
  useEffect(() => {
    setRouteLoading(true)
    const timer = setTimeout(() => {
      setRouteLoading(false)
    }, 180)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="app">
      {routeLoading && <div className="route-loading-bar" />}
      <Header profile={profile} name={studentName} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main 
        className="app-main"
        style={{ 
          opacity: routeLoading ? 0.6 : 1,
          transition: 'opacity 0.15s ease'
        }}
      >
        <Suspense fallback={<div className="route-loader-silent"><div className="silent-spinner" /></div>}>
          <Routes>
            <Route path="/" element={<Home skills={skills} profile={profile} darkMode={darkMode} />} />
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