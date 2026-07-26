import React, { useState } from 'react'

function RepoList({ repos, staticProjects = [] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const reposPerPage = 5

  // Reset to page 1 whenever repos list updates (e.g. during searching)
  React.useEffect(() => {
    setCurrentPage(1)
  }, [repos])

  if (!repos || repos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
        No repositories found matching your query.
      </div>
    )
  }

  // Calculate indices for pagination
  const indexOfLastRepo = currentPage * reposPerPage
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo)
  const totalPages = Math.ceil(repos.length / reposPerPage)

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' }}>
        {currentRepos.map((repo) => {
          // Normalize comparison strings to match live repositories with static me.json projects
          const matchedProject = staticProjects.find((p) => {
            if (!p.repoUrl || !repo.html_url) return false
            const normPUrl = p.repoUrl.toLowerCase().replace(/\/$/, '').trim()
            const normRUrl = repo.html_url.toLowerCase().replace(/\/$/, '').trim()
            return normPUrl === normRUrl
          }) || staticProjects.find((p) => {
            if (!p.title || !repo.name) return false
            const normPTitle = p.title.toLowerCase().replace(/[^a-z0-9]/g, '')
            const normRName = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '')
            return normRName.includes(normPTitle) || normPTitle.includes(normRName)
          })

          // Extract descriptive content
          const finalDescription = matchedProject
            ? matchedProject.description
            : (repo.description || `Developer repository for ${repo.name}. built to deliver clean software solutions.`)

          // Extract tech stack metadata
          const finalTechStack = matchedProject
            ? matchedProject.techStack
            : (repo.language ? [repo.language] : ['Software'])

          return (
            <div key={repo.id || repo.name} className="repo-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', wordBreak: 'break-word' }}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0056b3', textDecoration: 'none' }}
                  >
                    {repo.name}
                  </a>
                </h3>
                {typeof repo.stargazers_count === 'number' && (
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#e3a008', display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '10px' }}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {repo.stargazers_count}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px', lineHeight: '1.4', minHeight: '40px' }}>
                {finalDescription}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '15px' }}>
                {finalTechStack.map((tech, idx) => (
                  <span key={idx} className="repo-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {idx === 0 && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                    )}
                    {tech}
                  </span>
                ))}
                {typeof repo.forks_count === 'number' && (
                  <span className="repo-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="18" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                      <line x1="6" y1="9" x2="6" y2="15" />
                    </svg>
                    {repo.forks_count}
                  </span>
                )}
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', fontSize: '14px', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}
              >
                View on GitHub →
              </a>
            </div>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '30px' }}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === 1 ? '#e9ecef' : '#0056b3',
              color: currentPage === 1 ? '#6c757d' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Prev
          </button>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === totalPages ? '#e9ecef' : '#0056b3',
              color: currentPage === totalPages ? '#6c757d' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Next
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default RepoList
