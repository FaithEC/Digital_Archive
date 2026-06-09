import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

const AdminDashboard = () => {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState({ dept: '', level: '', year: '' });
  const [title, setTitle] = useState('');
  const [materialType, setMaterialType] = useState('Lecture Note');
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

// Fetch existing materials when the page loads
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('https://digital-archive-1znr.onrender.com/api/materials');
        setUploadedMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  // Handle file selection and validate file type and size on the frontend
  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setError('');
  };

  // Handle file upload with progress tracking and error handling
  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic frontend validation before uploading
    const fileInput = document.getElementById('adminFile');
    const selectedFile = fileInput.files[0];

    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    // Frontend file type check
    const allowedTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExt)) {
      setError('Only PDF, DOCX, and PPTX files are allowed.');
      return;
    }

    // Frontend file size check (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum size is 10MB.');
      return;
    }

    // this will be sent as multipart/form-data to the backend
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title || selectedFile.name);
    formData.append('department', category.dept);
    formData.append('level', category.level);
    formData.append('year', category.year);
    formData.append('materialType', materialType);

    setUploading(true);
    setUploadProgress(0);

    // Make the API call to upload the file
    try {
      const response = await axios.post('https://digital-archive-1znr.onrender.com/api/materials/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      setSuccess(`✅ "${response.data.title}" uploaded successfully!`);
      setUploadedMaterials([response.data, ...uploadedMaterials]);

      // Reset form
      setTitle('');
      setCategory({ dept: '', level: '', year: '' });
      setMaterialType('Lecture Note');
      setFiles([]);
      fileInput.value = '';
      setUploadProgress(0);
    } catch (error) {
      setError(error.response?.data?.message || 'Upload failed. Check if the backend is running.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="dashboardContainer">
      <aside className="dashboardSidebar">
        <h2 className="sidebarTitle">CSC</h2>
        <nav className="sidebarNav">
          <Link to="/adminDashboard" className="sidebarLink sidebarLinkActive">
            <span>📤</span><span className="sidebarLinkText">Upload</span>
          </Link>
          <Link to="/usageReports" className="sidebarLink">
            <span>📊</span><span className="sidebarLinkText"> Usage Reports</span>
          </Link>
          <Link to="/manageArchive" className="sidebarLink">
            <span>📁</span><span className="sidebarLinkText">Archive</span>
          </Link>
          <Link to="/updateProfile" className="sidebarLink">
            <span>👤</span><span className="sidebarLinkText">My Profile</span>
          </Link>
        </nav>
      </aside>

      <main className="dashboardMain">
        <header className="dashboardHeader">
          <h1 className="mainTitle">Upload New Material</h1>
          <p className="mainSubtitle">Add academic resources to the CSC Digital Archive</p>
        </header>

        <section className="uploadSectionCard">
          <form className="uploadForm" onSubmit={handleUpload}>

            {/* Error message */}
            {error && (
              <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', marginBottom: '12px' }}>
                {error}
              </div>
            )}

              {/* Success message */}
            {success && (
              <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', marginBottom: '12px' }}>
                {success}
              </div>
            )}

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
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                required
              >
                <option value="Lecture Note">Lecture Note</option>
                <option value="Past Question">Past Question</option>
              </select>

              <select
                className="formSelect"
                value={category.dept}
                onChange={(e) => setCategory({...category, dept: e.target.value})}
                required
              >
                <option value="">Select CSC Dept</option>
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
                <option value="2025/2026">2025/2026</option>
                <option value="2024/2025">2024/2025</option>
                <option value="2023/2024">2023/2024</option>
                <option value="2022/2023">2022/2023</option>
                <option value="2021/2022">2021/2022</option>
              </select>
            </div>

            <div className="fileDropzone">
              <input type="file" onChange={handleFileChange} className="hiddenInput" id="adminFile" accept=".pdf,.doc,.docx,.ppt,.pptx" />
              <label htmlFor="adminFile" className="dropzoneLabel">
                {files.length > 0 ? files[0].name : 'Click to select a file (PDF, DOCX, PPTX — max 10MB)'}
              </label>
            </div>

            {/* Progress bar */}
            {uploading && (
              <div style={{ margin: '12px 0' }}>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${uploadProgress}%`, backgroundColor: '#4f46e5', borderRadius: '4px', transition: 'width 0.3s ease' }} />
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{uploadProgress}% uploaded</p>
              </div>
            )}

            <button type="submit" className="btnDashboardUpload" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload to Archive'}
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
                badge={item.materialType}
                fileSize={item.fileSize}
                fileType={item.fileType}
                downloads={item.downloadCount}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;