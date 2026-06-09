import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (userInfo) {
      setFormData({
        fullName: userInfo.fullName,
        email: userInfo.email,
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://digital-archive-1znr.onrender.com/api/auth/profile', {
        userId: userInfo._id || userInfo.id, // Handle both _id and id cases  
        fullName: formData.fullName,
        email: formData.email,
      } );

      // Update localStorage with the new info
      const updatedInfo = { ...userInfo, ...response.data };
      localStorage.setItem('userInfo', JSON.stringify(updatedInfo));

      alert('✅ Profile updated successfully!');
      
      // Redirect back to dashboard
      if (userInfo.role === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/studentDashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <section className="loginSection">
      <div className="loginContainer">
        <div className="loginCard">
          <h2 className="loginTitle">Update Profile</h2>
          <p className="loginSubtitle">Edit your personal information</p>
          
          <form className="loginForm" onSubmit={handleUpdate}>
            <div className="formGroup">
              <label className="formLabel">Full Name</label>
              <input 
                type="text" 
                className="formInput" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required 
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Email Address</label>
              <input 
                type="email" 
                className="formInput" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>

            <button type="submit" className="btnLoginSubmit">
              Save Changes
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="mt-4 w-full text-gray-500 text-sm hover:text-indigo-600 transition-colors"
            >
              Cancel and Go Back
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
