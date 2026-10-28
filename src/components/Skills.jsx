function Skills({ skills = [] }) {
  if (!skills.length) return null

  return (
    <section className="skills-container" aria-label="Technical Skills">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-index">02 //</span>
          Technical Matrix
        </h2>
        <p className="section-desc">Languages, Spring Boot backend, cloud pipelines, and engineering toolchain.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skillGroup, groupIndex) => (
          <div key={groupIndex} className="skill-category-card">
            <h3 className="skill-category-title">
              <span>{skillGroup.category}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-red)' }}>
                [{skillGroup.items.length}]
              </span>
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