import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ToyMessages from "./ToyMessages";
import "./ToyDetails.scss";

const ToyDetails = () => {
  const { toyId } = useParams();
  const toy = useSelector((state) =>
    state.toys.toys.find((toy) => toy.id === parseInt(toyId))
  );

  if (!toy) {
    return <p className="error-message">Toy not found!</p>;
  }

  return (
    <div className="toy-details">
      <h2>{toy.name}</h2>
      <div className="toy-info">
        <img src={toy.image} alt={toy.name} className="toy-image" />
        <p>
          <span>Category:</span> {toy.category}
        </p>
        <p>
          <span>Price:</span> ${toy.price.toFixed(2)}
        </p>
        <p>
          <span>In Stock:</span> {toy.inStock ? "Yes" : "No"}
        </p>
      </div>
      {/* הצגת הודעות */}
      <div className="messages-section">
        <h3>Messages</h3>
        {toy.messages && toy.messages.length > 0 ? (
          <ToyMessages toy={toy} />
        ) : (
          <p>No messages yet. Be the first to add one!</p>
        )}
      </div>
      <Link to="/" className="back-button">
        Back to List
      </Link>
    </div>
  );
};

export default ToyDetails;
