import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PortfolioPage from './pages/PortfolioPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}
