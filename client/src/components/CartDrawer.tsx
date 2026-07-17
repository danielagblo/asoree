import React from 'react'
import { ImageWithFallback } from './ImageWithFallback'

export interface Product {
  id: number
  title: string
  price: number
  originalPrice: number
  category: string
  image: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface CartDrawerProps {
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  cart: CartItem[]
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, delta: number) => void
  totalItemsCount: number
  subTotal: number
  onProceedToCheckout: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isCartOpen,
  setIsCartOpen,
  cart,
  removeFromCart,
  updateQuantity,
  totalItemsCount,
  subTotal,
  onProceedToCheckout
}) => {
  if (!isCartOpen) return null

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3 className="cart-title">Your Cart ({totalItemsCount})</h3>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <ImageWithFallback className="cart-item-img" src={item.product.image} alt={item.product.title} />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.product.title}</h4>
                  <p className="cart-item-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <div className="cart-qty-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.product.id, -1)}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={onProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
