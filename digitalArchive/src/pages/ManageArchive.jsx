import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageArchive = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('https://digital-archive-1znr.onrender.com/api/materials' );
      setMaterials(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Are you sure? This will permanently remove this material from the NACOS Archive.")) {
      try {
        await axios.delete(`https://digital-archive-1znr.onrender.com/api/materials/${id}` );
        setMaterials(materials.filter(item => item._id !== id));
        alert("🗑️ Material deleted successfully!");
      } catch (error) {
        alert("Failed to delete material.");
      }
    }
  };

  const openEditModal = (material) => {
    setCurrentMaterial({ ...material });
    setIsEditing(true);
  };
  const [showReports, setShowReports] = useState(false);

    // Get materials that have reports
    const reportedMaterials = materials.filter(item => item.reports && item.reports.length > 0);

    const handleDismissReport = async (id) => {
  try {
        await axios.put(`https://digital-archive-1znr.onrender.com/api/materials/${id}/dismissReports`);
        setMaterials(materials.map(m => m._id === id ? { ...m, reports: [] } : m));
      } catch (error) {
        alert("Failed to dismiss report.");
      }
    };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://digital-archive-1znr.onrender.com/api/materials/${currentMaterial._id}`, currentMaterial );
      alert("✅ Material updated successfully!");
      setIsEditing(false);
      fetchMaterials(); // Refresh the list
    } catch (error) {
      alert("Failed to update material.");
    }
  };

  return (
    <div className="dashboardContainer">
      {/* Sidebar */}
      <aside className="dashboardSidebar">
        <h2 className="sidebarTitle">NACOS</h2>
        <nav className="sidebarNav">
          <Link to="/adminDashboard" className="sidebarLink">
            <span>📤</span><span className="sidebarLinkText">Upload</span>
          </Link>
          <Link to="/usageReports" className="sidebarLink">
            <span>📊</span><span className="sidebarLinkText">Reports</span>
          </Link>
          <Link to="/manageArchive" className="sidebarLink sidebarLinkActive">
            <span>📁</span><span className="sidebarLinkText">Archive</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboardMain">
        <header className="dashboardHeader">
          <h1 className="mainTitle">Manage Archive</h1>
          <p className="mainSubtitle">Edit or remove materials from the NACOS Digital Archive</p>
        </header>

        <section className="manageSection">
          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading materials...</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materials.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-400">{item.year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {item.department} | {item.level}L
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Reported Files Section */}
<section className="manageSection mt-8">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h2 className="mainTitle">Reported Files</h2>
      <p className="mainSubtitle">Files flagged by students</p>
    </div>
    <button
      onClick={() => setShowReports(!showReports)}
      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100"
    >
      🚩 {reportedMaterials.length} Report{reportedMaterials.length !== 1 ? 's' : ''} {showReports ? '▲' : '▼'}
    </button>
  </div>

  {showReports && (
    reportedMaterials.length === 0 ? (
      <p className="text-center py-6 text-gray-400">No reported files at the moment.</p>
    ) : (
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reportedMaterials.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-400">{item.department} | {item.level}L | {item.year}</div>
                </td>
                <td className="px-6 py-4">
                  <ul className="space-y-1">
                    {item.reports.map((report, index) => (
                      <li key={index} className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                        "{report.reason}" — {new Date(report.reportedAt).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 space-x-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md text-sm"
                  >
                    🗑️ Delete File
                  </button>
                  <button
                    onClick={() => handleDismissReport(item._id)}
                    className="text-gray-600 hover:text-gray-900 bg-gray-50 px-3 py-1 rounded-md text-sm"
                  >
                    ✅ Dismiss
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  )}
</section>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Material</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input 
                    type="text" 
                    className="formInput mt-1"
                    value={currentMaterial.title}
                    onChange={(e) => setCurrentMaterial({...currentMaterial, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select 
                    className="formSelect mt-1"
                    value={currentMaterial.department}
                    onChange={(e) => setCurrentMaterial({...currentMaterial, department: e.target.value})}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Information Technology">Information Technology</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageArchive;
