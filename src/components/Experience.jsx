function Experience({ profile }) {
  const experience = (profile && profile.experience) || []
  if (!experience.length) return null

  return (
    <section className="education-container" aria-label="Internship Experience">
      <div className="section-header">
        <h2 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Industry Experience
        </h2>
        <p className="section-desc">Professional software development internships and engineering work.</p>
      </div>

      <div className="education-timeline">
        {experience.map((item, index) => (
          <article key={item.id || index} className="education-item">
            <div className="education-header-row">
              <h3 className="education-institution">{item.role}</h3>
              <span className="education-period-badge" style={{ backgroundColor: 'var(--accent-cyan)' }}>
                {item.period}
              </span>
            </div>
            <div className="education-degree" style={{ color: 'var(--text-main)', fontWeight: 800 }}>
              {item.company}
            </div>
            {item.highlights && item.highlights.length > 0 && (
              <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                {item.highlights.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem', fontSize: '0.8875rem', lineHeight: 1.5, fontWeight: 500 }}>
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
