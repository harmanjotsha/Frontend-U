import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userName] = useState('Student') // This will come from auth context later
  const [todayGoals] = useState([
    { id: 1, title: 'Complete Math Chapter 5', progress: 75, emoji: '📊' },
    { id: 2, title: 'English Reading Practice', progress: 45, emoji: '📚' },
    { id: 3, title: 'Science Quiz Preparation', progress: 90, emoji: '🧪' }
  ])
  const [recentProgress] = useState([
    { subject: 'Mathematics', score: 92, improvement: '+5', color: 'from-blue-500 to-cyan-500' },
    { subject: 'English', score: 88, improvement: '+8', color: 'from-purple-500 to-pink-500' },
    { subject: 'Science', score: 95, improvement: '+3', color: 'from-green-500 to-emerald-500' }
  ])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return { text: 'Good Morning', emoji: '🌅', color: 'from-orange-400 to-yellow-500' }
    if (hour < 17) return { text: 'Good Afternoon', emoji: '☀️', color: 'from-blue-400 to-indigo-500' }
    return { text: 'Good Evening', emoji: '🌙', color: 'from-purple-500 to-indigo-600' }
  }

  const greeting = getGreeting()

  const motivationalQuotes = [
    "Your potential is endless! 🌟",
    "Every small step leads to big achievements! 🚀",
    "Believe in yourself and all that you are! 💪",
    "Today is full of possibilities! ✨",
    "You are capable of amazing things! 🎯"
  ]

  const [dailyQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Animated Welcome Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-4 bg-gradient-to-r ${greeting.color} text-white px-8 py-4 rounded-3xl shadow-xl mb-6 animate-pulse`}>
              <span className="text-4xl">{greeting.emoji}</span>
              <div>
                <h1 className="text-3xl font-bold">{greeting.text}, {userName}!</h1>
                <p className="text-lg opacity-90">{currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            
            {/* Live Clock */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-indigo-100 max-w-md mx-auto mb-8">
              <div className="text-4xl font-mono font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {currentTime.toLocaleTimeString()}
              </div>
              <p className="text-gray-600 mt-2">Time to learn and grow! ⏰</p>
            </div>

            {/* Daily Motivation */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl shadow-xl max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
              <p className="text-xl font-semibold">{dailyQuote}</p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Today's Learning Goals - Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-indigo-100 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Today's Learning Goals
                </h2>
              </div>
              
              <div className="space-y-6">
                {todayGoals.map((goal) => (
                  <div key={goal.id} className="group bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.emoji}</span>
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                          {goal.title}
                        </h3>
                      </div>
                      <span className="text-2xl font-bold text-indigo-600">{goal.progress}%</span>
                    </div>
                    
                    {/* Animated Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out transform"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/app/dashboard" 
                className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span>View All Goals</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>

          {/* Recent Progress Summary - Right Column */}
          <div className="space-y-8">
            {/* Progress Summary */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
                  <span className="text-xl">📈</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Recent Progress
                </h3>
              </div>
              
              <div className="space-y-4">
                {recentProgress.map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{item.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-800">{item.score}%</span>
                        <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-1 rounded-full">
                          {item.improvement}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather-based Study Suggestion */}
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌤️</span>
                <h3 className="text-xl font-bold">Today's Study Tip</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">
                Perfect weather for focused learning! Try the 25-minute study technique with short breaks.
              </p>
              <div className="mt-4 bg-white/20 rounded-xl p-3">
                <p className="text-sm">💡 <strong>Tip:</strong> Natural light boosts concentration!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-indigo-100 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-2xl">
              <span className="text-2xl">⚡</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Quick Access
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/app/journal" className="group bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">📝</span>
              <span className="font-bold text-lg">Journal</span>
            </Link>
            
            <Link to="/app/emotion" className="group bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">🧠</span>
              <span className="font-bold text-lg">Emotions</span>
            </Link>
            
            <Link to="/app/community" className="group bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">🌟</span>
              <span className="font-bold text-lg">Community</span>
            </Link>
            
            <Link to="/app/dashboard" className="group bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">📊</span>
              <span className="font-bold text-lg">Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Upcoming Tasks/Assignments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-indigo-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2 rounded-xl">
                <span className="text-xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Upcoming Tasks
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                <span className="text-2xl">📝</span>
                <div>
                  <p className="font-semibold text-gray-800">Math Assignment</p>
                  <p className="text-sm text-gray-600">Due: Tomorrow</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <span className="text-2xl">🧪</span>
                <div>
                  <p className="font-semibold text-gray-800">Science Project</p>
                  <p className="text-sm text-gray-600">Due: Next Week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Achievement */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏆</span>
              <h3 className="text-2xl font-bold">Today's Achievement</h3>
            </div>
            
            <div className="bg-white/20 rounded-2xl p-4 mb-4">
              <p className="text-xl font-bold mb-2">Consistency Champion!</p>
              <p className="text-indigo-100">You've completed 5 days of learning streak! 🔥</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-indigo-200">Keep going!</span>
              <div className="flex gap-1">
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}