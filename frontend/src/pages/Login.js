import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Email login handler using API
  const handleEmailLogin = async () => {
    try {
      const response = await axios.post('https://lms-4n6b.onrender.com/api/login', {
        email,
        password,
      });

      localStorage.setItem('userEmail', email);

      console.log('Login successful!', response.data);

      // Redirect based on email
      if (email === 'admin@gmail.com' && password === "admin@123") {
        navigate('/adminDashboard');
      } else {
        navigate('/userDashboard');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);

      if (error.response?.status === 404) {
        alert('Email is not registered.');
      } else if (error.response?.status === 401) {
        alert('Invalid Credentials.');
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem('userEmail', user.email);

      console.log('Google Sign-In successful:', user);
      navigate('/userDashboard');
    } catch (error) {
      console.error('Google Sign-In Error:', error.code, error.message);
      alert('Google Sign-In failed: ' + error.message);
    }
  };

  const goToRegister = () => navigate('/register');
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
        <p className="register-text">
          Don't have an account? <button className="register-link" onClick={goToRegister}>Register here</button>
        </p>
        <hr className="divider" />
        <button className="google-signin-btn" onClick={handleGoogleSignIn}>
          <img src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=600&name=image8-2.jpg" 
          alt="Google Logo" className="google-logo" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
