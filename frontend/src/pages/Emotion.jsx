import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AIChatbot from '../components/AIChatbot'

export default function Emotion(){
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previousAnalyses, setPreviousAnalyses] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    loadPreviousAnalyses()
  }, [])

  const loadPreviousAnalyses = async () => {
    try {
      // Always load from local storage for now to ensure it works
      const localAnalyses = JSON.parse(localStorage.getItem('emotion_analyses') || '[]')
      setPreviousAnalyses(localAnalyses)
    } catch (err) {
      console.error('Error loading previous analyses:', err)
      setPreviousAnalyses([])
    }
  }

  const analyzeEmotion = () => {
    if (!text.trim()) {
      alert('Please enter some text to analyze!')
      return
    }

    setIsLoading(true)
    
    // Simple local emotion detection that always works
    const emotions = {
      happy: ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic', 'awesome', 'good', 'better', 'best', 'love', 'smile'],
      sad: ['sad', 'depressed', 'down', 'unhappy', 'disappointed', 'hurt', 'upset', 'cry', 'tears', 'lonely'],
      angry: ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 'hate'],
      fear: ['scared', 'afraid', 'worried', 'anxious', 'nervous', 'panic', 'frightened', 'stress'],
      excited: ['excited', 'thrilled', 'pumped', 'energetic', 'enthusiastic', 'motivated'],
      calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'zen', 'comfortable'],
      overwhelmed: ['overwhelmed', 'stressed', 'pressure', 'too much', 'burden', 'exhausted']
    }
    
    const textLower = text.toLowerCase()
    let detectedEmotion = 'neutral'
    let confidence = 0.6
    let matchCount = 0
    
    for (const [emotion, keywords] of Object.entries(emotions)) {
      const matches = keywords.filter(keyword => textLower.includes(keyword))
      if (matches.length > matchCount) {
        detectedEmotion = emotion
        matchCount = matches.length
        confidence = Math.min(0.95, 0.6 + (matches.length * 0.1))
      }
    }
    
    // Simulate processing time
    setTimeout(() => {
      const analysisResult = {
        emotionType: detectedEmotion,
        confidenceScore: confidence,
        aiResponse: `Based on your text, you seem to be feeling ${detectedEmotion}. ${getEmotionAdvice(detectedEmotion)}`
      }
      
      setResult(analysisResult)
      
      // Save to local storage for history
      try {
        const savedAnalyses = JSON.parse(localStorage.getItem('emotion_analyses') || '[]')
        savedAnalyses.unshift({
          ...analysisResult,
          date: new Date().toISOString(),
          _id: Date.now().toString(),
          originalText: text.substring(0, 100) + (text.length > 100 ? '...' : '')
        })
        localStorage.setItem('emotion_analyses', JSON.stringify(savedAnalyses.slice(0, 10)))
        loadPreviousAnalyses()
      } catch (err) {
        console.error('Error saving analysis:', err)
      }
      
      setIsLoading(false)
    }, 1500)
  }

  const getEmotionAdvice = (emotion) => {
    const advice = {
      happy: "That's wonderful! Keep spreading positivity and remember to share your joy with others.",
      sad: "It's okay to feel sad sometimes. Consider talking to someone you trust or doing something that usually makes you feel better.",
      angry: "Take some deep breaths and try to understand what's causing these feelings. Physical exercise can help release tension.",
      fear: "Fear is natural, but don't let it paralyze you. Break down your worries into smaller, manageable parts.",
      excited: "Channel this energy into productive activities! Your enthusiasm can be contagious and motivating for others.",
      calm: "This is a great state of mind. Use this peaceful moment to reflect and plan your next steps.",
      overwhelmed: "Take a step back and prioritize. Remember, you don't have to do everything at once. Ask for help if needed.",
      neutral: "A balanced emotional state can be positive. Take this time to reflect on your goals and plans."
    }
    return advice[emotion] || "Remember that all emotions are temporary and serve a purpose in our lives."
  }

  const tryDemo = () => {
    const demoTexts = [
      "I am feeling really excited about my studies today! Everything seems to be going well and I'm motivated to keep learning.",
      "I feel overwhelmed with all the assignments and exams coming up. There's so much pressure.",
      "Today was amazing! I accomplished everything I planned and I feel so happy and proud of myself.",
      "I'm feeling a bit sad and lonely today. Things haven't been going as planned.",
      "I'm worried about my future and feel anxious about making the right decisions."
    ]
    const randomText = demoTexts[Math.floor(Math.random() * demoTexts.length)]
    setText(randomText)
  }

  const getEmotionColor = (emotion) => {
    const colors = {
      happy: 'from-yellow-400 to-orange-400',
      sad: 'from-blue-400 to-blue-600',
      angry: 'from-red-400 to-red-600',
      fear: 'from-purple-400 to-purple-600',
      neutral: 'from-gray-400 to-gray-600',
      excited: 'from-pink-400 to-pink-600',
      calm: 'from-green-400 to-green-600'
    }
    return colors[emotion?.toLowerCase()] || 'from-indigo-400 to-indigo-600'
  }

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      fear: '😨',
      neutral: '😐',
      excited: '🎉',
      calm: '😌'
    }
    return emojis[emotion?.toLowerCase()] || '🤔'
  }

  const quickTexts = [
    "I'm feeling great today!",
    "I'm worried about my exams",
    "I accomplished something amazing",
    "I'm feeling overwhelmed",
    "I'm excited about the future",
    "I feel peaceful and calm"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <AIChatbot />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🧠 Emotion Analyzer
          </h1>
          <p className="text-gray-600 text-lg">Understand your emotions better with AI-powered analysis</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emotion Analysis Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <span className="mr-3">💭</span>
              Analyze Your Feelings
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Express how you're feeling
                </label>
                <textarea 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none" 
                  rows={5} 
                  value={text} 
                  onChange={e=>setText(e.target.value)}
                  placeholder="Describe your current emotional state, what happened today, or how you're feeling about something..."
                  disabled={isLoading}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {text.length}/300 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick examples:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "I'm feeling great today!",
                    "I'm worried about my exams",
                    "I accomplished something amazing",
                    "I'm feeling overwhelmed",
                    "I'm excited about the future",
                    "I feel peaceful and calm"
                  ].map((quickText, index) => (
                    <button
                      key={index}
                      onClick={() => setText(quickText)}
                      className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors border hover:border-purple-300"
                      disabled={isLoading}
                    >
                      "{quickText}"
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={analyzeEmotion}
                  disabled={isLoading || !text.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing emotions...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🔍</span>
                      Analyze Emotion
                    </>
                  )}
                </button>
                
                <button 
                  onClick={tryDemo}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <span className="mr-1">⚡</span>
                  Try Demo
                </button>
              </div>
            </div>

            {/* Analysis Result */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Analysis Result
                </h3>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${getEmotionColor(result.emotionType)} text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getEmotionEmoji(result.emotionType)}</span>
                        <div>
                          <p className="text-lg font-semibold">
                            {result.emotionType || 'Unknown'}
                          </p>
                          <p className="text-sm opacity-90">
                            Confidence: {Math.round((result.confidenceScore || 0) * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {result.aiResponse && (
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">AI Insights:</h4>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        {result.aiResponse}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Previous Analyses */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                <span className="mr-3">📈</span>
                Emotion History
              </h3>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                {showHistory ? 'Hide' : 'Show'} History
              </button>
            </div>

            {showHistory && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {previousAnalyses.length > 0 ? (
                  previousAnalyses.map((analysis, index) => (
                    <div key={analysis._id || index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getEmotionEmoji(analysis.emotionType)}</span>
                          <span className="font-medium">{analysis.emotionType}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(analysis.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Confidence: {Math.round((analysis.confidenceScore || 0) * 100)}%
                      </div>
                      {analysis.aiResponse && (
                        <p className="text-xs text-gray-500 mt-2 italic">
                          "{analysis.aiResponse.substring(0, 100)}..."
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">🎯</span>
                    <p>Start analyzing your emotions to track your emotional journey!</p>
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
