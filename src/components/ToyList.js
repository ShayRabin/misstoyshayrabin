import React from "react";
import ToyPreview from "./ToyPreview";
import "./ToyList.scss";

const ToyList = ({ toys, onEditToy, onDeleteToy, isAdmin, onAddToCart }) => {
  return (
    <div className="toy-list">
      {toys.map((toy) => (
        <ToyPreview
          key={toy.id}
          toy={toy}
          onEdit={onEditToy}
          onDelete={onDeleteToy}
          isAdmin={isAdmin}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ToyList;
