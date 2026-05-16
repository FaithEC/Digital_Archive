import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ dept: '', level: '', year: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materials' );
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
      (filters.year === '' || item.year === filters.year)
    );
  });

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/${fileUrl}`;
    link.download = fileName;
    document.body.appendChild(link );
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="studentDashboardContainer">
      <header className="studentHeroHeader">
        <div className="studentHeroContent">
          <h1 className="studentHeroTitle">NACOS Digital Archive</h1>
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
          <select 
            className="studentFilterSelect" 
            value={filters.dept}
            onChange={(e) => setFilters({...filters, dept: e.target.value})}
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Information Technology">Information Technology</option>
          </select>

          <select 
            className="studentFilterSelect"
            value={filters.level}
            onChange={(e) => setFilters({...filters, level: e.target.value})}
          >
            <option value="">All Levels</option>
            <option value="100">100L</option>
            <option value="200">200L</option>
            <option value="300">300L</option>
            <option value="400">400L</option>
          </select>

          <select 
            className="studentFilterSelect"
            value={filters.year}
            onChange={(e) => setFilters({...filters, year: e.target.value})}
          >
            <option value="">All Years</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2022/2023">2022/2023</option>
            <option value="2021/2022">2021/2022</option>
          </select>

          <button 
            onClick={() => setFilters({ dept: '', level: '', year: '' })}
            className="studentResetBtn"
          >
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
                    <span className="studentCardBadge">
                      {item.level}L | {item.year}
                    </span>
                  </div>
                  
                  <h3 className="studentCardTitle">{item.title}</h3>
                  <p className="studentCardDept">{item.department}</p>
                  
                  <div className="studentCardFooter">
                    <button 
                      onClick={() => handleDownload(item.fileUrl, item.title)}
                      className="studentDownloadBtn"
                    >
                      <span>⬇️</span> Download Material
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="studentEmptyState">
                No materials found matching your criteria.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
