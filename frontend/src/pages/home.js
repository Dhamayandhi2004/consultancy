import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`hero ${isScrolled ? "scrolled" : ""}`}>
      <div className="overlay">
        <h2 className="sub-heading">Welcome to Our Website</h2>
        <h1 className="main-heading">Your Trusted Delivery Partner</h1>
        <button className="cta-button" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
