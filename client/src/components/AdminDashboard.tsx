import React, { useState, useEffect } from 'react'
import { api } from '../api'
import type { Product } from '../App'

interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  mobile: string | null
  message: string
  createdAt: string
}

type Tab = 'products' | 'contacts'

const inputStyle: React.CSSProperties = {
  padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)',
  fontSize: '14px', outline: 'none', background: '#f5f5f5', width: '100%', boxSizing: 'border-box'
}

export const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<Tab>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState({ title: '', price: '', originalPrice: '', category: '', image: '' })

  useEffect(() => {
    loadProducts()
    if (tab === 'contacts') loadContacts()
  }, [tab])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await api.getProducts()
      setProducts(data)
    } catch { } finally {
      setLoading(false)
    }
  }

  const loadContacts = async () => {
    try {
      setLoading(true)
      const data = await api.getContacts()
      setContacts(data)
    } catch { } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({ title: '', price: '', originalPrice: '', category: '', image: '' })
    setEditingProduct(null)
    setShowForm(false)
  }

  const openEdit = (p: Product) => {
    setForm({ title: p.title, price: String(p.price), originalPrice: String(p.originalPrice), category: p.category, image: p.image })
    setEditingProduct(p)
    setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('price', form.price)
      fd.append('originalPrice', form.originalPrice)
      fd.append('category', form.category)
      fd.append('image', form.image)
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, fd)
      } else {
        await api.createProduct(fd)
      }
      resetForm()
      await loadProducts()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.deleteProduct(id)
      await loadProducts()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleLogout = () => {
    api.clearAdminToken()
    window.location.reload()
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '20px', padding: '8px 20px', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '30px' }}>
        {(['products', 'contacts'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 24px', borderRadius: '20px', border: 'none',
              background: tab === t ? 'var(--accent-orange)' : '#eee',
              color: tab === t ? '#fff' : '#333',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'capitalize'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'products' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            {!showForm && (
              <button onClick={() => setShowForm(true)} style={{ background: 'var(--accent-orange)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '20px', fontWeight: 600, cursor: 'pointer' }}>
                + New Product
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#fafafa', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Category</label>
                <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Price</label>
                <input required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Original Price</label>
                <input required type="number" step="0.01" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                <label style={{ fontWeight: 600, fontSize: '13px' }}>Image URL</label>
                <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={inputStyle} placeholder="https://..." />
              </div>
              <div style={{ display: 'flex', gap: '12px', gridColumn: '1 / -1', justifyContent: 'flex-end' }}>
                <button type="button" onClick={resetForm} style={{ background: '#eee', border: 'none', padding: '10px 24px', borderRadius: '20px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: 'var(--accent-orange)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '20px', fontWeight: 600, cursor: 'pointer' }}>
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {products.map((p) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 18px', background: '#fafafa', borderRadius: '12px' }}>
                  <img src={p.image} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '15px', margin: 0 }}>{p.title}</p>
                    <p style={{ fontSize: '13px', color: '#666', margin: '2px 0 0' }}>${p.price} · {p.category}</p>
                  </div>
                  <button onClick={() => openEdit(p)} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '20px', padding: '6px 16px', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: '1px solid #e00', borderRadius: '20px', padding: '6px 16px', cursor: 'pointer', fontSize: '13px', color: '#e00' }}>Delete</button>
                </div>
              ))}
              {products.length === 0 && <p style={{ color: '#999' }}>No products yet.</p>}
            </div>
          )}
        </div>
      )}

      {tab === 'contacts' && (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contacts.map((c) => (
                <div key={c.id} style={{ padding: '18px', background: '#fafafa', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <p style={{ fontWeight: 600, margin: 0 }}>{c.firstName} {c.lastName}</p>
                    <span style={{ fontSize: '12px', color: '#999' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 4px' }}>{c.email}{c.mobile ? ` · ${c.mobile}` : ''}</p>
                  <p style={{ fontSize: '14px', margin: '8px 0 0', lineHeight: '1.5' }}>{c.message}</p>
                </div>
              ))}
              {contacts.length === 0 && <p style={{ color: '#999' }}>No contact submissions yet.</p>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
