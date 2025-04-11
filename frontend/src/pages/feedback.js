import React from 'react';
import "../css/feedback.css";
const sampleReviews = [
  { text: "The service was excellent and fast!", rating: 5, user: "Arun", date: "2025-04-01" },
  { text: "Bus was clean and well-maintained.", rating: 4, user: "Divya", date: "2025-03-29" },
  { text: "Drivers are professional and polite.", rating: 5, user: "Kavin", date: "2025-03-25" },
  { text: "Had a delay, but overall good.", rating: 3, user: "Meena", date: "2025-03-22" },
  { text: "Very comfortable ride!", rating: 4, user: "Sathish", date: "2025-03-19" },
  { text: "Affordable and safe transport.", rating: 5, user: "Nandhini", date: "2025-03-15" },
  { text: "Could improve cleanliness.", rating: 3, user: "Raj", date: "2025-03-12" },
  { text: "Always on time. Appreciate it.", rating: 4, user: "Shree", date: "2025-03-10" },
  { text: "Friendly staff and smooth ride.", rating: 5, user: "Vimal", date: "2025-03-07" },
  { text: "Would recommend to friends.", rating: 5, user: "Anjali", date: "2025-03-05" }
];

const Feedback = () => {
  return (
    <div className="feedback-container">
      <h2>Customer Reviews</h2>
      {sampleReviews.map((review, index) => (
        <div key={index} className="review-box">
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= review.rating ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="review-text">"{review.text}"</p>
          <p className="review-meta">- {review.user}, {review.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Feedback;
