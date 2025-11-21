import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ searchTerm, setSearchTerm }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          "https://mern-recipebook-backend.onrender.com/api/recipes"
        );
        const data = await res.json();
        setAllRecipes(Array.isArray(data) ? data : data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes(); // CALL the function inside useEffect
  }, []);

  // Filter suggestions dynamically (outside useEffect)
  const suggestions = searchTerm
    ? allRecipes.filter(
        (r) => r.title && r.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelect = (id, title) => {
    setSearchTerm(title);
    navigate(`/view/${id}`);
  };

  return (
    <nav className="navbar">
      <h2>
        <Link
          to="/"
          style={{
            margin: "0 10px",
            color: "#D36B82",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          🍰 Recipe Book
        </Link>
      </h2>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Dropdown Suggestion Box */}
        {searchTerm && (
          <ul className="suggestions-box">
            {suggestions.length > 0 ? (
              suggestions.map((recipe) => (
                <li
                  key={recipe._id}
                  onClick={() => handleSelect(recipe._id, recipe.title)}
                >
                  {recipe.title}
                </li>
              ))
            ) : (
              <li style={{ color: "#999" }}>No recipes found</li>
            )}
          </ul>
        )}
      </div>

      <div>
        <Link
          to="/"
          style={{
            margin: "0 10px",
            color: "#333",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Home
        </Link>
        <Link
          to="/add"
          style={{
            margin: "0 10px",
            color: "#333",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Add Recipe
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
