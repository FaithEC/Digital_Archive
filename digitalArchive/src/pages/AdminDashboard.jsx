import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

const AdminDashboard = () => {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState({ dept: '', level: '', year: '' });
  const [title, setTitle] = useState('');
  const [uploadedMaterials, setUploadedMaterials] = useState([]);

  // Fetch existing materials when the page loads
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materials' );
        setUploadedMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('adminFile');
    const selectedFile = fileInput.files[0];

    if (!selectedFile) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title || selectedFile.name);
    formData.append('department', category.dept);
    formData.append('level', category.level);
    formData.append('year', category.year);

    try {
      const response = await axios.post('http://localhost:5000/api/materials/upload', formData );
      alert('✅ Success! Material added to NACOS Archive.');
      
      // Add the new material to the top of the list
      setUploadedMaterials([response.data, ...uploadedMaterials]);
      
      // Reset form
      setTitle('');
      setCategory({ dept: '', level: '', year: '' });
      setFiles([]);
      fileInput.value = "";
    } catch (error) {
      alert("Upload failed. Check if the backend is running.");
    }
  };

  return (
    <div className="dashboardContainer">
      {/* Sidebar */}
      <aside className="dashboardSidebar">
        <h2 className="sidebarTitle">NACOS</h2>
        <nav className="sidebarNav">
          <Link to="/adminDashboard" className="sidebarLink sidebarLinkActive">
            <span>📤</span>
            <span className="sidebarLinkText">Upload</span>
          </Link>
          <Link to="/usageReports" className="sidebarLink">
            <span>📊</span> 
            <span className="sidebarLinkText">Reports</span>
          </Link>
          <Link to="/manageArchive" className="sidebarLink">
            <span>📁</span>
            <span className="sidebarLinkText">Archive</span>
          </Link>
          <Link to="/updateProfile" className="sidebarLink">
            <span>👤</span>
            <span className="sidebarLinkText">My Profile</span>
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboardMain">
        <header className="dashboardHeader">
          <h1 className="mainTitle">Upload New Material</h1>
          <p className="mainSubtitle">Add academic resources to the NACOS Digital Archive</p>
        </header>

        <section className="uploadSectionCard">
          <form className="uploadForm" onSubmit={handleUpload}>
            <div className="formGrid">
              <input 
                type="text" 
                placeholder="Material Title (e.g. CSC 101 Notes)" 
                className="formSelect"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              
              <select 
                className="formSelect" 
                value={category.dept}
                onChange={(e) => setCategory({...category, dept: e.target.value})}
                required
              >
                <option value="">Select NACOS Dept</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Information Technology">Information Technology</option>
              </select>

              <select 
                className="formSelect"
                value={category.level}
                onChange={(e) => setCategory({...category, level: e.target.value})}
                required
              >
                <option value="">Select Level</option>
                <option value="100">100L</option>
                <option value="200">200L</option>
                <option value="300">300L</option>
                <option value="400">400L</option>
              </select>

              <select 
                className="formSelect"
                value={category.year}
                onChange={(e) => setCategory({...category, year: e.target.value})}
                required
              >
                <option value="">Select Year</option>
                <option value="2023/2024">2023/2024</option>
                <option value="2022/2023">2022/2023</option>
                <option value="2021/2022">2021/2022</option>
              </select>
            </div>

            <div className="fileDropzone">
              <input type="file" onChange={handleFileChange} className="hiddenInput" id="adminFile" />
              <label htmlFor="adminFile" className="dropzoneLabel">
                {files.length > 0 ? files[0].name : 'Click to select a file to upload'}
              </label>
            </div>

            <button type="submit" className="btnDashboardUpload">
              Upload to Archive
            </button>
          </form>
        </section>

        <section className="recentUploads">
          <h3 className="sectionLabel">Recently Archived Materials</h3>
          <div className="dashboardGrid">
            {uploadedMaterials.map((item) => (
              <Card 
                key={item._id} 
                title={item.title} 
                description={`${item.department} | ${item.level}L | ${item.year}`} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
