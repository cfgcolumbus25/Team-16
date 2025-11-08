const Footer = () => {
  return (
    <footer style={{
      backgroundImage: 'radial-gradient(circle,rgba(255, 203, 5, 1) 0%, rgba(255, 255, 255, 1) 100%)',
      color: 'inherit',
      padding: '30px 20px',
      marginTop: '40px'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ fontSize: '18px', fontWeight: '500' }}>
          CLEP College Finder
        </div>
        
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a 
            href="https://github.com/cfgcolumbus25/Team-16" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'inherit', textDecoration: 'none', fontSize: '15px' }}
          >
            GitHub
          </a>
          <a 
            href="https://clep.collegeboard.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'inherit', textDecoration: 'none', fontSize: '15px' }}
          >
            About CLEP
          </a>
        </div>

        <div style={{ fontSize: '14px', opacity: 0.9 }}>
          © 2025 Team 16
        </div>
      </div>
    </footer>
  );
};

export default Footer;
