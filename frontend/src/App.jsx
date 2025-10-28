import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">Udaan — The Hidden Stars</footer>
    </div>
  )
}
