import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('') // Clear previous messages
    
    try {
      // Use localhost:5000 for backend API
      const res = await axios.post('http://localhost:5000/api/auth/register', form)
      localStorage.setItem('udaan_token', res.data.token)
      setMsg('Registration successful! Redirecting to profile setup...')
      setTimeout(() => {
        window.location.href = '/onboarding'
      }, 1500)
    } catch (err) {
      console.error('Registration error:', err)
      if (err.response) {
        setMsg(err.response.data?.message || 'Registration failed')
      } else if (err.request) {
        setMsg('Unable to connect to server. Please make sure the backend is running.')
      } else {
        setMsg('Something went wrong. Please try again.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-indigo-300/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-pink-300/30 to-rose-400/30 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-16 left-16 w-12 h-12 border-2 border-indigo-300/40 rounded-2xl rotate-45 opacity-60 animate-spin" style={{animationDuration: '10s'}}></div>
        <div className="absolute bottom-16 right-16 w-8 h-8 border-2 border-purple-300/40 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute top-32 right-32 w-6 h-6 bg-gradient-to-br from-pink-400/60 to-rose-500/60 rounded-full animate-bounce"></div>
      </div>
      
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg w-full border border-indigo-100/50 transform hover:scale-105 transition-all duration-300">
          <div className="text-center mb-10">
            <Link to="/" className="group inline-block mb-6">
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                <span className="text-4xl relative z-10">✈️</span>
              </div>
            </Link>
            <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Join Udaan
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">Create an account to start your journey</p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <form onSubmit={submit} className="space-y-6">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-lg">👤</span>
                Name
              </label>
              <input 
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-gradient-to-r from-gray-50 to-indigo-50/30 group-hover:border-indigo-300"
                placeholder="Enter your full name ✨" 
                value={form.name} 
                onChange={e=>setForm({...form, name: e.target.value})}
                required
              />
            </div>
            
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-lg">📧</span>
                Email
              </label>
              <input 
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-gradient-to-r from-gray-50 to-indigo-50/30 group-hover:border-indigo-300"
                placeholder="your@email.com 💌" 
                type="email"
                value={form.email} 
                onChange={e=>setForm({...form, email: e.target.value})}
                required
              />
            </div>
            
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-lg">🔒</span>
                Password
              </label>
              <input 
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-gradient-to-r from-gray-50 to-indigo-50/30 group-hover:border-indigo-300"
                placeholder="Create a secure password 🛡️" 
                type="password" 
                value={form.password} 
                onChange={e=>setForm({...form, password: e.target.value})}
                required
                minLength="6"
              />
            </div>
            
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-lg">🎭</span>
                Who are you?
              </label>
              <select 
                value={form.role} 
                onChange={e=>setForm({...form, role: e.target.value})} 
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-gradient-to-r from-gray-50 to-indigo-50/30 group-hover:border-indigo-300 font-semibold"
              >
                <option value="student">🎓 Student</option>
                <option value="teacher">👨‍🏫 Teacher</option>
              </select>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl ${
                loading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span className="text-xl">🚀</span>
                    Create Account
                  </>
                )}
              </span>
            </button>
          </form>
          
          {msg && (
            <div className={`mt-6 p-4 rounded-2xl text-sm font-semibold ${
              msg.includes('successful') || msg.includes('Redirecting') 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {msg.includes('successful') ? '✅' : '❌'}
                </span>
                {msg}
              </div>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg">
              Already have an account? {' '}
              <Link to="/login" className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text hover:from-indigo-700 hover:to-purple-700 font-bold transition-all duration-300">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
