import React, { useState } from 'react'
import { api } from '../api'

export const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    message: ''
  })
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await api.submitContact(formData)
      setSubmitted(true)
      setFormData({ firstName: '', lastName: '', email: '', mobile: '', message: '' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const faqs = [
    {
      q: 'How do I know my size?',
      a: 'Refer to our size guide for exact measurements. Each garment is handmade, so slight variations may occur. Contact us for a personalised fitting consultation.'
    },
    {
      q: 'Can I return or exchange an item?',
      a: 'Yes, we accept returns on standard unworn items within 14 days of delivery. For our custom tailored collections, we offer free sizing adjustments to ensure your fit is perfect.'
    },
    {
      q: 'Do you offer free shipping?',
      a: 'We offer free DHL Express worldwide shipping on all premium orders over $250. Delivery generally takes 3 to 7 business days depending on your location.'
    },
    {
      q: 'How do I care for my clothes?',
      a: 'We highly recommend professional dry cleaning for all hand-woven Aso Oke fabrics, delicate linen shirts, and custom-dyed silk items to maintain color vibrancy and structural durability.'
    }
  ]

  return (
    <div style={{ position: 'relative', zIndex: 10, padding: '40px 0' }}>

      {/* 1. HERO SECTION (connect with us) */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '400px', alignItems: 'center', padding: '40px 0', borderBottom: '1px solid var(--border-color)', gap: '40px' }}>
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <span style={{ color: 'var(--accent-orange)', fontSize: '50px', fontWeight: '800', lineHeight: '0.8', fontFamily: 'sans-serif' }}>*</span>
            <h1 style={{ fontSize: '72px', fontWeight: '800', letterSpacing: '-2px', lineHeight: '0.9', margin: '0' }}>
              connect<br />with us
            </h1>
          </div>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginTop: '10px', maxWidth: '450px' }}>
            We would love to hear from you. Whether it is a custom order inquiry, styling advice, or general feedback — our team is ready to help.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
          <div className="badge-play-btn" style={{ width: '130px', height: '130px', marginRight: '40px' }}>
            <svg className="spin-slow badge-play-text" viewBox="0 0 100 100">
              <defs>
                <path id="circlePathContactHero" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fill="var(--text-secondary)" fontSize="8" fontWeight="600" letterSpacing="2.5">
                <textPath href="#circlePathContactHero">
                  WHERE YOUR WARDROBE MEETS ITS NEXT OBSESSION •
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

      {/* 2. BRAND CAROUSEL TICKER STRIP */}
      <section className="brand-carousel-container" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="brand-carousel-track">
          <div className="brand-logo">Ipsum</div>
          <div className="brand-logo">Logo</div>
          <div className="brand-logo">Logo</div>
          <div className="brand-logo">Logo</div>
          <div className="brand-logo">Logo</div>
        </div>
      </section>

      {/* 3. TEAM & FORM SECTION (connect with our team) */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '80px', textAlign: 'left', padding: '60px 0', borderBottom: '1px solid var(--border-color)' }}>

        {/* Left Column (Info block) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <span style={{ color: 'var(--accent-orange)', fontSize: '50px', fontWeight: '800', lineHeight: '0.8', fontFamily: 'sans-serif' }}>*</span>
              <h2 style={{ fontSize: '72px', fontWeight: '800', letterSpacing: '-2px', lineHeight: '0.9', margin: '0' }}>
                connect with<br />our team
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginTop: '24px', maxWidth: '420px' }}>
              Our team is dedicated to bringing your vision to life. Reach out for custom sizing, fabric consultations, or any questions about your order.
            </p>
          </div>

          {/* Details & Divider lines */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Phone */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '3px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0', color: '#121212' }}>Phone Number</h4>
                <p style={{ color: 'var(--accent-orange)', fontSize: '15px', fontWeight: '600', margin: 0 }}>
                  +234 800 555 0199
                </p>
              </div>
            </div>

            {/* Address */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '3px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0', color: '#121212' }}>Address</h4>
                <p style={{ color: 'var(--accent-orange)', fontSize: '15px', fontWeight: '600', margin: 0 }}>
                  49th St.Los Angeles, California
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '800', fontSize: '15px', color: '#121212' }}>Follow Us</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="#instagram" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#pinterest" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.091.377-.294 1.198-.334 1.363-.053.218-.176.265-.406.156-1.52-.707-2.47-2.932-2.47-4.717 0-3.839 2.79-7.365 8.044-7.365 4.223 0 7.503 3.011 7.503 7.029 0 4.195-2.645 7.569-6.316 7.569-1.233 0-2.393-.641-2.79-1.394 0 0-.61 2.324-.759 2.9c-.275 1.06-.5 2.12-.663 2.916C9.69 23.858 10.825 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
              <a href="#facebook" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (Form Block) */}
        <div>
          {submitted ? (
            <div style={{ background: '#fafafa', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 20px' }}>
                ✓
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>Form Submitted</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>We will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* First Name & Last Name inline */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', fontSize: '15px', color: '#121212' }}>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    style={{ background: '#f5f5f5', border: 'none', padding: '16px 24px', borderRadius: '30px', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', fontSize: '15px', color: '#121212' }}>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    style={{ background: '#f5f5f5', border: 'none', padding: '16px 24px', borderRadius: '30px', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', fontSize: '15px', color: '#121212' }}>
                  Email <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your official email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ background: '#f5f5f5', border: 'none', padding: '16px 24px', borderRadius: '30px', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              {/* Mobile */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', fontSize: '15px', color: '#121212' }}>Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  style={{ background: '#f5f5f5', border: 'none', padding: '16px 24px', borderRadius: '30px', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', fontSize: '15px', color: '#121212' }}>Message</label>
                <textarea
                  rows={6}
                  placeholder="Share why you are contacting"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ background: '#f5f5f5', border: 'none', padding: '20px 24px', borderRadius: '30px', fontSize: '14px', outline: 'none', resize: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              {/* Submit button on the right */}
              {error && (
                <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: submitting ? '#ccc' : 'var(--accent-orange)', color: '#fff', border: 'none', padding: '14px 48px', borderRadius: '30px', fontWeight: '700', fontSize: '16px', cursor: submitting ? 'not-allowed' : 'pointer', boxShadow: submitting ? 'none' : '0 4px 12px rgba(255, 106, 0, 0.2)' }}
                >
                  {submitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 4. ACCORDION FAQ SECTION (Need Help? We've Got Answers) */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>

        {/* Header Grid: Title Left, 02 / Subtitle Right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginBottom: '40px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <span style={{ color: 'var(--accent-orange)', fontSize: '50px', fontWeight: '800', lineHeight: '0.8', fontFamily: 'sans-serif' }}>*</span>
            <h2 style={{ fontSize: '72px', fontWeight: '800', letterSpacing: '-2px', lineHeight: '0.9', margin: '0' }}>
              Need Help? We’ve<br />Got Answers
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>02 /</div>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              From shipping and returns to sizing and care — find answers to the most common questions below.
            </p>
          </div>
        </div>

        {/* Accordion Item Boxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '18px 30px',
                    borderRadius: '40px',
                    background: isOpen ? 'var(--accent-orange)' : '#f2f2f2',
                    color: isOpen ? '#fff' : '#121212',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ fontSize: '18px', fontWeight: '400', margin: 0 }}>
                    {faq.q}
                  </h3>
                  <span style={{ fontSize: '24px', fontWeight: '400', lineHeight: '1' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <div style={{ padding: '24px 30px 10px', background: '#fff' }}>
                    <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. GOOGLE MAPS EMBED */}
      <section style={{ padding: '60px 0 0' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
          <iframe
            src="https://maps.google.com/maps?q=Miami%20Beach%2C%20FL%2C%20United%20States&t=m&z=12&output=embed&iwloc=near"
            title="Asoree Miami Showroom Location Map"
            aria-label="Asoree Miami Showroom Location Map"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  )
}
