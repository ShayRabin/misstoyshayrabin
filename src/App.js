import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  addToy,
  removeToy,
  updateToy,
  addCategory,
  loadToys,
} from "./store/toys/toysSlice";
import toysData from "./data/toys.json";
import "./App.scss";
import ToyList from "./components/ToyList";
import ToyFilter from "./components/ToyFilter";
import ToyDetails from "./components/ToyDetails";
import ToyEdit from "./components/ToyEdit";
import Login from "./components/Login";
import { AuthService } from "./services/auth.service";
import Header from "./components/Header";
import Cart from "./components/Cart";

const App = () => {
  const dispatch = useDispatch();
  const { toys, categories } = useSelector((state) => state.toys);

  const [filters, setFilters] = useState({
    searchTerm: "",
    inStock: "",
    categories: [],
    sortBy: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newToyData, setNewToyData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });
  const [cart, setCart] = useState([]);

  const loggedInUser = AuthService.getLoggedInUser();
  const isAdmin = loggedInUser?.isAdmin || false;

  useEffect(() => {
    const fetchToys = async () => {
      try {
        dispatch(loadToys(toysData));
        console.log("Toys loaded:", toysData);
      } catch (error) {
        console.error("Failed to load toys:", error);
      }
    };
    fetchToys();
  }, [dispatch]);

  const handleAddToCart = (toy) => {
    setCart((prevCart) => [...prevCart, toy]);
    alert(`${toy.name} has been added to your cart!`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewToyData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToy = () => {
    if (!isAdmin) {
      alert("Only admins can add toys!");
      return;
    }
    if (
      newToyData.name.trim() &&
      newToyData.price &&
      newToyData.image &&
      newToyData.category
    ) {
      const newToy = {
        id: Date.now(),
        ...newToyData,
        price: parseFloat(newToyData.price),
        inStock: true,
      };
      dispatch(addToy(newToy));
      setNewToyData({ name: "", price: "", image: "", category: "" });
      setIsModalOpen(false);
    } else {
      alert("Please fill in all fields before saving.");
    }
  };

  const handleAddCategory = () => {
    if (!isAdmin) {
      alert("Only admins can add categories!");
      return;
    }
    const newCategory = prompt("Enter new category:");
    if (newCategory) {
      dispatch(addCategory(newCategory));
    }
  };

  const handleDeleteToy = (toyId) => {
    if (!isAdmin) {
      alert("Only admins can delete toys!");
      return;
    }
    dispatch(removeToy(toyId));
  };

  const filteredToys = toys
    .filter((toy) => {
      const matchesName = toy.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const matchesStock =
        filters.inStock === ""
          ? true
          : filters.inStock === "inStock"
          ? toy.inStock
          : !toy.inStock;
      const matchesCategories =
        filters.categories?.length > 0
          ? filters.categories.includes(toy.category)
          : true;

      return matchesName && matchesStock && matchesCategories;
    })
    .sort((a, b) => {
      if (!filters.sortBy) return 0;
      if (filters.sortBy === "name") return a.name.localeCompare(b.name);
      if (filters.sortBy === "price") return a.price - b.price;
      if (filters.sortBy === "createdAt")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const handleModalClose = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  return (
    <Router>
      <div>
        <Header cartCount={cart.length} />
        <Routes>
          <Route
            path="/"
            element={
              loggedInUser ? (
                <>
                  <ToyFilter
                    onFilterChange={handleFilterChange}
                    categories={categories}
                  />
                  {isAdmin && (
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <button
                        className="add-toy-button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Add Toy
                      </button>
                      <button onClick={handleAddCategory}>Add Category</button>
                    </div>
                  )}
                  <ToyList
                    toys={filteredToys}
                    onEditToy={(toy) => {
                      setNewToyData({
                        name: toy.name,
                        price: toy.price,
                        image: toy.image,
                        category: toy.category,
                      });
                      setIsModalOpen(true);
                    }}
                    onDeleteToy={handleDeleteToy}
                    isAdmin={isAdmin}
                    onAddToCart={handleAddToCart}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:toyId" element={<ToyDetails />} />
          <Route path="/edit/:toyId" element={<ToyEdit />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>

        {isModalOpen && (
          <div className="modal-overlay" onClick={handleModalClose}>
            <div className="modal-content">
              <h2>Add New Toy</h2>
              <input
                type="text"
                placeholder="Enter toy name"
                value={newToyData.name}
                onChange={(e) =>
                  setNewToyData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="number"
                placeholder="Enter toy price"
                value={newToyData.price}
                onChange={(e) =>
                  setNewToyData((prev) => ({ ...prev, price: e.target.value }))
                }
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "block", margin: "10px auto" }}
                />
                <input
                  type="text"
                  placeholder="Paste image URL"
                  value={newToyData.image}
                  onChange={(e) =>
                    setNewToyData((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  style={{ display: "block", margin: "10px auto" }}
                />
              </div>
              <select
                value={newToyData.category}
                onChange={(e) =>
                  setNewToyData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div>
                <button onClick={handleAddToy} className="add-toy-button">
                  Save
                </button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
