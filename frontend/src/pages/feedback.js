import React from 'react';
import { useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom'; // import this
import "../css/feedback.css";

const Feedback = () => {
  const location = useLocation(); // get current route
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newReview, setNewReview] = useState({
    text: "",
    rating: 0,
    user: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .catch(err => console.error("Failed to fetch feedbacks:", err));
  }, []);

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
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      await res.json();
      alert("Feedback submitted!");
      setShowModal(false);

      // Refresh feedback list after submitting
      const updated = await fetch("http://localhost:5000/api/feedback");
      const updatedData = await updated.json();
      setFeedbacks(updatedData);
    } catch (error) {
      alert("Error submitting feedback!");
      console.error(error);
    }
  };
  

  // ❌ Don't show the feedback button on home route
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="feedback-container">
      <h2>Customer Reviews</h2>

      <button className="feedback-float-btn" onClick={() => setShowModal(true)}>
        ✨ Give Feedback
      </button>

      {feedbacks.map((review, index) => (
        <div key={index} className="review-box">
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`star ${star <= review.rating ? 'filled' : ''}`}>★</span>
            ))}
          </div>
          <p className="review-text">"{review.text}"</p>
          <p className="review-meta">- {review.user}, {review.date}</p>
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Submit Your Feedback</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="user" placeholder="Your Name" onChange={handleInputChange} required />
              <textarea name="text" placeholder="Your Review" onChange={handleInputChange} required />
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= newReview.rating ? 'filled' : ''}`}
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