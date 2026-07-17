function Education() {
  const education = [
    {
      institution: 'Charusat University',
      degree: 'B.Tech in Information Technology',
      period: '2024 – Present',
      location: 'Anand, Gujarat, India',
      detail: '3rd Year – Currently Pursuing'
    },
    {
      institution: 'Unique School of Science',
      degree: 'Higher Secondary Certificate (HSC) – Science Stream',
      period: 'Completed 2024',
      location: 'Nadiad, Gujarat, India'
    },
    {
      institution: 'Unique School of Science',
      degree: 'Secondary School Certificate (SSC)',
      period: 'Completed 2022',
      location: 'Nadiad, Gujarat, India'
    }
  ]

  return (
    <section className="education" style={{ padding: '20px 0' }}>
      <h2>Education</h2>
      <ul style={{ paddingLeft: '20px' }}>
        {education.map((item, index) => (
          <li key={index} style={{ marginBottom: '15px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{item.institution}</h3>
            <p style={{ margin: '0 0 5px 0', fontWeight: '500' }}>{item.degree} ({item.period})</p>
            {item.detail && <p style={{ margin: '0 0 5px 0', fontStyle: 'italic', fontSize: '14px' }}>{item.detail}</p>}
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>📍 {item.location}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Education
