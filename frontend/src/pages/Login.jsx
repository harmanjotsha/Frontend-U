import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password })
      localStorage.setItem('udaan_token', res.data.token)
      setMsg('Login successful! Redirecting to dashboard...')
      
      // Check if user has completed profile
      const userRes = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${res.data.token}` }
      })
      
      setTimeout(() => {
        if (userRes.data.profile_completed) {
          window.location.href = '/app/dashboard'
        } else {
          window.location.href = '/onboarding'
        }
      }, 1500)
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl mb-4 inline-block">✈️</Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Login to your Udaan account</p>
        </div>
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="your@email.com" 
              type="email"
              value={email} 
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Your password" 
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white p-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Logging in...' : '🚀 Login'}
          </button>
        </form>
        
        {msg && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            msg.includes('सफल') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {msg}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            New user? {' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Create Account
            </Link>
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:underline">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
