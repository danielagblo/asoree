const API_BASE = 'http://localhost:3001/api'

const CART_TOKEN_KEY = 'asoree_cart_token'

function getCartToken(): string {
  let token = localStorage.getItem(CART_TOKEN_KEY)
  if (!token) {
    token = crypto.randomUUID()
    localStorage.setItem(CART_TOKEN_KEY, token)
  }
  return token
}

export const api = {
  base: API_BASE,

  // Products
  async getProducts(category?: string) {
    const params = category ? `?category=${encodeURIComponent(category)}` : ''
    const res = await fetch(`${API_BASE}/products${params}`)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },

  async getProduct(id: number) {
    const res = await fetch(`${API_BASE}/products/${id}`)
    if (!res.ok) throw new Error('Product not found')
    return res.json()
  },

  // Cart
  async getCart() {
    const token = getCartToken()
    const res = await fetch(`${API_BASE}/cart/${token}`)
    if (!res.ok) throw new Error('Failed to fetch cart')
    return res.json()
  },

  async addToCart(productId: number, quantity: number = 1) {
    const token = getCartToken()
    const res = await fetch(`${API_BASE}/cart/${token}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    })
    if (!res.ok) throw new Error('Failed to add item to cart')
    return res.json()
  },

  async removeCartItem(itemId: number) {
    const token = getCartToken()
    const res = await fetch(`${API_BASE}/cart/${token}/items/${itemId}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to remove item')
  },

  async clearCart() {
    const token = getCartToken()
    const res = await fetch(`${API_BASE}/cart/${token}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to clear cart')
  },

  // Orders
  async initializeOrder(data: {
    customerName: string
    email: string
    address: string
    items: { productId: number; quantity: number; price: number }[]
  }) {
    const res = await fetch(`${API_BASE}/orders/initialize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Failed to initialize order')
    }
    return res.json()
  },

  async verifyOrder(reference: string) {
    const res = await fetch(`${API_BASE}/orders/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Payment verification failed')
    }
    return res.json()
  },

  // Contact
  async submitContact(data: {
    firstName: string
    lastName: string
    email: string
    mobile?: string
    message: string
  }) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Failed to submit contact')
    }
    return res.json()
  },

  // Config
  async getConfig() {
    const res = await fetch(`${API_BASE}/config`)
    if (!res.ok) throw new Error('Failed to load config')
    return res.json()
  },
}
