import React from 'react';

const DownloadStats = () => {
  // Mock data for download statistics
  const topMaterials = [
    { id: 1, name: 'CSC 101: Intro to Programming', downloads: 1240, dept: 'Computer Science' },
    { id: 2, name: 'CSC 201: Data Structures', downloads: 850, dept: 'Software Engineering' },
    { id: 3, name: 'IFT 301: Database Systems', downloads: 620, dept: 'Information Technology' },
    { id: 4, name: 'CYB 201: Network Security', downloads: 430, dept: 'Cyber Security' },
    { id: 5, name: 'CSC 401: Artificial Intelligence', downloads: 310, dept: 'Computer Science' },
  ];

  const statsSummary = [
    { label: 'Total Downloads', value: '3,450', icon: '📈' },
    { label: 'Most Active Dept', value: 'Comp. Science', icon: '🏆' },
    { label: 'Peak Time', value: '7 PM - 10 PM', icon: '🕒' },
  ];

  return (
    <div className="dashboardContainer">
      <main className="dashboardMain fullWidth">
        <header className="dashboardHeader">
          <h1 className="mainTitle">Download Statistics</h1>
          <p className="mainSubtitle">Track the most accessed materials in the NACOS Archive</p>
        </header>

        {/* Summary Cards */}
        <section className="statsGrid">
          {statsSummary.map((stat, index) => (
            <div key={index} className="statCard">
              <div className="statHeader">
                <span className="statIcon">{stat.icon}</span>
              </div>
              <h3 className="statValue">{stat.value}</h3>
              <p className="statLabel">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Top Downloads Table */}
        <section className="activitySection">
          <div className="sectionHeader p-6 border-b border-gray-100">
            <h3 className="sectionLabel">Top Downloaded Materials</h3>
          </div>
          <div className="tableWrapper">
            <table className="activityTable">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Material Name</th>
                  <th>Department</th>
                  <th>Total Downloads</th>
                </tr>
              </thead>
              <tbody>
                {topMaterials.map((item, index) => (
                  <tr key={item.id}>
                    <td className="font-bold text-indigo-600">#{index + 1}</td>
                    <td className="font-medium text-gray-900">{item.name}</td>
                    <td>{item.dept}</td>
                    <td>
                      <div className="flex items-center">
                        <span className="mr-2">{item.downloads}</span>
                        <div className="w-24 bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full" 
                            style={{ width: `${(item.downloads / 1240) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DownloadStats;
