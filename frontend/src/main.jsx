import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import App from './App'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserOnboarding from './pages/UserOnboarding'
import Dashboard from './pages/Dashboard'
import Journal from './pages/Journal'
import Emotion from './pages/Emotion'
import TeacherPanel from './pages/TeacherPanel'
import Community from './pages/Community'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<UserOnboarding />} />
        <Route path="/app" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="journal" element={<Journal />} />
          <Route path="emotion" element={<Emotion />} />
          <Route path="teacher-panel" element={<TeacherPanel />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
