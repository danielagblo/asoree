import React from 'react'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <Link to="/" className="logo-wrap" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            <div className="logo-icon">A</div>
            <span>afroase<span className="logo-at">@</span></span>
          </Link>
          <p className="footer-desc">
            Premium Afrocentric fashion merging cultural heritage with contemporary high-fashion silhouettes.
          </p>
          <div className="footer-social">
            <a href="#instagram" className="social-link" aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#pinterest" className="social-link" aria-label="Pinterest">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.091.377-.294 1.198-.334 1.363-.053.218-.176.265-.406.156-1.52-.707-2.47-2.932-2.47-4.717 0-3.839 2.79-7.365 8.044-7.365 4.223 0 7.503 3.011 7.503 7.029 0 4.195-2.645 7.569-6.316 7.569-1.233 0-2.393-.641-2.79-1.394 0 0-.61 2.324-.759 2.9-.275 1.06-.5 2.12-.663 2.916C9.69 23.858 10.825 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </a>
            <a href="#facebook" className="social-link" aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/store" className="footer-link">Store</Link>
          <Link to="/about-us" className="footer-link">About Us</Link>
          <Link to="/pages" className="footer-link">Pages</Link>
          <Link to="/contact-us" className="footer-link">Contact Us</Link>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Categories</h4>
          <Link to="/store" className="footer-link">Dresses</Link>
          <Link to="/store" className="footer-link">Tops</Link>
          <Link to="/store" className="footer-link">Bottoms</Link>
          <Link to="/store" className="footer-link">New Arrivals</Link>
        </div>

        <div className="footer-newsletter-col">
          <h4 className="footer-col-title">Newsletter</h4>
          <p className="footer-desc" style={{ marginBottom: '16px' }}>
            Subscribe for exclusive drops, early access, and 10% off your first order.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="newsletter-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-text">&copy; {new Date().getFullYear()} Afroase. All rights reserved. Crafted with purpose. Designed by <a href="https://skytechghana.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>SkyTech Ghana</a>.</p>
      </div>
    </footer>
  )
}
