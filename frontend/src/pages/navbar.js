import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">VAIBHAVI LOGISTICS</div>

      {/* Hamburger Icon */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Nav Links */}
      <div className={`nav-container ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contact" },
          ].map((page) => (
            <li key={page.name}>
              <Link
                to={page.path}
                className={location.pathname === page.path ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ORDER Button */}
        <button className="appointment-btn">ORDER</button>
      </div>
    </nav>
  );
};

export default Navbar;
