import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

const Login = () => {
  const [role, setRole] = useState('student'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 ADD THIS
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const userData = response.data;
      localStorage.setItem('userInfo', JSON.stringify(userData));
      alert(`Welcome back, ${userData.fullName}!`);

      if (userData.role === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/studentDashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="loginSection">
      <div className="loginContainer">
        <div className="loginCard">
          <h2 className="loginTitle">Welcome Back</h2>
          <p className="loginSubtitle">Please enter your details to sign in</p>
          
          <form className="loginForm" onSubmit={handleLogin}>
            <div className="roleToggle">
              <button 
                type="button"
                className={`roleBtn ${role === 'student' ? 'roleBtnActive' : ''}`}
                onClick={() => setRole('student')}
              >
                Student
              </button>
              <button 
                type="button"
                className={`roleBtn ${role === 'admin' ? 'roleBtnActive' : ''}`}
                onClick={() => setRole('admin')}
              >
                Admin
              </button>
            </div>

            <div className="formGroup">
              <label className="formLabel">Email Address</label>
              <input 
                type="email" 
                className="formInput" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            
            <div className="formGroup">
              <label className="formLabel">Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'}  
                  className="formInput" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                >
                  {showPassword ? '🙅‍♀️' : '🤷‍♀️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btnLoginSubmit">
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>

            <p className="loginFooterText">
              Don't have an account? <Link to="/register" className="loginFooterLink">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;