import React, { useState } from "react";
import "./ToyFilter.scss";

const ToyFilter = ({ onFilterChange, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStock, setInStock] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debounceFilterChange({ searchTerm: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
    debounceFilterChange({ categories: selectedCategories });
  };

  const handleInStockChange = (e) => {
    setInStock(e.target.value);
    onFilterChange({ inStock: e.target.value });
  };

  const handleSortChange = (e) => {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);
    onFilterChange({ sortBy: sortByValue });
  };

  const debounceFilterChange = debounce((filters) => {
    onFilterChange({
      searchTerm,
      inStock,
      categories: selectedCategories,
      ...filters,
    });
  }, 300);

  return (
    <div className="toy-filter">
      <input
        type="text"
        placeholder="Search toys..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-categories">
        <h4>Categories:</h4>
        {categories.map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              value={cat}
              onChange={handleCategoryChange}
              checked={selectedCategories.includes(cat)}
            />
            {cat}
          </label>
        ))}
      </div>
      <div className="filter-stock">
        <label>
          <input
            type="radio"
            value=""
            checked={inStock === ""}
            onChange={handleInStockChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="inStock"
            checked={inStock === "inStock"}
            onChange={handleInStockChange}
          />
          In Stock
        </label>
        <label>
          <input
            type="radio"
            value="outOfStock"
            checked={inStock === "outOfStock"}
            onChange={handleInStockChange}
          />
          Out of Stock
        </label>
      </div>
      <div className="filter-sort">
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Created At</option>
          </select>
        </label>
      </div>
    </div>
  );
};

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default ToyFilter;
