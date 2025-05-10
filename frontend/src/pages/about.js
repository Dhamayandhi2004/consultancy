import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Truck, Globe, ShieldCheck } from "lucide-react";
import materialImage from "../assets/material.jpeg";
import "../css/about.css";
import TransportImage from "../assets/transport.jpeg";
import orderImage from "../assets/order.jpeg";
import warhouseImage from "../assets/warhouse.jpeg";
import demandImage from "../assets/demand.jpeg";
import inventoryImage from "../assets/inventory.jpg";
import supplyImage from "../assets/supply.png";


import customer1 from "../assets/customer1.jpeg";
import customer2 from "../assets/customer2.jpg";
import customer3 from "../assets/customer3.jpg";
import customer4 from "../assets/customer4.jpeg";
import customer5 from "../assets/customer5.jpg";
const articles = [
  {
    image: materialImage,
    title: "Material Sourcing",
    content:
      "Strategic material sourcing goes beyond cost minimization, involving comprehensive supplier vetting for quality assurance and ethical practices. Our global network identifies reliable partners while considering lead times, MOQs (Minimum Order Quantities), and sustainability certifications. We implement dual sourcing strategies to mitigate supply chain risks, and leverage commodity hedging to protect against market volatility. Our team also manages customs compliance and conducts regular supplier audits to ensure consistent material quality and regulatory adherence."
  },
  {
    image: TransportImage,
    title: "Transportation",
    content:
      "Our multimodal transportation solutions combine road, rail, sea, and air freight to optimize cost-efficiency and delivery speed. We employ real-time GPS tracking with predictive analytics for route optimization, reducing fuel consumption by up to 15%. Our carrier selection process evaluates 25+ performance metrics including on-time delivery rates and damage ratios. For temperature-sensitive goods, we provide climate-controlled containers with IoT-enabled monitoring, maintaining precise conditions throughout transit."
  },
  {
    image: orderImage,
    title: "Order Fulfillment",
    content:
      "Our automated fulfillment centers process 10,000+ SKUs with 99.9% accuracy using AI-driven pick-and-pack systems. We integrate directly with major eCommerce platforms for real-time order synchronization, offering same-day shipping for 95% of continental US orders. Our proprietary packaging algorithm reduces void space by 40%, lowering shipping costs and environmental impact. Returns management includes automated RMA processing and quality-controlled refurbishment services for reverse logistics efficiency."
  },
  {
    image: warhouseImage,
    title: "Warehousing",
    content:
      "Our smart warehouses feature automated storage/retrieval systems (AS/RS) with 30% higher density than conventional racking. We offer bonded warehousing, cross-docking, and value-added services like kitting and private labeling. Temperature-controlled zones maintain products at -25°C to 15°C with redundant cooling systems. Our WMS provides real-time inventory visibility with cycle counting accuracy of 99.95%, supported by RFID tagging and blockchain-based inventory tracking for high-value items."
  },
  {
    image: demandImage,
    title: "Demand Forecasting",
    content:
      "Using machine learning models that analyze 15+ data streams including market trends, weather patterns, and social sentiment, we achieve 92% forecast accuracy. Our system automatically adjusts safety stock levels and generates purchase orders when inventory falls below dynamic reorder points. We help clients implement ABC analysis and develop contingency plans for demand spikes during peak seasons or unexpected market shifts."
  },
  {
    image: inventoryImage,
    title: "Inventory Management",
    content:
      "Our cloud-based inventory optimization platform reduces carrying costs by 25% through dynamic ABC classification and SKU rationalization. We implement cycle counting programs with mobile barcode scanning that maintains 99.8% inventory accuracy. Our system supports FIFO, LIFO, and FEFO rotation methods with automated expiry alerts. For omnichannel retailers, we provide real-time inventory synchronization across all sales channels and physical locations."
  },
  {
    image: supplyImage,
    title: "Supply Chain Management",
    content:
      "We design resilient supply chains with mapped Tier 2-3 suppliers and alternative routing options. Our control tower solution provides end-to-end visibility with predictive risk analytics, identifying potential disruptions 60 days in advance. We facilitate VMI (Vendor Managed Inventory) programs and collaborative planning with CPFR (Collaborative Planning, Forecasting and Replenishment) methodologies. Our blockchain platform ensures transparent product provenance from raw materials to end consumers."
  }
];


// eslint-disable-next-line no-unused-vars
const customers = [
  { id: 1, image: customer1, name: "Emma Wilson" },
  { id: 2, image: customer2, name: "Sarah Johnson" },
  { id: 3, image: customer3, name: "Michael Chen" },
  { id: 4, image: customer4, name: "John Smith" },
  { id: 5, image: customer5, name: "Sofia Garcia" }
];
function About() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  return (
    <div ref={aboutRef} className={`about-container ${isVisible ? "loaded" : ""}`} id="about">
      {/* Article Section */}
      <section className="about-section">
        <div className="section-container">
          <h2 className="section-title">Featured Articles</h2>
          <div className="section-divider"></div>

          <Swiper
            modules={[Navigation, Pagination,Autoplay]}
            navigation={{
              nextEl: '.article-next',
              prevEl: '.article-prev',
            }}
            pagination={{
              clickable: true,
              el: '.article-pagination',
              type: 'bullets',
            }}
             autoplay={{ 
    delay: 2000,          // 5 seconds delay
    disableOnInteraction: false 
  }}
            className="articles-swiper"
            spaceBetween={30}
            loop={true}
          >
            {articles.map((article, index) => (
              <SwiperSlide key={index}>
                <div className="article-card">
                  <div className="article-content">
                    <div className="article-image-container">
                      {article.image ? (
                        <img src={article.image} alt={article.title} />
                      ) : (
                        <div className="image-placeholder" />
                      )}
                    </div>
                    <div className="article-text">
                      <h3>{article.title}</h3>
                      <p>{article.content}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="article-controls">
              <div className="article-pagination"></div>
            </div>
          </Swiper>
        </div>
      </section>

 <div className="customers-section">
  <h3>Our Valuable Partners</h3>
<Swiper
  modules={[Autoplay, Navigation]}
  navigation={{
    nextEl: '.customer-next',
    prevEl: '.customer-prev',
  }}
  className="customer-swiper"
  autoplay={{ 
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  }}
  loop={true}
  centeredSlides={true}
  spaceBetween={30}
  slidesPerView={1} // Add default slidesPerView
  breakpoints={{
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }}
  speed={900} // Add transition speed

  >
    {customers.map((customer) => (
      <SwiperSlide key={customer.id}>
        <div className="customer-item">
          <div className="customer-img">
            <img src={customer.image} alt={customer.name} />
          </div>
          <div className="customer-name">{customer.name}</div>
        </div>
      </SwiperSlide>
    ))}
    <div className="customer-navigation">
     
    </div>
  </Swiper>
</div>

    {/* Features Section */}
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

        
      </div>
    

  );
}

export default About;