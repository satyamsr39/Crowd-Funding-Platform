import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NGOs from './pages/NGOs'
import NGODetail from './pages/NGODetail'
import AddNGO from './pages/AddNGO'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Nav from './components/Nav'

export default function App(){
  return (
    <div >
      <Nav />
      <div className="px-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ngos" element={<NGOs />} />
          <Route path="/ngos/:id" element={<NGODetail />} />
          <Route path="/add" element={<AddNGO />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  )
}