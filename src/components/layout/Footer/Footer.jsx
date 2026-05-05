/* ============================================================
   Footer Component — PDFtool
   ============================================================ */

import { Link } from 'react-router-dom';
import './Footer.css';

const FOOTER_LINKS = {
  Conversions: [
    { label: 'PDF to Word', path: '/convert?source=pdf&target=docx' },
    { label: 'PDF to Image', path: '/convert?source=pdf&target=jpg' },
    { label: 'Word to PDF', path: '/convert?source=docx&target=pdf' },
    { label: 'Image to PDF', path: '/convert?source=jpg&target=pdf' },
  ],
  Features: [
    { label: 'Batch Convert', path: '/features' },
    { label: 'Merge PDFs', path: '/features' },
    { label: 'Compress', path: '/features' },
    { label: 'OCR', path: '/features' },
  ],
  Resources: [
    { label: 'API Docs', path: '/features' },
    { label: 'GitHub', path: 'https://github.com', external: true },
    { label: 'History', path: '/history' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <div className="navbar__logo" style={{ fontSize: '1.25rem' }}>
              <span className="navbar__logo-pdf">PDF</span>
              <span className="navbar__logo-tool">tool</span>
              <span className="navbar__logo-diamond" />
            </div>
            <p className="footer__brand-desc">
              Free, fast, and secure document conversion. Convert between 20+ format pathways
              with no sign-up required.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="footer__heading">{heading}</h4>
              <ul className="footer__links">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.path}
                        className="footer__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.path} className="footer__link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copy">
            © {new Date().getFullYear()} PDFtool — Open Source
          </span>
          <div className="footer__socials">
            <a
              href="https://github.com"
              className="footer__social"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* GitHub SVG icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.754-1.335-1.754-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
