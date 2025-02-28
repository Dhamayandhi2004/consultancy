import React from "react";
import "../css/contact.css"; // Update path if needed
import '@fortawesome/fontawesome-free/css/all.min.css';


const Contact = () => {
  return (
    <div className="contact-page">
      {/* Card 1: Contact Info */}
      <div className="contact-card">
        <h2 className="card-title">Contact Info</h2>
        <p className="card-description">
          A Young. Vibrant. Hardworking Digital Transporting
          <br />
          Company Built for Transportation
        </p>
        <div className="info-item">
          <div className="icon-circle">
            <i className="fas fa-phone"></i>
          </div>
          <span className="info-text">+91 85086 63743</span>
        </div>
        <div className="info-item">
          <div className="icon-circle">
            <i className="fas fa-envelope"></i>
          </div>
          <span className="info-text">vaibhavilogistics@gmail.com</span>
        </div>
      </div>

     
      {/* Card 3: Opening Hours */}
      <div className="contact-card">
        <h2 className="card-title">Opening Hours</h2>
        <p className="card-text">Monday - Friday &nbsp; 09:00 AM – 10:00 PM</p>
        <p className="card-text">Saturday &nbsp; 09:00 AM – 03:00 PM</p>
        <p className="card-text">Sunday &nbsp; Closed</p>

        <div className="social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
