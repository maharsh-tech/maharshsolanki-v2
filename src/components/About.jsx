import { Link } from 'react-router-dom'

function About({ profile }) {
  const name = (profile && profile.name) || 'Maharsh Solanki'
  const title = (profile && profile.title) || 'Java Full Stack Developer | Spring Boot | React.js'
  const bio = (profile && profile.bio) || 'Third-year B.Tech IT student focused on Java and Spring Boot.'
  const location = (profile && profile.location) || 'Nadiad, Gujarat, India'
  const github = (profile && profile.github) || 'https://github.com/maharsh-tech'
  const linkedin = (profile && profile.social && profile.social.linkedin) || ''
  const email = (profile && profile.email) || ''
  const phone = (profile && profile.phone) || ''
  const resume = (profile && profile.resume) || '/resume.pdf'

  return (
    <section className="hero-card" aria-label="About Developer">
      <div className="hero-status-bar">
        <div className="status-badge">
          <span className="status-dot" aria-hidden="true" />
          <span>3rd Year B.Tech IT &bull; Seeking Internship</span>
        </div>
        <div className="location-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{location}</span>
        </div>
      </div>

      <h1 className="hero-title">{name}</h1>
      <div className="hero-subtitle">{title}</div>
      <p className="hero-bio">{bio}</p>

      <div className="hero-actions">
        <Link to="/tasks" className="social-btn primary">
          Open Task Manager &rarr;
        </Link>
        {resume && (
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            style={{ backgroundColor: 'var(--accent-yellow)', color: '#000000' }}
            title="Download / View Resume PDF"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span>Resume (PDF)</span>
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="GitHub Profile"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
            className="social-btn"
            title="LinkedIn Profile"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
            className="social-btn"
            title="Send Email"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Email</span>
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="social-btn"
            title="Call"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{phone}</span>
          </a>
        )}
      </div>
    </section>
  )
}

export default About