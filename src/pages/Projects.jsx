function Projects() {
  const projects = [
    {
      title: 'FalixMovies',
      description: 'Full-stack movie browsing and streaming platform deployed on AWS, capable of handling rich media and high-volume user interactions at scale. Cloud-based content pipeline using AWS S3 and PyroGram for streaming.',
      techStack: ['React', 'FastAPI', 'MongoDB', 'AWS', 'PyroGram'],
      liveUrl: 'https://falixmovies.com'
    },
    {
      title: 'AskOrg AI',
      description: 'AI-powered enterprise assistant for intelligent document retrieval and extraction of actionable insights from recorded meetings. Built with a RAG pipeline using ChromaDB as the vector store, centralizing organizational knowledge into a searchable system.',
      techStack: ['React', 'FastAPI', 'Python', 'ChromaDB', 'RAG']
    },
    {
      title: 'RAG API with FastAPI',
      description: 'Production-ready REST API enabling natural language Q&A over user-uploaded documents using local large language models and ChromaDB vector search. Includes document Ingestion, chunking, and embedding pipeline.',
      techStack: ['Python', 'FastAPI', 'ChromaDB', 'LLMs', 'Vector Search'],
      liveUrl: 'https://maharshsolanki.netlify.app/rag-api-maharsh'
    },
    {
      title: 'ServEase',
      description: 'Full-stack service marketplace connecting users with domestic help providers, featuring Firebase Auth for secure onboarding and Spring Boot REST APIs for service booking workflows. Designed with a normalized PostgreSQL schema.',
      techStack: ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'Firebase Auth']
    },
    {
      title: 'HRMS Portal',
      description: 'Centralized HR management system built on the MERN stack with role-based access control, real-time attendance logging, and admin dashboards for workforce oversight. Automated employee onboarding and HR workflows.',
      techStack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      liveUrl: 'https://dayflow-brown.vercel.app/'
    }
  ]

  return (
    <section className="projects" style={{ padding: '20px 0' }}>
      <h2>My Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' }}>
        {projects.map((project, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{project.title}</h3>
            <p style={{ fontSize: '15px', color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>
              {project.description}
            </p>
            <div style={{ marginBottom: '15px' }}>
              <strong>Tech Stack: </strong>
              <span style={{ fontSize: '14px', color: '#333' }}>
                {project.techStack.join(', ')}
              </span>
            </div>
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-block', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Live Link →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
