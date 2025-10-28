import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI friend. You can ask me anything - studies, emotions, or any question. How was your day today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const supportiveResponses = {
    sad: [
      "I can see you're feeling sad. That's completely valid - everyone has difficult days. Would you like to share what's making you feel this way? Sometimes talking helps. 💙",
      "Your feelings matter, and it's okay to feel sad sometimes. Remember, this feeling is temporary. Can I help you process what you're going through?",
      "Being sad doesn't mean you're weak - it means you're human. You've overcome challenges before, and you'll get through this too. What usually helps you feel better?",
      "I'm here to listen. Sometimes the best thing we can do is acknowledge our sadness and be gentle with ourselves. What small thing could make today a little easier?"
    ],
    happy: [
      "Your happiness is wonderful to see! 😊 What's bringing you joy today? I'd love to celebrate with you!",
      "That's fantastic! Happiness suits you well. Share what's making you feel so good - let's spread those positive vibes!",
      "I can feel your positive energy! 🌟 Happy moments like these are precious. What achievement or moment are you celebrating?",
      "Your joy is contagious! This is exactly the kind of energy that makes the world brighter. Tell me more about what's going well!"
    ],
    academic: [
      "Studies can be challenging, but you've got this! Which subject or topic is giving you trouble? Let's break it down together. 📚",
      "Every expert was once a beginner. What specific area would you like help with? I can suggest study techniques, create a plan, or just be here to motivate you!",
      "Academic struggles are normal and show you're pushing yourself to grow. What's your biggest challenge right now? Let's tackle it step by step.",
      "Learning is a journey, not a race. Which subject needs attention? I can help with study strategies, time management, or just provide encouragement!",
      "Feeling overwhelmed with studies? Let's organize your tasks and create a manageable plan. What subjects or assignments are on your plate right now?"
    ],
    motivation: [
      "You're doing amazing work! Remember, progress isn't always visible immediately, but every effort counts. What goal are you working toward?",
      "Small victories deserve big celebrations! 🎉 What positive step did you take today, no matter how small?",
      "You have incredible strength and potential. Sometimes we need reminders of how far we've come. What's one thing you're proud of this week?",
      "Keep going, star! ⭐ Your efforts are building toward something great. What's motivating you to keep pushing forward?",
      "Rest is part of progress too. You're balancing growth with self-care, and that takes wisdom. How are you taking care of yourself today?"
    ],
    stress: [
      "Stress is your mind's way of saying you care deeply about something. Let's work through this together. What's weighing on your mind?",
      "When stress feels overwhelming, breaking things into smaller pieces helps. What's the most pressing thing you're dealing with right now?",
      "You've handled stress before and come through stronger. What coping strategies have worked for you in the past?",
      "Stress can be managed with the right approach. Would you like to try some breathing exercises, or would you prefer to talk about what's causing it?"
    ],
    study_help: [
      "I'm here to help with your studies! What subject or topic would you like assistance with? Whether it's math, science, languages, or study techniques - let's tackle it together! 📖",
      "Great that you're reaching out for study support! What specific area needs attention? I can help explain concepts, suggest study methods, or create a learning plan.",
      "Learning is my favorite topic to help with! What subject are you working on? I can break down complex topics, suggest resources, or help you organize your study schedule.",
      "Study challenges are opportunities to grow! What particular subject or concept would you like help understanding? Let's make learning easier and more effective."
    ],
    goals: [
      "Setting goals is the first step toward achievement! What goal would you like to work on? I can help you break it down into manageable steps.",
      "Goals give direction to our efforts. What's something you'd like to accomplish? Let's create a plan to make it happen!",
      "I love helping with goal-setting! Whether it's academic, personal, or creative - what dream would you like to turn into reality?",
      "Every big achievement starts with a clear goal. What would you like to focus on? Let's map out your path to success!"
    ]
  }

  const detectEmotion = (text) => {
    const lowerText = text.toLowerCase()
    
    const sadWords = ['sad', 'upset', 'worried', 'fear', 'cry', 'crying', 'lonely', 'depressed', 'anxious', 'down', 'bad', 'terrible', 'awful', 'disappointed', 'hurt', 'pain']
    const happyWords = ['happy', 'good', 'great', 'awesome', 'wonderful', 'excited', 'joy', 'amazing', 'fantastic', 'brilliant', 'celebrate', 'proud', 'success', 'achieved', 'accomplished']
    const academicWords = ['study', 'studies', 'exam', 'homework', 'math', 'mathematics', 'science', 'physics', 'chemistry', 'biology', 'learning', 'school', 'college', 'university', 'assignment', 'project', 'test', 'quiz', 'subject', 'lesson', 'chapter', 'book', 'textbook']
    const stressWords = ['stress', 'stressed', 'overwhelmed', 'pressure', 'deadline', 'rush', 'panic', 'chaos', 'busy', 'exhausted', 'tired', 'burnout']
    const studyHelpWords = ['help', 'explain', 'understand', 'confused', 'stuck', 'difficult', 'hard', 'problem', 'question', 'how to', 'what is', 'why', 'solve', 'calculate']
    const goalWords = ['goal', 'goals', 'want to', 'wish', 'dream', 'plan', 'future', 'ambition', 'achieve', 'accomplish', 'target', 'aim']
    
    if (sadWords.some(word => lowerText.includes(word))) return 'sad'
    if (stressWords.some(word => lowerText.includes(word))) return 'stress'
    if (happyWords.some(word => lowerText.includes(word))) return 'happy'
    if (studyHelpWords.some(word => lowerText.includes(word)) && academicWords.some(word => lowerText.includes(word))) return 'study_help'
    if (academicWords.some(word => lowerText.includes(word))) return 'academic'
    if (goalWords.some(word => lowerText.includes(word))) return 'goals'
    if (studyHelpWords.some(word => lowerText.includes(word))) return 'study_help'
    
    return 'motivation'
  }

  const generateResponse = async (userMessage) => {
    setIsTyping(true)
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const emotion = detectEmotion(userMessage)
    const responses = supportiveResponses[emotion]
    const response = responses[Math.floor(Math.random() * responses.length)]
    
    const aiMessage = {
      id: Date.now(),
      text: response,
      sender: 'ai',
      timestamp: new Date(),
      emotion: emotion
    }
    
    setMessages(prev => [...prev, aiMessage])
    setIsTyping(false)
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return
    
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    
    // Generate AI response
    await generateResponse(inputMessage)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white p-5 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative text-3xl">🤖</span>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 flex flex-col z-50 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-3">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Assistant</h3>
              <p className="text-xs text-white/80 font-medium">Always here to help you</p>
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200"
          >
            <span className="text-lg font-bold">−</span>
          </button>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[85%]">
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              <div
                className={`p-4 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">👤</span>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <div className="bg-white text-gray-800 p-4 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Input */}
      <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
        <div className="flex space-x-3 mb-4">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write your message..."
            className="flex-1 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            rows="1"
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
            className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="text-lg">📤</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            'I need study help', 
            'Feeling stressed', 
            'Need motivation', 
            'I am sad', 
            'Set goals', 
            'Explain math', 
            'How to focus?',
            'I am happy!'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputMessage(suggestion)}
              className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 text-gray-600 px-3 py-2 rounded-full transition-all duration-200 font-medium border border-gray-200 hover:border-indigo-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}