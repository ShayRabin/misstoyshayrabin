import React from "react";
import "./ToyPreview.scss";

const ToyPreview = ({ toy, onEdit, onDelete, isAdmin, onAddToCart }) => {
  return (
    <div className="toy-card">
      <img src={toy.image} alt={toy.name} className="toy-image" />
      <div className="toy-name">{toy.name}</div>
      <div className="toy-category">Category: {toy.category}</div>
      <div className="toy-price">${toy.price.toFixed(2)}</div>
      <div className="card-buttons">
        {isAdmin ? (
          <>
            <button className="edit-button" onClick={() => onEdit(toy)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(toy.id)}>
              Delete
            </button>
          </>
        ) : (
          <button
            className="add-to-cart-button"
            onClick={() => onAddToCart(toy)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ToyPreview;
