function Projects({ profile }) {
  const staticProjects = (profile && profile.projects) || []

  return (
    <section className="projects" style={{ padding: '20px 0' }}>
      <h2>Featured Projects</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Curated highlight of architectural and enterprise projects.
      </p>

      {staticProjects.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {staticProjects.map((project, index) => (
            <div key={index} className="repo-card">
              <h3 style={{ margin: '0 0 10px 0' }}>{project.title}</h3>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>
                {project.description}
              </p>
              <div style={{ marginBottom: '15px' }}>
                <strong>Tech Stack: </strong>
                <span style={{ fontSize: '13px', color: '#333' }}>
                  {(project.techStack || []).join(', ')}
                </span>
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
                >
                  Live Demo →
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#666', fontSize: '14px' }}>
          No featured projects listed yet. Add entries under <code>projects</code> in <code>public/me.json</code>.
        </p>
      )}
    </section>
  )
}

export default Projects
