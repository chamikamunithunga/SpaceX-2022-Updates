import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: '#111318',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#ffc800',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(255, 200, 0, 0.3)',
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: '700',
          fontSize: '1.25rem',
          color: '#ffc800',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          transition: 'color 0.3s ease',
          userSelect: 'none',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff16e')}
        onMouseLeave={e => (e.currentTarget.style.color = '#ffc800')}
      >
        SpaceX Tracker
      </Link>
    </nav>
  );
}

export default Navbar;
