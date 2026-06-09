import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Better way to check if logged in: Check for userInfo in localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isLoggedIn = !!userInfo;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    alert('Logging out...');
    navigate('/login');
  };

  return (
    <header className="headerContainer">
      <nav className="navWrapper">
        <div className="navContent">
          <div className="navLeft">
            <Link to="/" className="logoLink">
              <span className="logoText">FOCA Archive</span>
            </Link>
            <div className="navLinksDesktop">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="navLink">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="navRight">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* NEW: Profile Link for Desktop */}
                <Link to="/updateProfile" className="navLink">
                  Profile
                </Link>
                <button onClick={handleLogout} className="btnLogout">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btnLogin">Log in</Link>
                <Link to="/register" className="btnSignup">Register</Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="navLinksMobile">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="navLink">
              {link.name}
            </Link>
          ))}
          {isLoggedIn && (
            <>
              <Link to="/updateProfile" className="navLink">Profile</Link>
              <button onClick={handleLogout} className="navLink text-red-600">Logout</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
