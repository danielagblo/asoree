import React from 'react'

const brands = ['Aso Oke', 'Handwoven', 'Premium', 'Bespoke', 'Artisan']

export const BrandCarousel: React.FC = () => {
  return (
    <section className="brand-carousel-container">
      <div className="brand-carousel-track marquee-track">
        {[...brands, ...brands].map((brand, i) => (
          <div className="brand-logo" key={i}>{brand}</div>
        ))}
      </div>
    </section>
  )
}
