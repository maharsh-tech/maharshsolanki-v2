function About({ profile }) {
  const bio = (profile && profile.bio) || 'About information not provided.'
  return (
    <section className="about" style={{ padding: '20px 0' }}>
      <h2>About Me</h2>
      <p style={{ lineHeight: '1.6' }}>{bio}</p>
    </section>
  );
}

export default About;