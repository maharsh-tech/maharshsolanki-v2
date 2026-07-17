import About from '../components/About'
import Skills from '../components/Skills'
import Education from '../components/Education'

function Home({ skills, profile }) {
  return (
    <div>
      <About profile={profile} />
      <Skills skills={skills} />
      <Education profile={profile} />
    </div>
  )
}

export default Home
