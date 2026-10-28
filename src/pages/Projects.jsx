function Projects({ profile }) {
  const staticProjects = (profile && profile.projects) || []

  return (
    <section className="projects-container" aria-label="Featured Projects">
      <div className="section-header">
        <h1 className="section-title">
          <span className="section-index">// ARCHIVE</span>
          Featured Engineering Projects
        </h1>
        <p className="section-desc">
          Production systems, Spring Boot backends, cloud pipelines, and full-stack applications.
        </p>
      </div>

      {staticProjects.length > 0 ? (
        <div className="projects-grid">
          {staticProjects.map((project, index) => (
            <article key={project.id || project.title} className="project-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <h2 className="project-title" style={{ margin: 0 }}>{project.title}</h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-red)' }}>
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="project-desc">{project.description}</p>

                {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                  <div className="project-metrics-wrap">
                    {project.metrics.map((metric, idx) => (
                      <span key={idx} className="metric-badge">
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                  <div className="project-stack-wrap">
                    <div className="project-stack-label">Architecture Stack</div>
                    <div className="project-tech-tags">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="project-links">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    <span>Live Demo &rarr;</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    <span>Source Code &rarr;</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="craft-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            No projects found in profile configuration.
          </p>
        </div>
      )}
    </section>
  )
}

export default Projects
