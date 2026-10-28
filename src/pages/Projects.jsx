function Projects({ profile }) {
  const staticProjects = (profile && profile.projects) || []

  return (
    <section className="projects-container" aria-label="Featured Projects">
      <div className="section-header">
        <h1 className="section-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Featured Engineering Projects
        </h1>
        <p className="section-desc">
          Production systems, cloud pipelines, RAG implementations, and full-stack applications.
        </p>
      </div>

      {staticProjects.length > 0 ? (
        <div className="projects-grid">
          {staticProjects.map((project) => (
            <article key={project.id || project.title} className="project-card">
              <div>
                <h2 className="project-title">{project.title}</h2>
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
                    <div className="project-stack-label">Stack</div>
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
                    <span>Live Application</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span>Source Code</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
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
