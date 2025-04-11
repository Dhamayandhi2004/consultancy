import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Transportation.css';

const Transportation = () => {
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/manage')
      .then(res => setBuses(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredBuses = buses.filter(bus =>
    bus.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suggestions = searchTerm
    ? buses
        .filter(bus =>
          bus.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bus.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bus.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bus.route.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSuggestionClick = (suggestionText) => {
    setSearchTerm(suggestionText);
    setShowSuggestions(false);
  };

  const getTypeBadge = (type) => {
    let color = 'gray';
    if (type.toLowerCase() === 'standard') color = 'green';
    else if (type.toLowerCase() === 'deluxe') color = 'orange';
    else if (type.toLowerCase() === 'ac') color = 'skyblue';
    return (
      <span className="type-badge" style={{ backgroundColor: color }}>
        {type}
      </span>
    );
  };

  return (
    <div className="transportation-container">
      <h2>Available Buses</h2>
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by route, driver, or location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
          />
          <button>Search</button>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((bus, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(`${bus.from} to ${bus.to}`)}
              >
                {bus.from} to {bus.to} - {bus.driverName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bus-grid">
        {filteredBuses.length === 0 ? (
          <p>No buses available.</p>
        ) : (
          filteredBuses.map(bus => (
            <div key={bus._id} className="bus-card">
              <div className="card-header">
                <h3>{bus.from} to {bus.to}</h3>
                {getTypeBadge(bus.busType)}
              </div>
              <p><strong>Driver:</strong> {bus.driverName}</p>
              <p><strong>Bus No:</strong> {bus.busNumber}</p>
              <p><strong>Timings:</strong> {bus.departureTime} - {bus.arrivalTime}</p>
              <p><strong>Contact:</strong> {bus.contact}</p>
              <p><strong>Fare:</strong> ₹{bus.fare}</p>
              <p><strong>For every {bus.frequency} mins</strong></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transportation;
