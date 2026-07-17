import React, { useState } from 'react'

const TOTAL_SLIDES = 4

export const TrendsHeader: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1)

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? TOTAL_SLIDES : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === TOTAL_SLIDES ? 1 : prev + 1))
  }

  return (
    <section className="collections-header">
      <div>
        <div className="tags-row">
          <span className="tag-pill solid">#StyleUnlocked</span>
          <span className="tag-pill outline">#FitForNow</span>
        </div>
        <h2 className="section-title">10M+ trends discovered and owned daily</h2>
      </div>

      <div className="slider-controls">
        <span className="slider-count">{String(currentSlide).padStart(2, '0')} / {String(TOTAL_SLIDES).padStart(2, '0')}</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="arrow-btn" onClick={prevSlide}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button className="arrow-btn" style={{ background: 'var(--accent-orange)', color: '#fff', borderColor: 'var(--accent-orange)' }} onClick={nextSlide}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
