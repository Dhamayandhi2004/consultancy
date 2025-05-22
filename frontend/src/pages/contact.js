import React from "react";
import "../css/contact.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Contact = () => {
  const position = [11.2183, 78.1670]; // Namakkal location

  return (
    <div className="contact-page">
      {/* Contact Info Card */}
      <div className="contact-card">
        <h2 className="card-title">Contact Info</h2>
        <p className="card-description">
          A Young. Vibrant. Hardworking Digital Transporting<br />
          Company Built for Transportation
        </p>

        <div className="info-item">
          <div className="icon-circle" aria-label="Phone">
            <i className="fas fa-phone"></i>
          </div>
          <span className="info-text">+91 98426 14143, 99426 88911</span>
        </div>

        <div className="info-item">
          <div className="icon-circle" aria-label="Email">
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
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Map Location Card */}
      <div className="map-card">
        <h2 className="card-title">Our Location</h2>
        <div className="map-container">
          <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                <b>Vaibhavi Logistics</b><br />
                6/948-A, Velmurugan Towers, Paramathi Road, Namakkal
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
