import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  const studentName = "Maharsh Solanki"

  const skills = [
    {
      category: 'Languages',
      items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Node.js'],
    },
    {
      category: 'Frontend',
      items: ['React.js', 'HTML5', 'CSS3'],
    },
    {
      category: 'Backend',
      items: ['FastAPI', 'Spring Boot', 'REST APIs', 'Firebase Auth'],
    },
    {
      category: 'Cloud',
      items: ['AWS (EC2, S3, Lambda)', 'Microsoft Azure'],
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'PostgreSQL', 'MySQL'],
    },
    {
      category: 'AI / ML',
      items: ['RAG', 'LLM Integration'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'Postman', 'PyroGram'],
    },
  ]

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
          <Route path="/" element={<Home skills={skills} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App