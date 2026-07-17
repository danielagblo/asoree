import React, { useState, useEffect } from 'react'
import { api } from '../api'

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

interface CheckoutPortalProps {
  showCheckout: boolean
  setShowCheckout: (show: boolean) => void
  cart: CartItem[]
  subTotal: number
  clearCart: () => void
}

declare global {
  interface Window {
    PaystackPop: any
  }
}

export const CheckoutPortal: React.FC<CheckoutPortalProps> = ({
  showCheckout,
  setShowCheckout,
  cart,
  subTotal,
  clearCart
}) => {
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form')
  const [paystackKey, setPaystackKey] = useState('')
  const [error, setError] = useState('')

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (showCheckout) {
      api.getConfig()
        .then((data) => setPaystackKey(data.paystackPublicKey))
        .catch(() => setError('Failed to load payment config'))
    }
  }, [showCheckout])

  if (!showCheckout) return null

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStep('processing')
    setError('')

    try {
      const items = cart.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        price: i.product.price,
      }))

      const data = await api.initializeOrder({ customerName: name, email, address, items })

      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email,
        amount: Math.round(subTotal * 100),
        ref: data.reference,
        onClose: () => {
          setPaymentStep('form')
        },
        callback: async (response: any) => {
          try {
            await api.verifyOrder(response.reference)
            clearCart()
            setPaymentStep('success')
          } catch (err: any) {
            setError(err.message || 'Payment verification failed')
            setPaymentStep('form')
          }
        },
      })

      handler.openIframe()
    } catch (err: any) {
      setError(err.message)
      setPaymentStep('form')
    }
  }

  return (
    <div className="checkout-overlay">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto 40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
        <div className="logo-wrap">
          <div className="logo-icon">A</div>
          <span>afroase<span className="logo-at">@</span></span>
        </div>
        <button className="arrow-btn" onClick={() => setShowCheckout(false)}>
          Back to Store
        </button>
      </div>

      {paymentStep === 'form' && (
        <div className="checkout-container">
          <div>
            <h2 className="checkout-title">Billing & Delivery Details</h2>
            {error && (
              <p style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>{error}</p>
            )}
            <form onSubmit={handleCheckoutSubmit}>
              <div className="form-group">
                <label className="form-label">Contact Email</label>
                <input className="form-input" type="email" required placeholder="alex@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              
              <div className="form-group">
                <label className="form-label">Recipient Name</label>
                <input className="form-input" type="text" required placeholder="Alex Ezirim" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <input className="form-input" type="text" required placeholder="12 Fashion Avenue, Suite 100" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '20px 0' }}>
                You will be redirected to Paystack's secure checkout to complete your payment. No card details are stored on our servers.
              </p>

              <button className="checkout-btn" type="submit">
                Proceed to Paystack (${subTotal.toFixed(2)})
              </button>
            </form>
          </div>

          <div className="checkout-right">
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textAlign: 'left' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cart.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px' }}>
                  <span style={{ textAlign: 'left' }}>{item.product.title} (x{item.quantity})</span>
                  <span style={{ fontWeight: '700' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800' }}>
                <span>Total Amount</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentStep === 'processing' && (
        <div style={{ textAlign: 'center', marginTop: '150px' }}>
          <div style={{
            border: '4px solid rgba(0,0,0,0.1)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            borderLeftColor: 'var(--accent-orange)',
            margin: '0 auto 20px',
            animation: 'spin-slow 1s linear infinite'
          }}></div>
          <h2>Redirecting to Paystack...</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Please complete your payment in the popup</p>
        </div>
      )}

      {paymentStep === 'success' && (
        <div className="payment-success">
          <div className="success-icon-wrap">✓</div>
          <h2>Payment Confirmed!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Thank you for your purchase, <strong>{name}</strong>! Your order confirmation has been sent to <strong>{email}</strong>. We'll start crafting your outfits and ship them to <strong>{address}</strong> soon.
          </p>
          <button className="checkout-btn" style={{ maxWidth: '250px', marginTop: '20px' }} onClick={() => setShowCheckout(false)}>
            Back to Home
          </button>
        </div>
      )}
    </div>
  )
}
