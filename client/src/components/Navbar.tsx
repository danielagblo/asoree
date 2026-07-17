import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  currentRoute: string
  setShowCheckout: (show: boolean) => void
  totalItemsCount: number
  setIsCartOpen: (open: boolean) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  setShowCheckout,
  totalItemsCount,
  setIsCartOpen
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setShowCheckout(false)
    setIsMobileMenuOpen(false)
  }

  // Maps display names to their clean pathname routes
  const routesMap = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Store', path: '/store' },
    { name: 'Contact Us', path: '/contact-us' }
  ]

  const isRouteActive = (path: string) => {
    if (path === '/') {
      return currentRoute === '/' || currentRoute === '/home' || currentRoute === ''
    }
    return currentRoute === path
  }

  return (
    <header className="nav-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#fff' }}>
      <Link 
        to="/" 
        className="logo-wrap" 
        onClick={handleLinkClick}
      >
        <div className="logo-icon">A</div>
        <span>afroase<span className="logo-at">@</span></span>
      </Link>

      {/* Desktop Links */}
      <ul className="nav-links desktop-only">
        {routesMap.map((route) => (
          <li key={route.name}>
            <Link
              to={route.path}
              className={`nav-link ${isRouteActive(route.path) ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {/* Hamburger Menu Toggle Button matching the square box [ ≡ ] / [ x ] style exactly */}
        <button 
          className="hamburger-btn mobile-only" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            padding: '0',
            marginRight: '10px'
          }}
        >
          {isMobileMenuOpen ? (
            // Close "X" icon inside square box
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Hamburger menu icon inside square box
            <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="3" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <button className="circle-btn search-icon-btn">
          <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        <button className="circle-btn cart-icon-btn" onClick={() => setIsCartOpen(true)} style={{ position: 'relative' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {totalItemsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#121212',
              color: '#fff',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '11px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Links Dropdown Menu inside header context without mobile-only class override conflicts */}
      {isMobileMenuOpen && (
        <nav className="mobile-menu" style={{ zIndex: 10000 }}>
          <ul>
            {routesMap.map((route) => (
              <li key={route.name} className={isRouteActive(route.path) ? 'active-item' : ''}>
                <Link
                  to={route.path}
                  onClick={handleLinkClick}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
