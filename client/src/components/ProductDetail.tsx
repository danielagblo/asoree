import React from 'react'
import type { Product } from '../App'
import { ImageWithFallback } from './ImageWithFallback'

interface ProductDetailProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  addToCart: (product: Product) => void
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, isOpen, onClose, addToCart }) => {
  if (!isOpen || !product) return null

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-detail-close" onClick={onClose}>×</button>
        <div className="product-detail-grid">
          <div className="product-detail-image-wrap">
            <ImageWithFallback src={product.image} alt={product.title} className="product-detail-image" />
          </div>
          <div className="product-detail-info">
            <span className="tag-pill solid">{product.category}</span>
            <h2 className="product-detail-title">{product.title}</h2>
            <div className="product-price-row" style={{ marginBottom: '20px' }}>
              <span className="price-del">${product.originalPrice.toFixed(2)}</span>
              <span className="price-ins" style={{ fontSize: '24px' }}>${product.price.toFixed(2)}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
              Premium Afrocentric tailoring crafted with care. This piece combines traditional craftsmanship with contemporary design for a distinctive look.
            </p>
            <button className="checkout-btn" onClick={() => { addToCart(product); onClose() }}>
              Add to Cart — ${product.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
