import { Link } from 'react-router-dom'

function About({ profile }) {
  const name = (profile && profile.name) || 'Maharsh Solanki'
  const title = (profile && profile.title) || 'Java Full Stack Developer | Spring Boot | React.js'
  const bio = (profile && profile.bio) || 'Third-year B.Tech IT student focused on Java and Spring Boot, with a Python development internship at Synent Technologies and full-stack projects using Spring Boot, React.js, PostgreSQL, and Node.js. Seeking a Java or full-stack development internship to contribute RESTful API, database design, and backend development skills.'
  const location = (profile && profile.location) || 'Nadiad, Gujarat, India'
  const github = (profile && profile.github) || 'https://github.com/maharsh-tech'
  const linkedin = (profile && profile.social && profile.social.linkedin) || ''
  const email = (profile && profile.email) || ''
  const resume = (profile && profile.resume) || 'https://drive.google.com/file/d/1L_Ro5xgNu5w3nI9Twt13uUx4npPCo3Ye/view'

  return (
    <section className="monolith-card hero-monolith" aria-label="About Developer">
      <div className="hero-top-status-row">
        <div className="status-badge-clean">
          <span className="status-blink-dot" />
          <span>3rd Year B.Tech IT &bull; Seeking Internship</span>
        </div>
        <div className="location-badge-clean">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{location}</span>
        </div>
      </div>

      <div className="hero-monolith-body">
        <h1 className="hero-monolith-title">{name}</h1>
        <div className="hero-monolith-subtitle">{title}</div>
        
        <div className="monolith-bio-card">
          <p className="bio-lead-text">{bio}</p>
        </div>

        <div className="hero-meta-row">
          <span className="hero-meta-chip">Charusat University</span>
          <span className="hero-meta-chip">Expected 2028</span>
          <span className="hero-meta-chip">CGPA: 7.49</span>
        </div>

        <div className="hero-actions-bar">
          <Link to="/tasks" className="btn-monolith-primary">
            <span>Open Task Manager</span>
            <span className="btn-arrow">&rarr;</span>
          </Link>

          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-monolith-secondary resume-highlight"
            title="Open Resume in Google Drive"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span>Resume (Google Drive)</span>
          </a>

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-monolith-secondary"
              title="GitHub Profile"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>GitHub</span>
            </a>
          )}

          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-monolith-secondary"
              title="LinkedIn Profile"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="btn-monolith-secondary"
              title="Send Direct Email"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Email</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default About