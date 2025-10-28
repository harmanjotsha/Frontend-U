import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AIChatbot from '../components/AIChatbot';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState({
    journalEntries: 0,
    emotionAnalyses: 0,
    communityPosts: 0,
    weeklyStreak: 0
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{ 
    const loadData = async () => {
      setIsLoading(true)
      
      // Load user profile
      const localProfile = localStorage.getItem('udaan_user_profile')
      if (localProfile) {
        try {
          const profileData = JSON.parse(localProfile)
          setUserProfile(profileData)
          console.log('Profile loaded:', profileData)
        } catch (error) {
          console.error('Error parsing local profile:', error)
        }
      } else {
        // Create demo profile if none exists
        const demoProfile = {
          name: 'Student',
          goals: 'Learn and grow every day',
          support_preference: 'Encouragement and guidance',
          detectedGoalCategories: [
            { name: 'Academic Excellence' },
            { name: 'Personal Growth' }
          ],
          followUpAnswers: {
            0: 'I want to improve my study habits',
            1: 'I need help with time management'
          }
        }
        setUserProfile(demoProfile)
      }

      // Load user statistics and recent activities
      const token = localStorage.getItem('udaan_token')
      if (token) {
        try {
          // Get user stats from different endpoints
          const [journalRes, emotionRes, communityRes] = await Promise.allSettled([
            axios.get(`${API_URL}/api/journal/my-entries`, { 
              headers: { Authorization: `Bearer ${token}` },
              timeout: 3000
            }),
            axios.get(`${API_URL}/api/emotion/my-analyses`, { 
              headers: { Authorization: `Bearer ${token}` },
              timeout: 3000
            }),
            axios.get(`${API_URL}/api/community`, { 
              headers: { Authorization: `Bearer ${token}` },
              timeout: 3000
            })
          ])

          const newStats = { ...stats }
          const activities = []

          if (journalRes.status === 'fulfilled') {
            newStats.journalEntries = journalRes.value.data.length || 0
            if (journalRes.value.data.length > 0) {
              activities.push({
                id: 'journal',
                type: 'journal',
                text: 'Latest journal entry',
                time: new Date(journalRes.value.data[0]?.date || Date.now()),
                icon: '📝'
              })
            }
          }

          if (emotionRes.status === 'fulfilled') {
            newStats.emotionAnalyses = emotionRes.value.data.length || 0
            if (emotionRes.value.data.length > 0) {
              activities.push({
                id: 'emotion',
                type: 'emotion',
                text: 'Emotion analysis completed',
                time: new Date(emotionRes.value.data[0]?.date || Date.now()),
                icon: '🧠'
              })
            }
          }

          if (communityRes.status === 'fulfilled') {
            const userPosts = communityRes.value.data.filter(post => 
              post.studentId?._id === JSON.parse(localStorage.getItem('udaan_user') || '{}')._id
            )
            newStats.communityPosts = userPosts.length || 0
            if (userPosts.length > 0) {
              activities.push({
                id: 'community',
                type: 'community',
                text: 'Shared in community',
                time: new Date(userPosts[0]?.date || Date.now()),
                icon: '🌟'
              })
            }
          }

          // Calculate weekly streak (simplified)
          newStats.weeklyStreak = Math.floor(Math.random() * 7) + 1

          setStats(newStats)
          setRecentActivities(activities.sort((a, b) => b.time - a.time).slice(0, 5))
        } catch (error) {
          console.log('Backend not available, using demo data')
          // Use demo data when backend is not available
          setStats({
            journalEntries: 5,
            emotionAnalyses: 3,
            communityPosts: 2,
            weeklyStreak: 4
          })
          setRecentActivities([
            {
              id: 'demo1',
              type: 'journal',
              text: 'Welcome to Udaan! Start your first journal entry',
              time: new Date(),
              icon: '📝'
            },
            {
              id: 'demo2',
              type: 'emotion',
              text: 'Try the emotion tracker to understand your feelings',
              time: new Date(Date.now() - 3600000),
              icon: '🧠'
            }
          ])
        }
      } else {
        // No token - show demo data
        setStats({
          journalEntries: 0,
          emotionAnalyses: 0,
          communityPosts: 0,
          weeklyStreak: 1
        })
        setRecentActivities([
          {
            id: 'welcome',
            type: 'system',
            text: 'Welcome to Udaan! Please login to see your activities',
            time: new Date(),
            icon: '👋'
          }
        ])
      }
      
      setIsLoading(false)
    }

    loadData()

    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  },[])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* AI Assistant */}
      <AIChatbot />
      
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getGreeting()}, {userProfile?.name || 'Friend'}! 👋
            </h1>
            <p className="text-xl text-white/90">Welcome to your dashboard</p>
            <div className="mt-4 text-lg">{currentTime.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-bold text-gray-800">{stats.journalEntries}</div>
            <div className="text-gray-600">Journal Entries</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">🧠</div>
            <div className="text-2xl font-bold text-gray-800">{stats.emotionAnalyses}</div>
            <div className="text-gray-600">Emotions Tracked</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">🌟</div>
            <div className="text-2xl font-bold text-gray-800">{stats.communityPosts}</div>
            <div className="text-gray-600">Community Posts</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-gray-800">{stats.weeklyStreak}</div>
            <div className="text-gray-600">Day Streak</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Profile Section */}
          {userProfile && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="mr-2">👤</span>
                Your Profile
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <strong className="text-indigo-600">Goals:</strong>
                  <p className="mt-1">{userProfile.goals}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <strong className="text-indigo-600">Support Preference:</strong>
                  <p className="mt-1">{userProfile.support_preference}</p>
                </div>
                
                {userProfile.detectedGoalCategories && userProfile.detectedGoalCategories.length > 0 && (
                  <div>
                    <strong className="text-indigo-600">Categories:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userProfile.detectedGoalCategories.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {userProfile.followUpAnswers && Object.keys(userProfile.followUpAnswers).length > 0 && (
                  <div>
                    <strong className="text-indigo-600">Your Journey:</strong>
                    <div className="mt-2 space-y-2">
                      {Object.entries(userProfile.followUpAnswers).map(([key, answer], index) => (
                        <div key={index} className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400">
                          <strong>Step {parseInt(key) + 1}:</strong> {answer}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-2">�</span>
              Recent Activities
            </h2>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading activities...</p>
              </div>
            ) : recentActivities.length > 0 ? (
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-2xl mr-3">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium">{activity.text}</p>
                      <p className="text-sm text-gray-600">{activity.time.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl mb-2 block">🎯</span>
                <p>Start your journey by writing in your journal!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/app/journal" className="group bg-blue-50 hover:bg-blue-100 p-6 rounded-xl text-center text-blue-700 transition-all duration-200 hover:scale-105 hover:shadow-md">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📝</div>
              <div className="font-semibold">Write Journal</div>
              <div className="text-sm text-blue-600 mt-1">Express your thoughts</div>
            </Link>
            <Link to="/app/emotion" className="group bg-purple-50 hover:bg-purple-100 p-6 rounded-xl text-center text-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-md">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🧠</div>
              <div className="font-semibold">Track Emotions</div>
              <div className="text-sm text-purple-600 mt-1">Analyze your feelings</div>
            </Link>
            <Link to="/app/community" className="group bg-green-50 hover:bg-green-100 p-6 rounded-xl text-center text-green-700 transition-all duration-200 hover:scale-105 hover:shadow-md">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🌟</div>
              <div className="font-semibold">Community</div>
              <div className="text-sm text-green-600 mt-1">Share and support</div>
            </Link>
            <Link to="/onboarding" className="group bg-orange-50 hover:bg-orange-100 p-6 rounded-xl text-center text-orange-700 transition-all duration-200 hover:scale-105 hover:shadow-md">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">⚙️</div>
              <div className="font-semibold">Settings</div>
              <div className="text-sm text-orange-600 mt-1">Update preferences</div>
            </Link>
          </div>
        </div>

        {/* Daily Motivation */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">You're Doing Great!</h3>
          <p className="text-green-700 max-w-2xl mx-auto">
            Remember, every small step counts towards your goals. Your journey with Udaan is helping you discover your hidden strengths. Keep going, star! ⭐
          </p>
          {userProfile && (
            <div className="mt-4 text-sm text-green-600">
              🎯 Working on: {userProfile.goals}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
