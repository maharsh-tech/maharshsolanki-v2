function Projects() {
  const projects = [
    { title: 'Project 1', description: 'A web application built with React.' },
    { title: 'Project 2', description: 'A Python script for automation.' },
    { title: 'Project 3', description: 'A database management system.' }
  ]

  return (
    <section className="projects" style={{ padding: '20px 0' }}>
      <h2>My Projects</h2>
      <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
        {projects.map((project, index) => (
          <li key={index} style={{ marginBottom: '15px' }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
