import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { Element, scroller } from 'react-scroll'; // Import Element & scroller for smooth scrolling
import Navbar from './pages/navbar';
import Home from './pages/home';
import About from './pages/about';
import Services from './pages/services';
import Contact from './pages/contact';
import Transportation from './pages/transportation';
import './App.css';
import Login from './pages/Login'; // Adjust path as needed
import Feedback from './pages/feedback';
import AdminDashboard from './pages/AdminDashboard'; // create this component
import Manage from "./pages/manage";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const handleFeedbackClick = () => {
    setShowFeedbackPopup(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedbackPopup(false);
  };

  return (
    <Router>
      <div className="App">
      <video autoPlay muted loop className="background-video">
        <source src="/background.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <Navbar onFeedbackClick={handleFeedbackClick} />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={
            <>
              <Element name="home"><Home /></Element>
              <Element name="feedback"><Transportation/></Element>
              <Element name="services"><Services /></Element>
              <Element name="about"><About /></Element>
              <Element name="contact"><Contact /></Element>
              <Element name="feedback"><Feedback/></Element>
            </>
          } />
          <Route path="/transportation" element={<Transportation/>}/>
          <Route path="/services" element={<Services />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<Login/>} />  
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path ="/manage" element={<Manage/>}/>

          </Routes>

        {/* Feedback Popup */}
        {showFeedbackPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Leave a Review</h2>
              <textarea placeholder="Share your experience..."></textarea>

              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="star">★</span>
                ))}
              </div>

              <button>Submit</button>
              <button className="close-btn" onClick={handleCloseFeedback}>X</button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
