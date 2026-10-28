import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Spinner from '../components/Spinner'

function Home({ skills, profile }) {
  if (!profile) {
    return <Spinner message="Loading portfolio data..." />
  }

  return (
    <div className="home-container">
      <About profile={profile} />
      <Experience profile={profile} />
      <Skills skills={skills} />
      <Education profile={profile} />
    </div>
  )
}

export default Home
