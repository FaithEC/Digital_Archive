// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
 
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'student', // Default role
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     try {
//     // Send data to your backend API
//     const response = await axios.post('http://localhost:5000/api/auth/register', {
//       fullName: formData.fullName,
//       email: formData.email,
//       password: formData.password,
//       role: formData.role
//     } );
    
//     alert(`Account created successfully for ${response.data.fullName}!`);
//     navigate('/login');
//   } catch (error) {
//     // Show the error message from the backend (e.g., "User already exists")
//     alert(error.response?.data?.message || "Registration failed. Please try again.");
//   }

// };
//   //   // Simulate registration
//   //   alert(`Account created for ${formData.fullName} as a ${formData.role}!`);
//   //   navigate('/login');
//   // };

//   return (
//     <section className="loginSection">
//       <div className="loginContainer">
//         <div className="loginCard">
//           <h2 className="loginTitle">Create Account</h2>
//           <p className="loginSubtitle">Join the Digital Archive community</p>
          
//           <form className="loginForm" onSubmit={handleRegister}>
//             <div className="roleToggle">
//               <button 
//                 type="button"
//                 className={`roleBtn ${formData.role === 'student' ? 'roleBtnActive' : ''}`}
//                 onClick={() => setFormData({...formData, role: 'student'})}
//               >
//                 Student
//               </button>
//               <button 
//                 type="button"
//                 className={`roleBtn ${formData.role === 'admin' ? 'roleBtnActive' : ''}`}
//                 onClick={() => setFormData({...formData, role: 'admin'})}
//               >
//                 Admin
//               </button>
//             </div>

//             <div className="formGroup">
//               <label className="formLabel">Full Name</label>
//               <input 
//                 type="text" 
//                 name="fullName"
//                 className="formInput" 
//                 placeholder="Your name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required 
//               />
//             </div>

//             <div className="formGroup">
//               <label className="formLabel">Email Address</label>
//               <input 
//                 type="email" 
//                 name="email"
//                 className="formInput" 
//                 placeholder="email@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required 
//               />
//             </div>

//             <div className="formGroup">
//               <label className="formLabel">Password</label>
//               <div className="relative">
//                 <input 
//                   type={showPassword ? 'text' : 'password'} 
//                   name="password"
//                   className="formInput" 
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required 
//                 />
//                 <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
//                   >
//                     {showPassword ? '🙅‍♀️' : '🤷‍♀️'}
//                 </button>
//               </div>
//             </div>

//             <div className="formGroup">
//               <label className="formLabel">Confirm Password</label>
//               <div className="relative">
//                 <input 
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   className="formInput" 
//                   placeholder="••••••••"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required 
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
//                 >
//                   {showConfirmPassword ? '🙅‍♀️' : '🤷‍♀️'}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btnLoginSubmit">
//               Register as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
//             </button>

//             <p className="loginFooterText">
//               Already have an account? <Link to="/login" className="loginFooterLink">Login here</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field as user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const allowedDomain = 'edouniversity.edu.ng';

    if (!formData.fullName.trim())
      newErrors.fullName = 'Full name is required.';

      if (!formData.email.trim())
      newErrors.email = 'Email is required.';
    else if (!formData.email.endsWith(`@${allowedDomain}`))
      newErrors.email = 'Only Edo University email addresses are allowed.';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email address.';

    if (!formData.password)
      newErrors.password = 'Password is required.';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';

    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password.';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      setSuccessMessage(`Account created successfully for ${response.data.fullName}!`);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrors({ general: error.response?.data?.message || "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

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

            {/* General error */}
            {errors.general && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '10px'
              }}>
                {errors.general}
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div style={{
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '10px'
              }}>
                {successMessage}
              </div>
            )}

            <div className="formGroup">
              <label className="formLabel">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                className="formInput" 
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.fullName}</p>}
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
              />
              {errors.email && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.email}</p>}
            </div>

            <div className="formGroup">
              <label className="formLabel">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  className="formInput" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                >
                  {showPassword ? '🙅‍♀️' : '🤷‍♀️'}
                </button>
              </div>
              {errors.password && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.password}</p>}
            </div>

            <div className="formGroup">
              <label className="formLabel">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="formInput" 
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                >
                  {showConfirmPassword ? '🙅‍♀️' : '🤷‍♀️'}
                </button>
              </div>
              {errors.confirmPassword && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="btnLoginSubmit" disabled={loading}>
              {loading ? 'Creating account...' : `Register as ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}`}
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