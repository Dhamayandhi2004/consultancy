import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from './AuthContext';
import "../css/Navbar.css";

const Navbar = ({ onFeedbackClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  // ❌ Hide navbar on /admin login page
  if (path === "/admin") return null;

  // ✅ Show custom admin navbar on both /AdminDashboard and /manage
  if (path === "/AdminDashboard" || path === "/manage") {
    return (
      <nav className="navbar admin-navbar">
        <div className="logo">VAIBHAVI LOGISTICS ADMIN</div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className={`nav-container ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/AdminDashboard" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/manage" onClick={() => setMenuOpen(false)}>
                Manage
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  // ✅ Default navbar for regular users
  return (
    <nav className="navbar">
      <div className="logo">VAIBHAVI LOGISTICS</div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <div className={`nav-container ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          {[
            { name: "Home", path: "/" },
            { name: "Transportation", path: "/transportation" },
            { name: "Services", path: "/services" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
            { name: "Feedback", path: "/feedback" },
          ].map((page) => (
            <li key={page.name}>
              <Link
                to={page.path}
                className={path === page.path ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
