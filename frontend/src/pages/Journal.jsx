import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AIChatbot from '../components/AIChatbot'

export default function Journal(){
  const [text, setText] = useState('')
  const [emoji, setEmoji] = useState('')
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [previousEntries, setPreviousEntries] = useState([])
  const [showPrevious, setShowPrevious] = useState(false)

  useEffect(() => {
    loadPreviousEntries()
  }, [])

  const loadPreviousEntries = async () => {
    const token = localStorage.getItem('udaan_token')
    if (!token) return
    
    try {
      const res = await axios.get('/api/journal/my-entries', { 
        headers: { Authorization: `Bearer ${token}` } 
      })
      setPreviousEntries(res.data || [])
    } catch (err) {
      console.error('Error loading previous entries:', err)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!text.trim()) {
      setMsg('Please write something before saving!')
      return
    }

    setIsLoading(true)
    const token = localStorage.getItem('udaan_token')
    try{
      const res = await axios.post('/api/journal', { text, emoji }, { 
        headers: { Authorization: `Bearer ${token}` } 
      })
      setMsg(`✅ Saved successfully! Emotion detected: ${res.data.journal.emotionDetected}`)
      setText('')
      setEmoji('')
      loadPreviousEntries() // Refresh the entries
      
      // Clear success message after 3 seconds
      setTimeout(() => setMsg(''), 3000)
    } catch(err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Error saving journal entry'))
    } finally {
      setIsLoading(false)
    }
  }

  const quickEmojis = ['😊', '😢', '😤', '😴', '🤔', '😍', '😨', '🎉', '💪', '🌟']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AIChatbot />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            📝 Daily Journal
          </h1>
          <p className="text-gray-600 text-lg">How are you feeling today? Share your thoughts and emotions.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Journal Entry Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <span className="mr-3">✍️</span>
              Aaj kaisa laga?
            </h2>
            
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share your thoughts and feelings
                </label>
                <textarea 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none" 
                  rows={6} 
                  value={text} 
                  onChange={e=>setText(e.target.value)} 
                  placeholder="Write about your day, your feelings, achievements, challenges, or anything on your mind..."
                  disabled={isLoading}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {text.length}/500 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How are you feeling? (Optional)
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  {quickEmojis.map((emojiOption) => (
                    <button
                      key={emojiOption}
                      type="button"
                      onClick={() => setEmoji(emojiOption)}
                      className={`text-2xl p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                        emoji === emojiOption ? 'bg-blue-100 ring-2 ring-blue-300' : ''
                      }`}
                    >
                      {emojiOption}
                    </button>
                  ))}
                </div>
                <input 
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" 
                  placeholder="Or type your own emoji/mood..." 
                  value={emoji} 
                  onChange={e=>setEmoji(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading || !text.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving your reflection...
                  </>
                ) : (
                  <>
                    <span className="mr-2">💾</span>
                    Save Journal Entry
                  </>
                )}
              </button>
            </form>

            {msg && (
              <div className={`mt-4 p-4 rounded-xl ${
                msg.includes('✅') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {msg}
              </div>
            )}
          </div>

          {/* Previous Entries */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                <span className="mr-3">📚</span>
                Your Journey
              </h3>
              <button
                onClick={() => setShowPrevious(!showPrevious)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                {showPrevious ? 'Hide' : 'Show'} Previous
              </button>
            </div>

            {showPrevious && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {previousEntries.length > 0 ? (
                  previousEntries.map((entry, index) => (
                    <div key={entry._id || index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{entry.emoji || '📝'}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {entry.text?.substring(0, 150)}
                        {entry.text?.length > 150 && '...'}
                      </p>
                      {entry.emotionDetected && (
                        <div className="mt-2">
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            Mood: {entry.emotionDetected}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">🌱</span>
                    <p>Start your journey by writing your first entry!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
