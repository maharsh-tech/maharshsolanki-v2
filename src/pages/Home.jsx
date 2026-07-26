import React, { useState, useEffect } from 'react'
import About from '../components/About'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Spinner from '../components/Spinner'

function Home({ skills, profile }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // Increased to 3000ms for screenshot purposes
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Spinner message="Loading portfolio sections..." />
  }

  return (
    <div>
      <About profile={profile} />
      <Skills skills={skills} />
      <Education profile={profile} />
    </div>
  )
}

export default Home
