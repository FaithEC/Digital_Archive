import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentSidebar from './components/StudentSidebar';

import Hero from './pages/Hero';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './components/Features';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import UsageReports from './pages/UsageReports';
import DownloadStats from './pages/DownloadStats';
import ManageArchive from './pages/ManageArchive';
import UpdateProfile from './pages/UpdateProfile';


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public pages — no sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin pages — admin sidebar */}
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/usageReports" element={<UsageReports />} />
          <Route path="/manageArchive" element={<ManageArchive />} />

          {/* Student + shared pages — student sidebar */}
          <Route path="/" element={
            <StudentSidebar>
              <Hero />
              <Features />
            </StudentSidebar>
          } />
          <Route path="/about" element={
            <StudentSidebar>
              <About />
            </StudentSidebar>
          } />
          <Route path="/contact" element={
            <StudentSidebar>
              <Contact />
            </StudentSidebar>
          } />
          <Route path="/studentDashboard" element={
            <StudentSidebar>
              <StudentDashboard />
            </StudentSidebar>
          } />
         
          <Route path="/updateProfile" element={
            <StudentSidebar>
              <UpdateProfile />
            </StudentSidebar>
          } />
          <Route path="/downloadStats" element={
            <StudentSidebar>
              <DownloadStats />
            </StudentSidebar>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;