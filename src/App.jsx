import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Particles from './components/Particles'
import InspectorBlock from './components/InspectorBlock'
import Home from './pages/Home'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Help from './pages/Help'
import Credits from './pages/Credits'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="noise">
            <Particles />
            <InspectorBlock />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<Help />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/gen/hide/test" element={<AdminPanel />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
