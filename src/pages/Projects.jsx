import { useState, useEffect, useMemo, useCallback } from 'react'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

function Projects({ profile }) {
  const staticProjects = (profile && profile.projects) || []
  const username = (profile && profile.username) || 'maharsh-tech'

  // GitHub Repos API State
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6

  const fetchGithubRepos = useCallback(() => {
    setLoading(true)
    setError(null)

    // Check sessionStorage cache first to prevent hitting GitHub 60-req/hour rate limits
    const cacheKey = `gh_repos_${username}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRepos(parsed)
          setLoading(false)
          return
        }
      } catch {
        sessionStorage.removeItem(cacheKey)
      }
    }

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please wait a few moments or review featured projects.')
          }
          throw new Error(`GitHub API error: status ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Unexpected GitHub payload structure.')
        }
        setRepos(data)
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(data))
        } catch {
          // ignore quota
        }
      })
      .catch((err) => {
        setError(err.message || 'Unable to retrieve GitHub repositories.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [username])

  useEffect(() => {
    fetchGithubRepos()
  }, [fetchGithubRepos])

  // Filtered repositories based on search
  const filteredRepos = useMemo(() => {
    if (!search.trim()) return repos
    const q = search.toLowerCase()
    return repos.filter((r) => 
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.language && r.language.toLowerCase().includes(q))
    )
  }, [repos, search])

  // Pagination calculation
  const totalPages = Math.ceil(filteredRepos.length / perPage) || 1
  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return filteredRepos.slice(start, start + perPage)
  }, [filteredRepos, currentPage, perPage])

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="projects-view">
      {/* SECTION 1: Curated Featured Projects from Resume */}
      <section className="monolith-section" id="featured-projects" aria-label="Featured Projects">
        <div className="monolith-section-header">
          <h1 className="monolith-section-title">Featured Projects</h1>
          <p className="monolith-section-subtitle">
            Curated architectural systems from resume &bull; Spring Boot, FastAPI, Cloud pipelines, and MERN stack.
          </p>
        </div>

        {staticProjects.length > 0 ? (
          <div className="projects-grid">
            {staticProjects.map((project, index) => (
              <article key={project.id || project.title} className="monolith-card project-monolith-card">
                <div className="project-card-header">
                  <span className="project-card-id">Featured System 0{index + 1}</span>
                </div>

                <h2 className="project-title-large">{project.title}</h2>
                <p className="project-desc-text">{project.description}</p>

                {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                  <div className="project-metrics-wrap">
                    {project.metrics.map((metric, idx) => (
                      <span key={idx} className="project-metric-pill">
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                  <div className="project-tech-row">
                    <span className="tech-row-label">Tech Stack:</span>
                    <div className="project-tech-tags">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="tech-tag-monolith">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="project-card-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-monolith-link"
                    >
                      <span>Live Platform</span>
                      <span className="link-arrow">&rarr;</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-monolith-link secondary"
                    >
                      <span>Source Code</span>
                      <span className="link-arrow">&rarr;</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="monolith-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>No featured systems found.</p>
          </div>
        )}
      </section>

      {/* SECTION 2: Live GitHub Repositories with Pagination */}
      <section className="monolith-section" id="github-repositories" aria-label="GitHub Repositories" style={{ marginTop: '3.5rem' }}>
        <div className="monolith-section-header">
          <h2 className="monolith-section-title">Public Repositories</h2>
          <p className="monolith-section-subtitle">
            Live public repositories queried directly from GitHub REST API (@{username}).
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="repo-controls-bar">
          <div className="repo-search-wrap">
            <input
              type="text"
              className="search-input-monolith"
              value={search}
              onChange={handleSearchChange}
              placeholder="Filter repositories by name, language, or topic..."
              aria-label="Filter repositories"
            />
            {search && (
              <button
                type="button"
                className="btn-clear-search"
                onClick={() => { setSearch(''); setCurrentPage(1); }}
                aria-label="Clear filter"
              >
                &times;
              </button>
            )}
          </div>
          <div className="repo-count-indicator">
            {filteredRepos.length} Repositories
          </div>
        </div>

        {/* Loading State */}
        {loading && <Spinner message="Fetching repositories from GitHub API..." />}

        {/* Error State with Retry */}
        {error && !loading && (
          <ErrorMessage
            title="GitHub API Connection Notice"
            message={error}
            onRetry={fetchGithubRepos}
          />
        )}

        {/* Repos Grid */}
        {!loading && !error && paginatedRepos.length > 0 && (
          <>
            <div className="github-repos-grid">
              {paginatedRepos.map((repo) => (
                <article key={repo.id} className="monolith-card gh-repo-card">
                  <div className="gh-card-top">
                    <span className="gh-repo-name" title={repo.name}>
                      {repo.name}
                    </span>
                    {repo.language && (
                      <span className="gh-lang-badge">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <p className="gh-repo-desc">
                    {repo.description || 'No description provided for this repository.'}
                  </p>

                  <div className="gh-meta-row">
                    <div className="gh-stats-group">
                      <span className="gh-stat" title="Stars">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>{repo.stargazers_count || 0}</span>
                      </span>
                      <span className="gh-stat" title="Forks">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="6" y1="3" x2="6" y2="15" />
                          <circle cx="18" cy="6" r="3" />
                          <circle cx="6" cy="18" r="3" />
                          <path d="M18 9a9 9 0 0 1-9 9" />
                        </svg>
                        <span>{repo.forks_count || 0}</span>
                      </span>
                    </div>

                    {repo.updated_at && (
                      <span className="gh-updated-date">
                        Updated {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>

                  <div className="gh-card-footer">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-monolith-link"
                    >
                      <span>View on GitHub</span>
                      <span className="link-arrow">&rarr;</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-bar" aria-label="Repository pagination">
                <div className="pagination-info">
                  Page {currentPage} of {totalPages} &bull; Showing {((currentPage - 1) * perPage) + 1}&ndash;{Math.min(currentPage * perPage, filteredRepos.length)} of {filteredRepos.length}
                </div>

                <div className="pagination-buttons">
                  <button
                    type="button"
                    className="btn-page-nav"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &larr; Previous
                  </button>

                  <div className="page-numbers-group">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        className={`btn-page-number${pageNum === currentPage ? ' active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                        aria-label={`Go to page ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn-page-nav"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!loading && !error && paginatedRepos.length === 0 && (
          <div className="monolith-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
              No repositories matched &ldquo;{search}&rdquo;.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Projects
