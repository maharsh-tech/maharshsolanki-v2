function Experience({ profile }) {
  const experience = (profile && profile.experience) || []
  if (!experience.length) return null

  return (
    <section className="monolith-section" id="experience" aria-label="Internship Experience">
      <div className="monolith-section-header">
        <h2 className="monolith-section-title">Industry Experience</h2>
        <p className="monolith-section-subtitle">
          Professional software development internship from resume.
        </p>
      </div>

      <div className="monolith-card-stack">
        {experience.map((item, index) => (
          <article key={item.id || index} className="monolith-card item-monolith">
            <div className="item-monolith-header">
              <div>
                <h3 className="item-title">{item.role}</h3>
                <div className="item-org-line">{item.company} &bull; {item.location}</div>
              </div>
              <div className="item-period-pill">{item.period}</div>
            </div>

            {item.highlights && item.highlights.length > 0 && (
              <ul className="item-highlights-list">
                {item.highlights.map((point, idx) => (
                  <li key={idx} className="item-highlight-point">
                    <span className="bullet-dash">&bull;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience
