import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SuperpowerQuiz from '../components/SuperpowerQuiz'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Modern Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-10 blur-2xl animate-bounce"></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-10 blur-xl"></div>
          
          {/* Geometric patterns */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-indigo-200 rounded-2xl rotate-45 opacity-20"></div>
          <div className="absolute bottom-40 left-10 w-24 h-24 border-2 border-purple-200 rounded-full opacity-30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <span className="text-7xl">✈️</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
                Udaan
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-gray-600 mb-2 tracking-wide">
                The Hidden Stars
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-gray-800">A revolutionary platform</span> where you can express your emotions, learn, and grow. 
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                We're here to support you through every challenge.
              </span>
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                to="/register" 
                className="group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-12 py-5 rounded-2xl text-xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Started Free
                  <span className="text-2xl group-hover:rotate-12 group-hover:scale-125 transition-transform duration-500">🚀</span>
                </span>
              </Link>
            </div>
            
            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100 hover:border-indigo-200 transform hover:-translate-y-2">
                <div className="text-5xl font-black bg-gradient-to-br from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">1000+</div>
                <div className="text-gray-700 font-semibold text-lg">Students Empowered</div>
                <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mt-3 rounded-full"></div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-100 hover:border-purple-200 transform hover:-translate-y-2">
                <div className="text-5xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-gray-700 font-semibold text-lg">AI Assistance</div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 mt-3 rounded-full"></div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-green-100 hover:border-green-200 transform hover:-translate-y-2">
                <div className="text-5xl font-black bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-gray-700 font-semibold text-lg">Safe Environment</div>
                <div className="w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 mt-3 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-indigo-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-pink-300/20 to-rose-400/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-300/10 to-blue-400/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl mb-8 shadow-lg">
              <span className="text-2xl">✨</span>
              <span className="font-bold">Amazing Features</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 leading-tight">
              Discover Your Potential
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive platform offers everything you need to succeed in your educational journey
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 - Enhanced */}
            <div className="group relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100/50 hover:border-indigo-300/50 transform hover:-translate-y-4 hover:rotate-1">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-3xl"></div>
                
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <span className="text-4xl">🧠</span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-6 group-hover:text-indigo-700 transition-colors duration-300">
                  Emotion Recognition
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  Advanced AI that understands your emotional state and adapts learning content to match your mood and energy levels.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-indigo-600 font-bold text-lg group-hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                    Learn More <span className="ml-2 text-xl group-hover:rotate-45 transition-transform duration-300">→</span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-indigo-600 text-xl">⚡</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Enhanced */}
            <div className="group relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-100/50 hover:border-purple-300/50 transform hover:-translate-y-4 hover:-rotate-1">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-t-3xl"></div>
                
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <span className="text-4xl">📚</span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-6 group-hover:text-purple-700 transition-colors duration-300">
                  Personalized Learning
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  Customized curriculum that adapts to your learning style, pace, and individual needs for maximum educational impact.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-purple-600 font-bold text-lg group-hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                    Explore <span className="ml-2 text-xl group-hover:rotate-45 transition-transform duration-300">→</span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-purple-600 text-xl">🎯</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Enhanced */}
            <div className="group relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-green-100/50 hover:border-green-300/50 transform hover:-translate-y-4 hover:rotate-1">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl"></div>
                
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <span className="text-4xl">🤝</span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-6 group-hover:text-green-700 transition-colors duration-300">
                  Community Support
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  Connect with peers, mentors, and educators in a safe, supportive environment designed for growth and collaboration.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-600 font-bold text-lg group-hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                    Join Now <span className="ml-2 text-xl group-hover:rotate-45 transition-transform duration-300">→</span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-600 text-xl">🌟</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Feature Highlights */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Creative Tools</h4>
                <p className="text-sm text-gray-600">Express yourself</p>
              </div>
              
              <div className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Progress Tracking</h4>
                <p className="text-sm text-gray-600">Monitor growth</p>
              </div>
              
              <div className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🔒</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Safe Environment</h4>
                <p className="text-sm text-gray-600">Secure learning</p>
              </div>
              
              <div className="group text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Quiz Only */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who are already transforming their lives with our platform
          </p>
          
          {/* Interactive Superpower Quiz Only */}
          <SuperpowerQuiz />
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Safe & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Beautiful Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-rose-600/10 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-full blur-xl"></div>
          
          {/* Decorative patterns */}
          <div className="absolute top-16 left-16 w-16 h-16 border border-indigo-700/30 rounded-2xl rotate-45 opacity-40"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 border-2 border-purple-700/30 rounded-full opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Section - Brand & Description */}
            <div className="space-y-8">
              <div className="group">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                    <span className="text-4xl relative z-10">✈️</span>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      Udaan
                    </h3>
                    <p className="text-xl text-gray-400 font-semibold tracking-wide">The Hidden Stars</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed max-w-lg mb-8">
                  Empowering specially-abled students through innovative AI-powered learning and emotional intelligence platforms. 
                  <span className="text-indigo-400 font-semibold">Building dreams, one star at a time.</span>
                </p>
                
                {/* Enhanced Social Media */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">🌐</span>
                    Connect With Us
                  </h4>
                  <div className="flex space-x-4">
                    <a href="#" className="group bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📘</span>
                    </a>
                    <a href="#" className="group bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">�</span>
                    </a>
                    <a href="#" className="group bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📷</span>
                    </a>
                    <a href="#" className="group bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">💬</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-indigo-700/30 hover:border-indigo-600/50 transition-all duration-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <span className="text-2xl">📞</span>
                </div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Contact Information
                </h4>
              </div>
              
              <div className="space-y-6">
                <div className="group bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 border border-green-500/20 hover:border-green-400/40">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <span className="text-xl">📧</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white mb-1">Email Support</p>
                      <a href="mailto:support@udaan.com" className="text-green-400 hover:text-green-300 transition-colors font-semibold">
                        support@udaan.com
                      </a>
                      <p className="text-xs text-gray-400 mt-1">24/7 Email Assistance</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 border border-blue-500/20 hover:border-blue-400/40">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <span className="text-xl">📱</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white mb-1">Phone Support</p>
                      <a href="tel:+911234567890" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                        +91 12345 67890
                      </a>
                      <p className="text-xs text-gray-400 mt-1">Direct Phone Assistance</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <span className="text-xl">📍</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white mb-1">Visit Our Office</p>
                      <p className="text-purple-400 font-semibold">123 Education Street</p>
                      <p className="text-purple-400 font-semibold">New Delhi, India 110001</p>
                      <p className="text-xs text-gray-400 mt-1">Come Meet Our Team</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 border border-orange-500/20 hover:border-orange-400/40">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <span className="text-xl">⏰</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white mb-1">Support Hours</p>
                      <div className="space-y-1">
                        <p className="text-orange-400 font-semibold">Mon-Fri: 9:00 AM - 6:00 PM</p>
                        <p className="text-orange-400 font-semibold">Sat-Sun: 10:00 AM - 4:00 PM</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Emergency support via email 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Bottom Section */}
          <div className="border-t border-gradient-to-r from-transparent via-indigo-700/50 to-transparent mt-16 pt-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl p-6 backdrop-blur-sm border border-indigo-700/30 max-w-4xl mx-auto">
                <p className="text-lg text-gray-300 mb-2">
                  © 2025 <span className="font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Udaan - The Hidden Stars</span>. All rights reserved.
                </p>
                <p className="text-indigo-400 font-semibold flex items-center justify-center gap-2">
                  Made with <span className="text-red-400 text-xl animate-pulse">❤️</span> for specially-abled students.
                  <span className="text-yellow-400 text-xl">⭐</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}