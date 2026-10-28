function Skills({ skills = [] }) {
  if (!skills.length) return null

  return (
    <section className="monolith-section" id="skills" aria-label="Technical Skills">
      <div className="monolith-section-header">
        <h2 className="monolith-section-title">Technical Skills</h2>
        <p className="monolith-section-subtitle">
          Core languages, frameworks, cloud platforms, and developer tools from resume.
        </p>
      </div>

      <div className="skills-monolith-grid">
        {skills.map((skillGroup, groupIndex) => (
          <div key={groupIndex} className="monolith-card skill-monolith-card">
            <div className="skill-card-top">
              <span className="skill-cat-title">{skillGroup.category}</span>
              <span className="skill-count-glyph">{skillGroup.items.length} skills</span>
            </div>
            <div className="skill-chips-wrap">
              {skillGroup.items.map((skill, index) => (
                <span key={index} className="skill-chip-monolith">
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