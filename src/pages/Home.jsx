import About from '../components/About'
import Skills from '../components/Skills'

function Home({ skillList }) {
  return (
    <div>
      <About />
      <Skills skillList={skillList} />
    </div>
  )
}

export default Home
