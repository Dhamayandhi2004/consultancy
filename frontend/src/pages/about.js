import React, { useEffect, useRef, useState } from "react";
import "../css/about.css";
import { Truck, Globe, ShieldCheck } from "lucide-react";

function About() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    
    // Trigger fade-in effect when component mounts
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  return (
    <div ref={aboutRef} className={`about-container ${isVisible ? "loaded" : ""}`} id="about">
      {/* Glassy Text Section */}
      <div className="about-text">
        <h1>Welcome to Our Transport Services</h1>
        <h2>Reliable. Fast. Efficient.</h2>
        <p>
          We provide top-notch transportation and logistics services to ensure
          your goods are delivered safely and on time. Our advanced tracking
          system and dedicated team guarantee a hassle-free experience.
        </p>

        {/* Key Features Section */}
        <div className="features">
          <div className="feature">
            <Truck size={40} className="feature-icon" />
            <span>On-Time Delivery</span>
          </div>
          <div className="feature">
            <Globe size={40} className="feature-icon" />
            <span>Global Network</span>
          </div>
          <div className="feature">
            <ShieldCheck size={40} className="feature-icon" />
            <span>Secure & Trusted</span>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="vision-container">
          <span className="vision-text">🚀 Our Vision: Excellence in Logistics</span>
        </div>
      </div>
    </div>
  );
}

export default About;
