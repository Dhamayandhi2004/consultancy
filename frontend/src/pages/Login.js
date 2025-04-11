import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      localStorage.setItem('userEmail', email);
      navigate('/AdminDashboard');
    } else {
      alert('Invalid Credentials.');
    }
  };
  
  const handleClose = () => navigate('/');

  return (
    <div className="login-page">
      <div className="form-container">
        <span onClick={handleClose} className="close-btn">&times;</span>
        <h1 className="form-title">Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <button className="login-btn" onClick={handleEmailLogin}>Login</button>
        
      </div>
    </div>
  );
};

export default Login;
