function Education({ profile }) {
  const education = (profile && profile.education) || []

  return (
    <section className="education" style={{ padding: '20px 0' }}>
      <h2>Education</h2>
      <ul style={{ paddingLeft: '20px' }}>
        {education.map((item, index) => (
          <li key={index} style={{ marginBottom: '15px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{item.institution}</h3>
            <p style={{ margin: '0 0 5px 0', fontWeight: '500' }}>{item.degree} ({item.period || item.startYear + ' – ' + (item.endYear || 'Present')})</p>
            {item.detail && <p style={{ margin: '0 0 5px 0', fontStyle: 'italic', fontSize: '14px' }}>{item.detail}</p>}
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>📍 {item.location}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Education
