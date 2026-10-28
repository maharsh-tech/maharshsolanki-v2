function Skills({ skills = [] }) {
  if (!skills.length) return null

  return (
    <section className="skills-container" aria-label="Technical Skills">
      <div className="section-header">
        <h2 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Technical Competencies
        </h2>
        <p className="section-desc">Core languages, cloud platforms, frameworks, and engineering tools.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skillGroup, groupIndex) => (
          <div key={groupIndex} className="skill-category-card">
            <h3 className="skill-category-title">
              <span>{skillGroup.category}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{skillGroup.items.length}</span>
            </h3>
            <div className="skill-pills">
              {skillGroup.items.map((skill, index) => (
                <span key={index} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills