import React from 'react'
import { ImageWithFallback } from './ImageWithFallback'

export const AboutUs: React.FC = () => {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* Editorial Hero for About Us */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '450px', alignItems: 'center', padding: '40px 0', borderBottom: '1px solid var(--border-color)', gap: '40px' }}>
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="logo-icon" style={{ width: '40px', height: '40px', fontSize: '20px' }}>A</div>
            <h1 style={{ fontSize: '70px', fontWeight: '800', letterSpacing: '-2px', lineHeight: '0.9' }}>about-us</h1>
          </div>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '500px' }}>
            Afroase is a premium Afrocentric fashion brand founded by Michael Onyedika Ezirim. We merge cultural heritage with contemporary, high-fashion silhouettes to craft clothing that defines status and modern identity.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
          {/* Rotating badge representing "wardrobe meets next obsession" */}
          <div className="badge-play-btn" style={{ width: '130px', height: '130px', marginRight: '40px' }}>
            <svg className="spin-slow badge-play-text" viewBox="0 0 100 100">
              <defs>
                <path id="circlePathAbout" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fill="var(--text-secondary)" fontSize="8" fontWeight="600" letterSpacing="2.5">
                <textPath href="#circlePathAbout">
                  WHERE YOUR STYLE MEETS HERITAGE •
                </textPath>
              </text>
            </svg>
            <div className="badge-play-icon-center" style={{ width: '50px', height: '50px' }}>
              <svg width="16" height="18" viewBox="0 0 14 16" fill="currentColor">
                <path d="M0 0l14 8-14 8z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Brand logo carousel strip */}
      <section className="brand-carousel-container" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="brand-carousel-track">
          <div className="brand-logo">Ipsum</div>
          <div className="brand-logo">Logo</div>
          <div className="brand-logo">Logo</div>
          <div className="brand-logo">Logo</div>
          <div className="brand-logo">Logo</div>
        </div>
      </section>

      {/* Grid: Tags Row, 10M+ Trends metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', padding: '60px 0', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
        <div>
          <div className="tags-row" style={{ marginBottom: '20px' }}>
            <span className="tag-pill solid">#StyleUnlocked</span>
            <span className="tag-pill outline">#FitForNow</span>
          </div>
          <h2 style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' }}>
            10M+ trends discovered and owned daily
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
            From bold statement pieces to everyday premium staples, we've got everything you need to refresh your cultural style wardrobe.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div style={{ borderLeft: '3px solid var(--accent-orange)', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '48px', fontWeight: '800', color: 'var(--accent-orange)' }}>99%</h3>
            <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '5px 0' }}>Customer Satisfaction</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Loved globally for premium custom tailoring fits.</p>
          </div>
          <div style={{ borderLeft: '3px solid var(--accent-orange)', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '48px', fontWeight: '800', color: 'var(--accent-orange)' }}>24/7</h3>
            <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '5px 0' }}>Global Shipping</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Express DHL tracking straight to your delivery address.</p>
          </div>
        </div>
      </section>

      {/* Story detail section */}
      <section style={{ padding: '60px 0', textAlign: 'left' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: '800' }}>Inspired by Heritage, Styled for Today</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              We hand-pick raw linen, hand-woven Aso Oke fabrics, and custom-dyed silks. Every single order goes through a precise tailoring flow to ensure that when you step into style, you do so with confidence, authenticity, and maximum comfort.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              Redefining Afrocentric luxury means making zero compromises on quality, tailoring, or payments. Our goal is to bring modern African fashion to the forefront of global style.
            </p>
          </div>
          <div>
            <div style={{ width: '100%', aspectRatio: '4/3', background: '#eaeaea', borderRadius: '12px', overflow: 'hidden' }}>
              <ImageWithFallback 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" 
                alt="Afroase Linen Weaving" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
