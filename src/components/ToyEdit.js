import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateToy, addToy } from "../store/toys/toysSlice";
import { AuthService } from "../services/auth.service";
import "./ToyEdit.scss";

const ToyEdit = () => {
  const { toyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toy = useSelector((state) =>
    state.toys.toys.find((toy) => toy.id === parseInt(toyId))
  );

  const [name, setName] = useState(toy?.name || "");
  const [price, setPrice] = useState(toy?.price || "");
  const [image, setImage] = useState(toy?.image || "");
  const [category, setCategory] = useState(toy?.category || "");

  const user = AuthService.getLoggedInUser();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      alert("Access Denied!");
      navigate("/");
    }
  }, [user, navigate]);

  const handleSave = () => {
    if (toy) {
      dispatch(
        updateToy({
          id: toy.id,
          name,
          price: parseFloat(price),
          image,
          category,
        })
      );
    } else {
      dispatch(
        addToy({
          id: Date.now(),
          name,
          price: parseFloat(price),
          image,
          category,
          inStock: true,
          messages: [],
        })
      );
    }
    navigate("/");
  };

  return (
    <div className="toy-edit">
      <h2>{toy ? "Edit Toy" : "Add New Toy"}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ToyEdit;
