function Experience({ profile }) {
  const experience = (profile && profile.experience) || []
  if (!experience.length) return null

  return (
    <section className="education-container" aria-label="Internship Experience">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-index">01 //</span>
          Industry Experience
        </h2>
        <p className="section-desc">Production software development internships and engineering work.</p>
      </div>

      <div className="education-timeline">
        {experience.map((item, index) => (
          <article key={item.id || index} className="education-item">
            <div className="education-header-row">
              <h3 className="education-institution">{item.role}</h3>
              <span className="education-period-badge">
                {item.period}
              </span>
            </div>
            <div className="education-degree" style={{ color: 'var(--text-main)', fontWeight: 800 }}>
              {item.company} &bull; {item.location}
            </div>
            {item.highlights && item.highlights.length > 0 && (
              <ul style={{ margin: '0.65rem 0 0', paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                {item.highlights.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem', fontSize: '0.9rem', lineHeight: 1.5, fontWeight: 600 }}>
                    {point}
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
