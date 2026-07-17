import React, { useState } from 'react'
import { ImageWithFallback } from './ImageWithFallback'
import { ScrollReveal } from './ScrollReveal'

export interface Product {
  id: number
  title: string
  price: number
  originalPrice: number
  category: string
  image: string
}

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  addToCart: (product: Product) => void
  onViewDetail: (product: Product) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, addToCart, onViewDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'Dresses', 'Bottoms', 'Tops']
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  if (loading) {
    return (
      <main style={{ position: 'relative', zIndex: 10, padding: '40px 0' }}>
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
          <div style={{
            border: '3px solid rgba(0,0,0,0.1)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            borderLeftColor: 'var(--accent-orange)',
            margin: '0 auto 16px',
            animation: 'spin-slow 1s linear infinite'
          }}></div>
          <p>Loading products...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={{ position: 'relative', zIndex: 10, padding: '40px 0' }}>
      <ScrollReveal direction="up">
        <div className="catalog-filter-row">
          <div style={{ display: 'flex', gap: '15px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`tag-pill ${selectedCategory === cat ? 'solid' : 'outline'}`}
                style={{
                  cursor: 'pointer',
                  border: '1px solid var(--accent-orange)',
                  background: selectedCategory === cat ? 'var(--accent-orange)' : 'transparent',
                  color: selectedCategory === cat ? '#fff' : 'var(--accent-orange)',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>
            Showing {filteredProducts.length} items
          </p>
        </div>
      </ScrollReveal>

      <div className="products-grid stagger-children">
        {filteredProducts.map((prod) => (
          <ScrollReveal key={prod.id} direction="up" threshold={0.1}>
            <div className="product-card" onClick={() => onViewDetail(prod)} style={{ cursor: 'pointer' }}>
              <div className="product-img-wrap">
                <ImageWithFallback className="product-img" src={prod.image} alt={prod.title} />
                <span className="sale-badge">Sale!</span>
                <button className="quick-add-btn" onClick={(e) => { e.stopPropagation(); addToCart(prod) }} title="Add to Cart">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="product-info">
                <h4 className="product-title">{prod.title}</h4>
                <div className="product-price-row">
                  <span className="price-del">${prod.originalPrice.toFixed(2)}</span>
                  <span className="price-ins">${prod.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </main>
  )
}
