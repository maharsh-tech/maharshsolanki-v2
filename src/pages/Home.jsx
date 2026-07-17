import About from '../components/About'
import Skills from '../components/Skills'
import Education from '../components/Education'

function Home({ skills }) {
  return (
    <div>
      <About />
      <Skills skills={skills} />
      <Education />
    </div>
  )
}

export default Home
