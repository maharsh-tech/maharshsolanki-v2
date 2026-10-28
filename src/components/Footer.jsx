function Footer({ profile }) {
  const name = (profile && (profile.displayName || profile.name)) || 'Maharsh Solanki'
  return (
    <footer className="site-footer">
      <p>
        &copy; {new Date().getFullYear()} {name} &bull; Built with React, Vite &amp; Express REST API
      </p>
    </footer>
  )
}

export default Footer