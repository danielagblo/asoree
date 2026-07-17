import React, { useState } from 'react'
import { api } from '../api'

interface AdminLoginProps {
  onLogin: () => void
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api.login(email, password)
      api.setAdminToken(data.token)
      onLogin()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', marginBottom: '8px' }}>Admin Login</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, fontSize: '14px' }}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '14px 18px', borderRadius: '30px', border: '1px solid var(--border-color)', fontSize: '14px', outline: 'none', background: '#f5f5f5' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, fontSize: '14px' }}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '14px 18px', borderRadius: '30px', border: '1px solid var(--border-color)', fontSize: '14px', outline: 'none', background: '#f5f5f5' }}
          />
        </div>

        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#ccc' : 'var(--accent-orange)',
            color: '#fff',
            border: 'none',
            padding: '14px',
            borderRadius: '30px',
            fontWeight: 700,
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
