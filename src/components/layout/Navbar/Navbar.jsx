import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/convert', label: 'Convert' },
  { path: '/batch', label: 'Batch Tools' },
  { path: '/features', label: 'Features' },
  { path: '/api-docs', label: 'API' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMobile}>
          <span className="navbar__logo-pdf">PDF</span>
          <span className="navbar__logo-tool">tool</span>
          <span className="navbar__logo-diamond" />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav-wrapper">
          <ul className="navbar__nav">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar__link ${
                    location.pathname === link.path ? 'navbar__link--active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            className="navbar__cta-premium"
            onClick={() => navigate('/convert')}
          >
            Get Started
          </button>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar__mobile-link ${
              location.pathname === link.path ? 'navbar__mobile-link--active' : ''
            }`}
            onClick={closeMobile}
          >
            {link.label}
          </Link>
        ))}
        <button
          className="navbar__cta-premium"
          style={{ marginTop: 'auto', width: '100%', borderRadius: '8px' }}
          onClick={() => {
            navigate('/convert');
            closeMobile();
          }}
        >
          Get Started
        </button>
      </div>
    </>
  );
}
