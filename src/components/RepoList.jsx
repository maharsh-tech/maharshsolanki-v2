import React from 'react'

function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
        No repositories found matching your query.
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' }}>
      {repos.map((repo) => (
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
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#e3a008', whitespace: 'nowrap', marginLeft: '10px' }}>
                ⭐ {repo.stargazers_count}
              </span>
            )}
          </div>

          <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px', lineHeight: '1.4', minHeight: '40px' }}>
            {repo.description || 'No description provided.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '15px' }}>
            {repo.language && (
              <span className="repo-badge">
                🛠️ {repo.language}
              </span>
            )}
            {typeof repo.forks_count === 'number' && (
              <span className="repo-badge">
                🍴 {repo.forks_count}
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
      ))}
    </div>
  )
}

export default RepoList
