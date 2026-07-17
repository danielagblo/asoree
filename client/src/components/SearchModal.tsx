import React, { useState } from 'react'
import type { Product } from './ProductGrid'
import { ImageWithFallback } from './ImageWithFallback'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  products: Product[]
  addToCart: (product: Product) => void
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, products, addToCart }) => {
  const [query, setQuery] = useState('')

  if (!isOpen) return null

  const filtered = query.trim()
    ? products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="cart-close-btn" onClick={onClose}>×</button>
        </div>
        {query.trim() && (
          <div className="search-results">
            {filtered.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
                No products found
              </p>
            ) : (
              filtered.map((product) => (
                <div className="search-result-item" key={product.id}>
                  <ImageWithFallback src={product.image} alt={product.title} className="search-result-img" />
                  <div className="search-result-info">
                    <h4>{product.title}</h4>
                    <span className="price-ins">${product.price.toFixed(2)}</span>
                  </div>
                  <button className="circle-btn" onClick={() => { addToCart(product); onClose() }} title="Add to Cart">
                    <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
