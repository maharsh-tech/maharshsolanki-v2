import React, { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RepoList from '../components/RepoList'

function Projects({ profile }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const username = (profile && profile.username) || 'maharsh-tech'

  const fetchRepos = () => {
    setLoading(true)
    setError(null)

    setTimeout(() => {
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`GitHub API HTTP ${res.status}: ${res.statusText}`)
          }
          return res.json()
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setRepos(data)
          } else {
            throw new Error('Unexpected API response payload format.')
          }
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch repositories.')
        })
        .finally(() => {
          setLoading(false)
        })
    }, 3000)
  }

  useEffect(() => {
    fetchRepos()
  }, [username])

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const staticProjects = (profile && profile.projects) || []

  return (
    <section className="projects" style={{ padding: '20px 0' }}>
      <h2>Featured Projects</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Curated highlight of architectural and enterprise projects.
      </p>

      {staticProjects.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {staticProjects.map((project, index) => (
            <div key={index} className="repo-card">
              <h3 style={{ margin: '0 0 10px 0' }}>{project.title}</h3>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>
                {project.description}
              </p>
              <div style={{ marginBottom: '15px' }}>
                <strong>Tech Stack: </strong>
                <span style={{ fontSize: '13px', color: '#333' }}>
                  {(project.techStack || []).join(', ')}
                </span>
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
                >
                  Live Demo →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
        <h2 style={{ margin: 0 }}>Live GitHub Repositories</h2>
        <span style={{ fontSize: '13px', color: '#777' }}>
          API Source: <code>https://api.github.com/users/{username}/repos</code>
        </span>
      </div>

      {!loading && !error && (
        <>
          <input
            type="text"
            placeholder="Search repositories by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
            Showing {filteredRepos.length} of {repos.length} repositories
          </div>
        </>
      )}

      {loading && <Spinner message="Loading projects..." />}

      {error && <ErrorMessage message={error} onRetry={fetchRepos} />}

      {!loading && !error && <RepoList repos={filteredRepos} staticProjects={staticProjects} />}
    </section>
  )
}

export default Projects
