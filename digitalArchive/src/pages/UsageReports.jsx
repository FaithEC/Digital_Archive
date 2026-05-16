import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UsageReports = () => {
  const [stats, setStats] = useState({
    totalMaterials: 0,
    departments: 0,
    recentUploads: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materials' );
        const data = response.data;
        
        // Simple logic to calculate stats from the materials list
        const uniqueDepts = [...new Set(data.map(item => item.department))].length;
        
        setStats({
          totalMaterials: data.length,
          departments: uniqueDepts,
          recentUploads: data.slice(0, 5).length // Last 5 uploads
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboardContainer">
      {/* Sidebar */}
      <aside className="dashboardSidebar">
        <h2 className="sidebarTitle">NACOS</h2>
        <nav className="sidebarNav">
          <Link to="/adminDashboard" className="sidebarLink">
            <span>📤</span><span className="sidebarLinkText">Upload</span>
          </Link>
          <Link to="/usageReports" className="sidebarLink sidebarLinkActive">
            <span>📊</span><span className="sidebarLinkText">Reports</span>
          </Link>
          <Link to="/manageArchive" className="sidebarLink">
            <span>📁</span><span className="sidebarLinkText">Archive</span>
          </Link>
        </nav>
      </aside>

      <main className="dashboardMain">
        <header className="dashboardHeader">
          <h1 className="mainTitle">System Analytics</h1>
          <p className="mainSubtitle">Overview of the NACOS Digital Archive usage</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-indigo-600">
            <p className="text-sm text-gray-500 font-medium uppercase">Total Materials</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalMaterials}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-500 font-medium uppercase">Active Departments</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.departments}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-500">
            <p className="text-sm text-gray-500 font-medium uppercase">New This Week</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.recentUploads}</h3>
          </div>
        </div>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Archive Growth</h3>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 italic">Chart visualization will appear here as more data is collected</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UsageReports;
