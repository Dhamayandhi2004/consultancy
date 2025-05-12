import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/feedback.css";

const Feedback = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newReview, setNewReview] = useState({
    text: "",
    rating: 0,
    user: "",
    date: new Date().toISOString().split("T")[0],
  });

  const API_URL = "https://consultancy-1-d68u.onrender.com/api/feedback";

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        alert("Failed to load feedbacks. Please try again later.");
      }
    };

    fetchFeedbacks();
  }, [API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (star) => {
    setNewReview((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newFeedback = await response.json();
      setFeedbacks((prev) => [...prev, newFeedback]);
      setShowModal(false);
      alert("Feedback submitted successfully!");

    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  // Don't show the feedback button on home route
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="feedback-container">
      <h2>Customer Reviews</h2>

      <button className="feedback-float-btn" onClick={() => setShowModal(true)}>
        ✨ Give Feedback
      </button>

      {feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        feedbacks.map((review, index) => (
          <div key={index} className="review-box">
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`star ${star <= review.rating ? "filled" : ""}`}>★</span>
              ))}
            </div>
            <p className="review-text">"{review.text}"</p>
            <p className="review-meta">- {review.user}, {review.date}</p>
          </div>
        ))
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Submit Your Feedback</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="user"
                placeholder="Your Name"
                onChange={handleInputChange}
                required
              />
              <textarea
                name="text"
                placeholder="Your Review"
                onChange={handleInputChange}
                required
              />
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= newReview.rating ? "filled" : ""}`}
                    onClick={() => handleRatingClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
