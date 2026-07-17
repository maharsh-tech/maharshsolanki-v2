function Footer({ profile }) {
  const name = (profile && (profile.displayName || profile.name)) || 'Your Name'
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;