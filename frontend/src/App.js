import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Element, scroller } from 'react-scroll'; // Import Element & scroller for smooth scrolling
import Navbar from './pages/navbar';
import Home from './pages/home';
import About from './pages/about';
import Services from './pages/services';
import Contact from './pages/contact';
import Login from './pages/Login';
import Register from './pages/register';
import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={
            <>
              <Element name="home">
                <Home />
              </Element>
              
              <Element name="about">
                <About />
              </Element>
              <Element name="services">
                <Services />
              </Element>
             
              <Element name="contact">
                <Contact />
              </Element>
              
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path ="/register" element={<Register/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
