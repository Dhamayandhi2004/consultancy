import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    if (email === 'admin@gmail.com' && password === 'admin@123') {
      localStorage.setItem('userEmail', email);
      navigate('/AdminDashboard', { replace: true });
    } else {
      alert('Invalid Credentials.');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

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

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button className="login-btn" onClick={handleEmailLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
