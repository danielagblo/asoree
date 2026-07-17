import React from 'react'
import { ImageWithFallback } from './ImageWithFallback'

export const AboutUs: React.FC = () => {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* Editorial Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '450px', alignItems: 'center', padding: '40px 0', borderBottom: '1px solid var(--border-color)', gap: '40px' }}>
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

            <h1 style={{ fontSize: '70px', fontWeight: '800', letterSpacing: '-2px', lineHeight: '0.9' }}>about-us</h1>
          </div>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '500px' }}>
            Asoree is a premium Afrocentric fashion brand founded by Michael Onyedika Ezirim. We merge cultural heritage with contemporary, high-fashion silhouettes to craft clothing that defines status and modern identity.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
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

      {/* Brand carousel */}
      <section className="brand-carousel-container" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="brand-carousel-track marquee-track">
          {['Heritage', 'Craft', 'Bold', 'Identity', 'Culture', 'Heritage', 'Craft', 'Bold', 'Identity', 'Culture'].map((w, i) => (
            <div className="brand-logo" key={i}>{w}</div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', padding: '60px 0', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
        <div>
          <div className="tags-row" style={{ marginBottom: '20px' }}>
            <span className="tag-pill solid">#StyleUnlocked</span>
            <span className="tag-pill outline">#FitForNow</span>
          </div>
          <h2 style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' }}>
            Redefining Men's Fashion, One Piece at a Time
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
            From bold statement pieces to everyday premium staples, we craft clothing that lets you express yourself without limits.
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

      {/* Founder story */}
      <section style={{ padding: '60px 0', textAlign: 'left' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: '800' }}>From Lagos Streets to Global Runways</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              I grew up in stark poverty in Lagos, Nigeria. As I entered adulthood, I needed a way to survive—and fashion became my gateway. In Nigeria, clothing and self-expression are not just style choices; they are a vital part of identity and culture.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              I was drawn to male fashion modeling, which opened doors I had never imagined. Modeling allowed me to pay for my education and revealed the wider possibilities of fashion. That led me to study fashion design—determined to move from wearing clothes to creating them.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              After university, when job opportunities were scarce, I committed to designing full time. I began with women's clothing, but soon realised the world of men's fashion was lacking creativity, flair, and full expression. So I turned my focus to men's design—driven by the belief that men, too, deserve bold, imaginative, and empowering pieces.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              This brand is the result of that journey. It is a reflection of resilience, creativity, and the drive to break boundaries. Through my designs, I want to redefine men's fashion—offering a space where style meets self-expression without limits.
            </p>
          </div>
          <div>
            <div style={{ width: '100%', aspectRatio: '4/3', background: '#eaeaea', borderRadius: '12px', overflow: 'hidden' }}>
              <ImageWithFallback
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
                alt="Asoree craftsmanship"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video section */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>Our Story in Motion</span>
            <h3 style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.15', margin: 0, fontFamily: 'var(--font-serif)' }}>
              From Lagos to the World
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
              Every stitch tells a story of resilience, heritage, and the relentless pursuit of excellence. Watch the journey behind Asoree — where tradition meets the avant-garde.
            </p>
          </div>
          <div style={{
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#000',
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
          }}>
            <video
              src="/WhatsApp-Video-2025-01-16-at-22.20.25.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', display: 'block', maxHeight: '450px', objectFit: 'cover' }}
            >
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      </section>
    </div>
  )
}
