import React from "react";
import "../css/services.css";
import { Link } from "react-router-dom";
import logisticsImg from "../assets/c2.jpg"; 
import FreightImg from "../assets/c3.jpg";
import WarehouseImg from "../assets/c4.jpg";
import packagingImg from "../assets/s.jpg";
import distributionImg from "../assets/b3.jpg";
import  consultationImg from "../assets/cons.jpg";
function Services() {
  const servicesData = [
    {
      title: "Logistics & Transportation",
      role: "Efficient & Reliable",
      description:
        "We ensure fast and secure delivery of your goods with real-time tracking and optimized routes.",
      image: logisticsImg,
    },
    {
      title: "Freight & Cargo",
      role: "Global Shipping",
      description:
        "Our freight services offer seamless national and international shipping for all types of goods.",
      image: FreightImg,
    },
    {
      title: "Warehouse & Storage",
      role: "Safe & Secure",
      description:
        "We provide modern warehousing solutions with climate control and inventory management systems.",
      image: WarehouseImg,
    },
 
    {
      title: "Packaging & Labeling",
      role: "Professional & Secure",
      description:
        "Proper packaging and labeling ensures the safety and integrity of your shipments throughout transit.",
      image: packagingImg,
    },
    {
      title: "Distribution",
      role: "Wide Reach",
      description:
        "Our distribution network covers local, regional, and national markets to get your goods wherever they need to go.",
      image: distributionImg,
    },
    {
      title: "Consultation & Planning",
      role: "Expert Guidance",
      description:
        "Our logistics experts provide strategic planning and consultation to optimize your supply chain operations.",
      image: consultationImg,
    },
  ];

  return (
    <div className="services-container">
      <h1 className="services-heading">
        We Offer the Best Transport & Goods Services
      </h1>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <div className="service-content">
              <h3 className="service-role">{service.role}</h3>
              <h2 className="service-title">{service.title}</h2>
              <p className="service-description">{service.description}</p>
              <Link to="/services" className="service-link">
                Know More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
