import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('udaan_token')
    if (token) {
      setIsLoggedIn(true)
      // You could fetch user name here
      setUserName('Student') // Placeholder
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('udaan_token')
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`backdrop-blur-xl bg-white/95 shadow-2xl sticky top-0 z-50 transition-all duration-500 border-b border-indigo-100/50 ${
      isScrolled ? 'shadow-2xl bg-white/98 py-1' : 'shadow-xl py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-2xl shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              <span className="text-3xl relative z-10">✈️</span>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-black text-3xl tracking-wide">Udaan</span>
              <div className="text-sm text-gray-600 font-semibold tracking-wide">The Hidden Stars</div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/app/dashboard" 
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive('/app/dashboard') 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-105' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    <span className="text-lg">📊</span> 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Dashboard</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/app/journal" 
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive('/app/journal') 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-105' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    <span className="text-lg">📝</span> 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Journal</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/app/emotion" 
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive('/app/emotion') 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-105' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    <span className="text-lg">🧠</span> 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Emotions</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/app/community" 
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive('/app/community') 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-105' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    <span className="text-lg">🌟</span> 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Community</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                {/* Enhanced User Profile */}
                <div className="relative ml-6">
                  <button className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 border-2 border-gray-200 hover:border-indigo-300 px-5 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg font-bold text-white">👤</span>
                    </div>
                    <span className="text-gray-700 font-semibold text-lg group-hover:text-indigo-700 transition-colors duration-300">{userName}</span>
                  </button>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="ml-4 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <span>🚪</span>
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/" 
                  className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 group relative overflow-hidden ${
                    isActive('/') 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-105' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    <span className="text-lg">🏠</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/login" 
                  className="px-8 py-3 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 hover:from-indigo-200 hover:via-purple-100 hover:to-pink-100 border-2 border-indigo-200 hover:border-indigo-400 text-indigo-700 hover:text-indigo-800 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg group-hover:rotate-12 transition-transform duration-300">🔐</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Login</span>
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <button 
            className="md:hidden p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-7 h-7 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 pt-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-t-3xl mx-4 shadow-xl border-t-4 border-indigo-400">
            <div className="flex flex-col space-y-3 px-6">
              {isLoggedIn ? (
                <>
                  <Link to="/app/dashboard" className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl text-indigo-700 hover:bg-indigo-50 transition-all duration-300 font-semibold">
                    <span className="flex items-center gap-3">
                      <span className="text-xl">📊</span> Dashboard
                    </span>
                  </Link>
                  <Link to="/app/journal" className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl text-indigo-700 hover:bg-indigo-50 transition-all duration-300 font-semibold">
                    <span className="flex items-center gap-3">
                      <span className="text-xl">📝</span> Journal
                    </span>
                  </Link>
                  <Link to="/app/emotion" className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl text-indigo-700 hover:bg-indigo-50 transition-all duration-300 font-semibold">
                    <span className="flex items-center gap-3">
                      <span className="text-xl">🧠</span> Emotions
                    </span>
                  </Link>
                  <Link to="/app/community" className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl text-indigo-700 hover:bg-indigo-50 transition-all duration-300 font-semibold">
                    <span className="flex items-center gap-3">
                      <span className="text-xl">🌟</span> Community
                    </span>
                  </Link>
                  <button onClick={handleLogout} className="px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl">
                    <span className="flex items-center gap-3">
                      <span className="text-xl">🚪</span> Logout
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl text-indigo-700 hover:bg-indigo-50 transition-all duration-300 font-semibold">
                    <span className="flex items-center gap-3">
                      <span className="text-xl">🏠</span> Home
                    </span>
                  </Link>
                  <Link to="/login" className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl">
                    <span className="flex items-center gap-3">
                      <span className="text-xl">🔐</span> Login
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
