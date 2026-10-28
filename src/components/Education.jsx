function Education({ profile }) {
  const education = (profile && profile.education) || []
  if (!education.length) return null

  return (
    <section className="education-container" aria-label="Education Background">
      <div className="section-header">
        <h2 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          Academic Background
        </h2>
        <p className="section-desc">Formal degree programs and secondary education.</p>
      </div>

      <div className="education-timeline">
        {education.map((item, index) => {
          const periodText = item.period || `${item.startYear || ''} – ${item.endYear || 'Present'}`
          return (
            <article key={item.id || index} className="education-item">
              <div className="education-header-row">
                <h3 className="education-institution">{item.institution}</h3>
                <span className="education-period-badge">{periodText}</span>
              </div>
              <div className="education-degree">{item.degree}</div>
              <div className="education-meta">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {item.location}
                </span>
              </div>
              {item.detail && (
                <div className="education-detail">
                  {item.detail}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Education
