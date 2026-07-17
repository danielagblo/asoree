import React from 'react'
import { ImageWithFallback } from './ImageWithFallback'

export const Hero: React.FC = () => {
  return (
    <section className="hero-container">
      <div className="hero-left">
        <h1 className="hero-title-main">where</h1>
        
        <div className="avatar-stack-wrap">
          <div className="avatar-stack">
            <ImageWithFallback className="avatar-img" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Avatar 1" />
            <ImageWithFallback className="avatar-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Avatar 2" />
            <ImageWithFallback className="avatar-img" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Avatar 3" />
            <div className="avatar-plus">+</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontWeight: '800', fontSize: '15px' }}>@2026</p>
            <p className="hero-subtitle">Handcrafted African fashion, tailored for the modern wardrobe</p>
          </div>
        </div>

        <div style={{ color: 'var(--accent-orange)' }}>
          <svg className="spin-slow" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          </svg>
        </div>
      </div>

      <div className="hero-center parallax-hero-img">
        <div className="hero-center-img-wrap">
          <ImageWithFallback 
            className="hero-center-img" 
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" 
            alt="Afroase Main Model" 
          />
        </div>
      </div>

      <div className="hero-right">
        <h2 className="hero-right-title">- a style begins</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="badge-play-btn">
            <svg className="spin-slow badge-play-text" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fill="var(--text-secondary)" fontSize="8.5" fontWeight="600" letterSpacing="2.5">
                <textPath href="#circlePath">
                  WHERE YOUR STYLE MEETS CULTURE •
                </textPath>
              </text>
            </svg>
            <div className="badge-play-icon-center">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                <path d="M0 0l14 8-14 8z" />
              </svg>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-number-wrap">
              <span className="stat-number">150K+</span>
              <div className="stat-arrow">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            <span className="stat-label">Wardrobes Transformed</span>
          </div>
        </div>
      </div>
    </section>
  )
}
