function Projects({ profile }) {
  const projects = (profile && profile.projects) || []

  return (
    <section className="projects" style={{ padding: '20px 0' }}>
      <h2>My Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' }}>
        {projects.map((project, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{project.title}</h3>
            <p style={{ fontSize: '15px', color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>
              {project.description}
            </p>
            <div style={{ marginBottom: '15px' }}>
              <strong>Tech Stack: </strong>
              <span style={{ fontSize: '14px', color: '#333' }}>
                {(project.techStack || []).join(', ')}
              </span>
            </div>
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-block', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Live Link →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
