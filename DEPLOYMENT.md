# 🚀 Udaan - The Hidden Stars - Deployment Guide

## 📋 Project Overview
**Udaan** is a comprehensive student mental health and academic support platform featuring:
- 🧠 AI-powered emotion analysis
- 📝 Personal journaling system
- 🤖 Interactive AI assistant
- 🌟 Community support features
- 📊 Progress tracking dashboard

## 🏗️ Architecture
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **AI Features**: Local emotion analysis + API integration
- **Database**: MongoDB Atlas (production) / Local MongoDB (development)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
1. **Frontend Deployment**:
   ```bash
   cd frontend
   npm install
   npm run build
   # Deploy to Vercel
   vercel --prod
   ```

2. **Backend Deployment**:
   ```bash
   cd backend
   # Deploy to Vercel Functions
   vercel --prod
   ```

### Option 2: Netlify + Heroku
1. **Frontend** → Netlify
2. **Backend** → Heroku

### Option 3: Docker Deployment
```bash
# Build and run with Docker
docker-compose up --build
```

## 🔧 Environment Setup

### Backend Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/udaan
JWT_SECRET=your-super-secret-key
FRONTEND_URL=https://your-domain.vercel.app
```

### Frontend Environment Variables
```env
VITE_API_URL=https://your-backend-url.vercel.app
VITE_APP_NAME=Udaan - The Hidden Stars
```

## 📦 Build Process
```bash
# Run the automated build script
./build.sh

# Or manually:
cd frontend && npm run build
cd ../backend && npm install
```

## 🌐 Features
- ✅ **Emotion Analyzer**: AI-powered emotion detection and analysis
- ✅ **AI Assistant**: Interactive chatbot for student support
- ✅ **Dashboard**: Comprehensive analytics and progress tracking
- ✅ **Journal**: Personal reflection and mood tracking
- ✅ **Community**: Student interaction and support network
- ✅ **Authentication**: Secure user registration and login

## 🔐 Security Features
- JWT-based authentication
- Secure password hashing
- CORS protection
- Input validation and sanitization

## 📱 Responsive Design
- Mobile-first approach
- Modern gradient UI
- Smooth animations
- Cross-browser compatibility

## 🚀 Live Demo
- **Frontend**: [Your deployed frontend URL]
- **Backend API**: [Your deployed backend URL]

## 📞 Support
For deployment assistance or technical support, please contact the development team.

---
Built with ❤️ for student mental health and academic success