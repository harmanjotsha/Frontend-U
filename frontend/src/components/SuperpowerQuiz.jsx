import React, { useState } from 'react';

const SuperpowerQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 1,
      question: "🎨 Question 1/4: What makes you feel most excited?",
      options: [
        { text: "Creating something beautiful", emoji: "🎨", value: "creative" },
        { text: "Solving complex problems", emoji: "🧮", value: "logical" },
        { text: "Helping others succeed", emoji: "👥", value: "social" },
        { text: "Exploring new ideas", emoji: "🚀", value: "adventurous" }
      ]
    },
    {
      id: 2,
      question: "⚡ Question 2/4: What's your ideal learning environment?",
      options: [
        { text: "Hands-on workshops", emoji: "🔧", value: "hands-on" },
        { text: "Quiet study space", emoji: "📚", value: "quiet" },
        { text: "Group discussions", emoji: "🤝", value: "collaborative" },
        { text: "Interactive games", emoji: "⚡", value: "dynamic" }
      ]
    },
    {
      id: 3,
      question: "🌟 Question 3/4: What motivates you most?",
      options: [
        { text: "Achieving personal goals", emoji: "🏆", value: "achievement" },
        { text: "Making a difference", emoji: "🌍", value: "impact" },
        { text: "Getting recognition", emoji: "⭐", value: "recognition" },
        { text: "Continuous learning", emoji: "📈", value: "growth" }
      ]
    },
    {
      id: 4,
      question: "💫 Question 4/4: What's your dream superpower?",
      options: [
        { text: "Reading minds", emoji: "🧠", value: "mind-reader" },
        { text: "Healing others", emoji: "💚", value: "healer" },
        { text: "Creating magic", emoji: "✨", value: "creator" },
        { text: "Time traveling", emoji: "⏰", value: "time-traveler" }
      ]
    }
  ];

  const superpowers = {
    creative: {
      title: "🎨 The Creative Innovator",
      emoji: "🎨",
      description: "You have the superpower of imagination! You see beauty everywhere and can transform ideas into reality.",
      learningPath: "Art & Design, Creative Writing, Digital Media, Innovation Labs"
    },
    logical: {
      title: "🧮 The Problem Solver",
      emoji: "🧠",
      description: "You have the superpower of logic! You can break down complex challenges and find brilliant solutions.",
      learningPath: "Mathematics, Coding, Engineering, Scientific Research"
    },
    social: {
      title: "👥 The Community Builder",
      emoji: "🤝",
      description: "You have the superpower of connection! You bring people together and help everyone succeed.",
      learningPath: "Leadership, Communication, Community Service, Team Projects"
    },
    adventurous: {
      title: "🚀 The Explorer",
      emoji: "🚀",
      description: "You have the superpower of curiosity! You're always ready to discover new worlds of knowledge.",
      learningPath: "Research, Innovation, New Technologies, Global Studies"
    }
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result based on most common answer type
      const answerCounts = {};
      newAnswers.forEach(answer => {
        answerCounts[answer] = (answerCounts[answer] || 0) + 1;
      });
      
      const dominantType = Object.keys(answerCounts).reduce((a, b) => 
        answerCounts[a] > answerCounts[b] ? a : b
      );
      
      setResult(superpowers[dominantType] || superpowers.creative);
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult && result) {
    return (
      <div className="relative max-w-4xl mx-auto mb-12">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center">
            <div className="text-6xl mb-4">{result.emoji}</div>
            <h4 className="text-2xl font-bold text-white mb-4">
              {result.title}
            </h4>
            <p className="text-lg text-blue-100 mb-6">
              {result.description}
            </p>
            <div className="bg-white/20 rounded-xl p-4 mb-6">
              <h5 className="font-bold text-white mb-2">🎯 Recommended Learning Path:</h5>
              <p className="text-blue-100">{result.learningPath}</p>
            </div>
            <button 
              onClick={restartQuiz}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              🔄 Discover Another Superpower
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto mb-12">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            🦸‍♀️ Discover Your Hidden Superpower! 🦸‍♂️
          </h3>
          <p className="text-blue-100 text-lg">
            Take our fun quiz and unlock your unique learning potential
          </p>
        </div>
        
        <div className="bg-white/20 rounded-2xl p-6 mb-6">
          <h4 className="text-xl font-bold text-white mb-6 text-center">
            {questions[currentQuestion].question}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <span className="text-2xl mb-2 block">{option.emoji}</span>
                {option.text}
              </button>
            ))}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="bg-white/20 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-center text-blue-200 text-sm">
            Question {currentQuestion + 1} of {questions.length} - Choose your answer! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperpowerQuiz;