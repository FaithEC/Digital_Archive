import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const StudentSidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) return <>{children}</>;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/studentDashboard', icon: '📚', label: 'Dashboard' },
    { path: '/about', icon: 'ℹ️', label: 'About' },
    { path: '/contact', icon: '📞', label: 'Contact' },
    { path: '/updateProfile', icon: '👤', label: 'My Profile' },
  ];

  return (
    <div className="dashboardContainer">
      {/* Sidebar */}
      <aside className={sidebarOpen ? 'dashboardSidebarExpanded' : 'dashboardSidebarCollapsed'}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebarToggleBtn">
          {sidebarOpen ? '◀' : '▶'}
        </button>

        {sidebarOpen && <h2 className="sidebarTitle">NACOS</h2>}

        <nav className="sidebarNav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebarLink ${location.pathname === link.path ? 'sidebarLinkActive' : ''}`}
            >
              <span>{link.icon}</span>
              {sidebarOpen && <span className="ml-3">{link.label}</span>}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="sidebarLink text-red-400 w-full text-left bg-transparent border-none cursor-pointer"
          >
            <span>🚪</span>
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Page Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default StudentSidebar;