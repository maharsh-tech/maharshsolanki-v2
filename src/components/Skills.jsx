function Skills({ skills }) {
  return (
    <section className="skills" style={{ padding: '20px 0' }}>
      <h2>Technical Skills</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '15px' }}>
        {skills.map((skillGroup, groupIndex) => (
          <div key={groupIndex} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
            <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
              {skillGroup.category}
            </h3>
            <ul style={{ paddingLeft: '15px', margin: 0 }}>
              {skillGroup.items.map((skill, index) => (
                <li key={index} style={{ marginBottom: '5px', fontSize: '15px' }}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;