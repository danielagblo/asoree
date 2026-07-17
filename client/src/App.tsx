import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { BrandCarousel } from './components/BrandCarousel'
import { TrendsHeader } from './components/TrendsHeader'
import { AboutUs } from './components/AboutUs'
import { ContactUs } from './components/ContactUs'
import { ProductGrid } from './components/ProductGrid'
import { CartDrawer } from './components/CartDrawer'
import { CheckoutPortal } from './components/CheckoutPortal'
import { SearchModal } from './components/SearchModal'
import { ProductDetail } from './components/ProductDetail'
import { Footer } from './components/Footer'
import { AdminLogin } from './components/AdminLogin'
import { AdminDashboard } from './components/AdminDashboard'
import { ScrollReveal } from './components/ScrollReveal'
import { ParallaxSection } from './components/ParallaxSection'
import { api } from './api'

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

function AppContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  const location = useLocation()
  const currentRoute = location.pathname

  useEffect(() => {
    api.getProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setProductsLoading(false))
  }, [])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id)
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product)
    setIsDetailOpen(true)
  }

  const totalItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0)
  const subTotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)

  return (
    <>
      <div className="noire-grid-bg">
        <div className="noire-grid-column"></div>
        <div className="noire-grid-column"></div>
        <div className="noire-grid-column"></div>
        <div className="noire-grid-column"></div>
        <div className="noire-grid-column"></div>
      </div>

      {currentRoute !== '/admin' && (
        <Navbar
          currentRoute={currentRoute}
          setShowCheckout={setShowCheckout}
          totalItemsCount={totalItemsCount}
          setIsCartOpen={setIsCartOpen}
          onSearchClick={() => setIsSearchOpen(true)}
        />
      )}

      <main className="page-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <ParallaxSection speed={0.15}><ScrollReveal><Hero /></ScrollReveal></ParallaxSection>
                <ScrollReveal direction="left"><BrandCarousel /></ScrollReveal>
                <ScrollReveal direction="right"><TrendsHeader /></ScrollReveal>
                <ScrollReveal direction="none">
                  <ProductGrid products={products} loading={productsLoading} addToCart={addToCart} onViewDetail={handleViewDetail} />
                </ScrollReveal>
              </>
            } 
          />
          
          <Route 
            path="/home" 
            element={
              <>
                <ParallaxSection speed={0.15}><ScrollReveal><Hero /></ScrollReveal></ParallaxSection>
                <ScrollReveal direction="left"><BrandCarousel /></ScrollReveal>
                <ScrollReveal direction="right"><TrendsHeader /></ScrollReveal>
                <ScrollReveal direction="none">
                  <ProductGrid products={products} loading={productsLoading} addToCart={addToCart} onViewDetail={handleViewDetail} />
                </ScrollReveal>
              </>
            } 
          />

          <Route 
            path="/store" 
            element={
              <>
                <ScrollReveal>
                  <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '400px', alignItems: 'center', padding: '40px 0', borderBottom: '1px solid var(--border-color)', gap: '40px' }}>
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                        <h1 style={{ fontSize: '70px', fontWeight: '800', letterSpacing: '-2px', lineHeight: '0.9' }}>our store</h1>
                      </div>
                      <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '500px' }}>
                        Explore our full line of premium Afrocentric tailoring. Browse unique linen textures, hand-dyed silks, and traditional Aso Oke pants designed for custom luxury.
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                      <div className="badge-play-btn" style={{ width: '130px', height: '130px', marginRight: '40px' }}>
                        <svg className="spin-slow badge-play-text" viewBox="0 0 100 100">
                          <defs>
                            <path id="circlePathStore" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                          </defs>
                          <text fill="var(--text-secondary)" fontSize="8" fontWeight="600" letterSpacing="2.5">
                            <textPath href="#circlePathStore">
                              SHOP CULTURAL MEETS LUXURY OBSESSION •
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
                </ScrollReveal>

                <ScrollReveal direction="left"><BrandCarousel /></ScrollReveal>
                <ScrollReveal direction="right"><TrendsHeader /></ScrollReveal>
                <ScrollReveal direction="none">
                  <ProductGrid products={products} loading={productsLoading} addToCart={addToCart} onViewDetail={handleViewDetail} />
                </ScrollReveal>
              </>
            } 
          />

          <Route path="/about-us" element={<ScrollReveal><AboutUs /></ScrollReveal>} />
          <Route path="/contact-us" element={<ScrollReveal><ContactUs /></ScrollReveal>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      {currentRoute !== '/admin' && <Footer />}

      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalItemsCount={totalItemsCount}
        subTotal={subTotal}
        onProceedToCheckout={() => {
          setIsCartOpen(false)
          setShowCheckout(true)
        }}
      />

      <CheckoutPortal
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
        cart={cart}
        clearCart={clearCart}
        subTotal={subTotal}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        addToCart={addToCart}
      />

      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        addToCart={addToCart}
      />
    </>
  )
}

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(!!api.getAdminToken())
  return loggedIn ? <AdminDashboard /> : <AdminLogin onLogin={() => setLoggedIn(true)} />
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
