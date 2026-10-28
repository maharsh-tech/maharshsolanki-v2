function Education({ profile }) {
  const education = (profile && profile.education) || []
  if (!education.length) return null

  return (
    <section className="monolith-section" id="education" aria-label="Education Background">
      <div className="monolith-section-header">
        <h2 className="monolith-section-title">Education</h2>
        <p className="monolith-section-subtitle">
          Degree program and formal secondary education record.
        </p>
      </div>

      <div className="monolith-card-stack">
        {education.map((item, index) => {
          const periodText = item.period || `${item.startYear || ''} – ${item.endYear || 'Present'}`
          return (
            <article key={item.id || index} className="monolith-card item-monolith">
              <div className="item-monolith-header">
                <div>
                  <h3 className="item-title">{item.institution}</h3>
                  <div className="item-org-line">{item.degree}</div>
                </div>
                <div className="item-period-pill">{periodText}</div>
              </div>
              <div className="item-meta-bar">
                <span>{item.location}</span>
                {item.detail && <span className="item-detail-badge">{item.detail}</span>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Education
