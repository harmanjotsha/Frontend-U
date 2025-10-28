#!/bin/bash

echo "🚀 Building Udaan - The Hidden Stars for Production"

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
cd ..

# Setup Backend
echo "⚙️ Setting up Backend..."
cd backend
npm install
cd ..

echo "✅ Build Complete!"
echo "📂 Frontend build: ./frontend/dist"
echo "🔧 Backend ready: ./backend"
echo ""
echo "🌐 Ready for deployment!"