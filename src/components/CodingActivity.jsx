function CodingActivity({ darkMode }) {
  const themeParam = darkMode ? 'dark' : 'light'

  return (
    <section className="monolith-section" id="coding-activity" aria-label="Coding Activity">
      <div className="monolith-section-header">
        <h2 className="monolith-section-title">Coding Activity</h2>
        <p className="monolith-section-subtitle">
          Real-time GitHub contributions tracked from live commits and LeetCode progress.
        </p>
      </div>

      <div className="coding-activity-stack">
        {/* Card 1: GitHub Contribution Chart */}
        <article className="monolith-card coding-card">
          <div className="coding-card-header">
            <div className="coding-header-left">
              <div className="coding-icon-wrap github-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <div>
                <h3 className="coding-title">GitHub Contribution Chart</h3>
                <p className="coding-desc">Year-long live contribution timeline</p>
              </div>
            </div>

            <a
              href="https://github.com/maharsh-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="coding-link-btn"
            >
              <span>View GitHub</span>
              <span>&rarr;</span>
            </a>
          </div>

          <div className="chart-frame-box">
            <img
              src="https://ghchart.rshah.org/0066ff/maharsh-tech"
              alt="Maharsh Solanki's GitHub contributions chart"
              className="chart-img-responsive"
              loading="lazy"
            />
          </div>
        </article>

        {/* Card 2: LeetCode Progress */}
        <article className="monolith-card coding-card">
          <div className="coding-card-header">
            <div className="coding-header-left">
              <div className="coding-icon-wrap leetcode-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <h3 className="coding-title">LeetCode Progress</h3>
                <p className="coding-desc">Data structures, algorithms, and problem-solving metrics</p>
              </div>
            </div>

            <a
              href="https://leetcode.com/maharshsolanki"
              target="_blank"
              rel="noopener noreferrer"
              className="coding-link-btn"
            >
              <span>Visit LeetCode</span>
              <span>&rarr;</span>
            </a>
          </div>

          <div className="chart-frame-box">
            <img
              src={`https://leetcard.jacoblin.cool/maharshsolanki?theme=${themeParam}&font=Inter&ext=heatmap`}
              alt="Maharsh Solanki's LeetCode Stats"
              className="chart-img-responsive"
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </section>
  )
}

export default CodingActivity
