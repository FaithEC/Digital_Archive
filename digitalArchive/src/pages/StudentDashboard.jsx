import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ dept: '', level: '', year: '', materialType: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('https://digital-archive-1znr.onrender.com/api/materials');
        setMaterials(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const filteredMaterials = materials.filter(item => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.dept === '' || item.department === filters.dept) &&
      (filters.level === '' || item.level === filters.level) &&
      (filters.year === '' || item.year === filters.year) &&
      (filters.materialType === '' || item.materialType === filters.materialType)
    );
  });

  const handleDownload = async (fileUrl, fileName, itemId) => {
    try {
      await axios.put(`https://digital-archive-1znr.onrender.com/api/materials/${itemId}/download`);
      setMaterials(prev => prev.map(m =>
        m._id === itemId ? { ...m, downloadCount: (m.downloadCount || 0) + 1 } : m
      ));
    } catch (error) {
      console.error('Could not update download count:', error);
    }

    const link = document.createElement('a');

    const downloadUrl = fileUrl.replace('/upload/', '/upload/fl_attachment/');
    link.href = downloadUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReport = async (itemId, itemTitle) => {
    const reason = window.prompt(`Why are you reporting "${itemTitle}"?\n\nExamples: Wrong file, Corrupted file, Irrelevant content`);
    if (!reason) return;
    try {
      await axios.post(`https://digital-archive-1znr.onrender.com/api/materials/${itemId}/report`, { reason });
      alert('Report submitted. Thank you!');
    } catch (error) {
      alert('Could not submit report. Please try again.');
    }
  };


  return (
    <div className="dashboardMain">
        <header className="studentHeroHeader">
          <div className="studentHeroContent">
            <h1 className="studentHeroTitle">CSC Digital Archive</h1>
            <p className="studentHeroSubtitle">Access lecture notes and academic resources</p>
            <div className="studentSearchWrapper">
              <input
                type="text"
                placeholder="Search by title (e.g. CSC 101)..."
                className="studentSearchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="studentSearchIcon">🔍</span>
            </div>
          </div>
        </header>

        <main className="studentMainContent">
          <div className="studentFilterBar">
            <select className="studentFilterSelect" value={filters.dept} onChange={(e) => setFilters({...filters, dept: e.target.value})}>
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Information Technology">Information Technology</option>
            </select>
            <select className="studentFilterSelect" value={filters.level} onChange={(e) => setFilters({...filters, level: e.target.value})}>
              <option value="">All Levels</option>
              <option value="100">100L</option>
              <option value="200">200L</option>
              <option value="300">300L</option>
              <option value="400">400L</option>
            </select>
            <select className="studentFilterSelect" value={filters.year} onChange={(e) => setFilters({...filters, year: e.target.value})}>
              <option value="">All Years</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2022/2023">2022/2023</option>
              <option value="2021/2022">2021/2022</option>
            </select>
            <select className="studentFilterSelect" value={filters.materialType} onChange={(e) => setFilters({...filters, materialType: e.target.value})}>
              <option value="">All Types</option>
              <option value="Lecture Note">Lecture Note</option>
              <option value="Past Question">Past Question</option>
            </select>
            <button onClick={() => setFilters({ dept: '', level: '', year: '', materialType: '' })} className="studentResetBtn">
              Reset Filters
            </button>
          </div>

          {loading ? (
            <div className="studentLoadingWrapper">
              <div className="studentLoadingSpinner"></div>
              <p className="studentLoadingText">Fetching resources...</p>
            </div>
          ) : (
            <div className="studentGrid">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((item) => (
                  <div key={item._id} className="studentCard">
                    <div className="studentCardHeader">
                      <div className="studentCardIcon">📄</div>
                      <span className="studentCardBadge">{item.level}L | {item.year}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.materialType === 'Past Question' ? 'bg-yellow-100 text-yellow-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        {item.materialType || 'Lecture Note'}
                      </span>
                    </div>

                    <h3 className="studentCardTitle">{item.title}</h3>
                    <p className="studentCardDept">{item.department}</p>
                    <p className="text-xs text-gray-400 mb-3">⬇️ {item.downloadCount || 0} downloads</p>

                    <div className="studentCardFooter">
                      <button onClick={() => handleDownload(item.fileUrl, item.title, item._id)} className="studentDownloadBtn">
                        ⬇️ Download
                      </button>
                      <button onClick={() => handleReport(item._id, item.title)} className="studentReportBtn">
                        ⚠️ Report
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="studentEmptyState">No materials found matching your criteria.</div>
              )}
            </div>
          )}
        </main>
      </div>
  );
};

export default StudentDashboard;