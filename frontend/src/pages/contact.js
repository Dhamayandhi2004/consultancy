import React from "react";
import "../css/contact.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const Contact = () => {
  const position = { lat: 11.2183, lng: 78.1670 }; // Updated to Namakkal, Paramathi Road
  const API_KEY = "AIzaSyAYVLpZz7UbRd58cEZikQ_fg5T9YkAJjm0";

  return (
    <div className="contact-page">
      {/* Contact Info Card */}
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
          <span className="info-text">+91 98426 14143, 99426 88911</span>
        </div>
        <div className="info-item">
          <div className="icon-circle">
            <i className="fas fa-envelope"></i>
          </div>
          <span className="info-text">vaibhavilogistics@yahoo.com</span>
        </div>
      </div>

      {/* Opening Hours Card */}
      <div className="contact-card">
        <h2 className="card-title">Opening Hours</h2>
        <p className="card-text">Monday - Friday &nbsp; 09:00 AM – 10:00 PM</p>
        <p className="card-text">Saturday &nbsp; 09:00 AM – 03:00 PM</p>
        <p className="card-text">Sunday &nbsp; Closed</p>

        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Google Map Card */}
      <div className="map-card">
        <h2 className="card-title">Our Location</h2>
        <APIProvider apiKey={API_KEY}>
          <div className="map-container">
            <Map zoom={15} center={position} mapId="YOUR_MAP_ID">
              <AdvancedMarker position={position}>
                <Pin background="#E74C3C" borderColor="#C0392B" glyphColor="#FFFFFF" />
                <InfoWindow>
                  <div className="info-window">
                    <h3>Vaibhavi Logistics</h3>
                    <p>6/948-A, Velmurugan Towers, Paramathi Road, Namakkal</p>
                  </div>
                </InfoWindow>
              </AdvancedMarker>
            </Map>
          </div>
        </APIProvider>
      </div>
    </div>
  );
};

export default Contact;
