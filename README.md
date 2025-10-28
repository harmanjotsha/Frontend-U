# Udaan — The Hidden Stars

Full-stack AI + Emotion-Based Learning & Motivation Platform for specially-abled and emotionally struggling students.

This scaffold includes a Node.js + Express backend (MongoDB + Mongoose) and a React + Vite + Tailwind frontend.

Folders:
- backend: Express API, Mongoose models, routes, controllers, AI adapter
- frontend: Vite React app with Tailwind styles and core pages

Quick start (local):

1. Backend

cd backend
npm install
# create .env from .env.example and set MONGO_URI and JWT_SECRET (and optional HUGGINGFACE_API_KEY)
npm run dev

2. Frontend

cd frontend
npm install
npm run dev

Notes:
- AI sentiment uses Hugging Face if HUGGINGFACE_API_KEY is set, otherwise falls back to a simple local sentiment analyzer.
- This scaffold prioritizes structure and safety; plug in production secrets (MongoDB Atlas URI, deploy keys) when ready.

Deployment:
- Frontend: Vercel
- Backend: Render / Heroku / Railway
- DB: MongoDB Atlas

License: MIT
