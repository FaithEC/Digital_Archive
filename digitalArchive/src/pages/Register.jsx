import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
    // Send data to your backend API
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role
    } );

    alert(`Account created successfully for ${response.data.fullName}!`);
    navigate('/login');
  } catch (error) {
    // Show the error message from the backend (e.g., "User already exists")
    alert(error.response?.data?.message || "Registration failed. Please try again.");
  }
};
  //   // Simulate registration
  //   alert(`Account created for ${formData.fullName} as a ${formData.role}!`);
  //   navigate('/login');
  // };

  return (
    <section className="loginSection">
      <div className="loginContainer">
        <div className="loginCard">
          <h2 className="loginTitle">Create Account</h2>
          <p className="loginSubtitle">Join the Digital Archive community</p>
          
          <form className="loginForm" onSubmit={handleRegister}>
            <div className="roleToggle">
              <button 
                type="button"
                className={`roleBtn ${formData.role === 'student' ? 'roleBtnActive' : ''}`}
                onClick={() => setFormData({...formData, role: 'student'})}
              >
                Student
              </button>
              <button 
                type="button"
                className={`roleBtn ${formData.role === 'admin' ? 'roleBtnActive' : ''}`}
                onClick={() => setFormData({...formData, role: 'admin'})}
              >
                Admin
              </button>
            </div>

            <div className="formGroup">
              <label className="formLabel">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                className="formInput" 
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Email Address</label>
              <input 
                type="email" 
                name="email"
                className="formInput" 
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Password</label>
              <input 
                type="password" 
                name="password"
                className="formInput" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="formInput" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>

            <button type="submit" className="btnLoginSubmit">
              Register as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
            </button>

            <p className="loginFooterText">
              Already have an account? <Link to="/login" className="loginFooterLink">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
