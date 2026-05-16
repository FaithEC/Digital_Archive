import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import Hero from './pages/Hero'
import About from './pages/About'
import Contact from './pages/Contact' // Import Contact
import Features from './components/Features'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import UsageReports from './pages/UsageReports'
import DownloadStats from './pages/DownloadStats';
import ManageArchive from './pages/ManageArchive';
import UpdateProfile from './pages/UpdateProfile';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/usageReports" element={<UsageReports />} />
          <Route path="/downloadStats" element={<DownloadStats />} />
          <Route path="/manageArchive" element={<ManageArchive />} />
          <Route path="/updateProfile" element={<UpdateProfile />} /> 
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
