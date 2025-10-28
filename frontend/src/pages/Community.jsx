import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AIChatbot from '../components/AIChatbot'

export default function Community(){
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPosting, setIsPosting] = useState(false)

  useEffect(()=>{ 
    loadPosts()
  },[])

  const loadPosts = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('udaan_token')
    try{
      const res = await axios.get('/api/community', { headers: { Authorization: `Bearer ${token}` } })
      setPosts(res.data)
    }catch(err){ 
      console.warn('Error loading posts:', err) 
    } finally {
      setIsLoading(false)
    }
  }

  const post = async ()=>{
    if (!text.trim()) {
      alert('Please write something before posting!')
      return
    }

    setIsPosting(true)
    const token = localStorage.getItem('udaan_token')
    try {
      const res = await axios.post('/api/community', { text }, { headers: { Authorization: `Bearer ${token}` } })
      setPosts([res.data, ...posts])
      setText('')
    } catch(err) {
      console.error('Error posting:', err)
      alert('Error posting. Please try again.')
    } finally {
      setIsPosting(false)
    }
  }

  const react = async (id)=>{
    const token = localStorage.getItem('udaan_token')
    try {
      const res = await axios.post('/api/community/react', { postId: id, reaction: 'like' }, { headers: { Authorization: `Bearer ${token}` } })
      setPosts(posts.map(p=> p._id === id ? res.data : p))
    } catch(err) {
      console.error('Error reacting:', err)
    }
  }

  const getReactionCount = (reactions) => {
    if (!reactions || typeof reactions !== 'object') return 0
    return Object.values(reactions).reduce((acc, count) => acc + (count || 0), 0)
  }

  const quickPrompts = [
    "I completed my homework today! 📚",
    "Had a great conversation with a friend 😊",
    "Learned something new and exciting! 🌟", 
    "Feeling grateful for small wins ✨",
    "Made progress on my goals today 🎯"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <AIChatbot />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            🌟 Stars Wall
          </h1>
          <p className="text-gray-600 text-lg">Share your wins, progress, and support each other's journey</p>
        </div>

        {/* Create Post Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <span className="mr-3">✨</span>
            Share Your Victory
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your win today?
              </label>
              <textarea 
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 resize-none" 
                rows={4} 
                value={text} 
                onChange={e=>setText(e.target.value)} 
                placeholder="Share a small win, progress, achievement, or positive moment from your day..."
                disabled={isPosting}
              />
              <div className="text-sm text-gray-500 mt-1">
                {text.length}/280 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Need inspiration? Try these:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setText(prompt)}
                    className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors border hover:border-green-300"
                    disabled={isPosting}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={post}
              disabled={isPosting || !text.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isPosting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sharing your victory...
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Share with Community
                </>
              )}
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <span className="mr-3">🎉</span>
            Community Victories
          </h3>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading community posts...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map(p=> (
              <div key={p._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {(p.studentId?.name || 'Anonymous').charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {p.studentId?.name || 'Anonymous Star'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(p.date).toLocaleDateString()} • {new Date(p.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">{p.text}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={()=>react(p._id)} 
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200 px-4 py-2 rounded-full transition-all duration-200 text-green-700 hover:text-green-800"
                      >
                        <span>�</span>
                        <span className="font-medium">Support</span>
                      </button>
                      
                      <div className="flex items-center space-x-1 text-gray-600">
                        <span>❤️</span>
                        <span className="text-sm font-medium">
                          {getReactionCount(p.reactions)} reactions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <span className="text-6xl mb-4 block">🌟</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Be the First Star!</h3>
              <p className="text-gray-600">Share your first victory to inspire others in the community.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
