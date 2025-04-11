import React from 'react';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <video autoPlay loop muted className="dashboard-video">
        <source src="/video/adminbg.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="dashboard-overlay">
        <h2>Welcome, Admin</h2>
        <p>This is your dashboard homepage.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
