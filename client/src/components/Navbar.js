import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ searchTerm, setSearchTerm }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false); // track dropdown visibility
  const navigate = useNavigate();
  const wrapperRef = useRef(null); // ref for detecting outside clicks

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

    fetchRecipes();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter suggestions dynamically
  const suggestions = searchTerm
    ? allRecipes.filter(
        (r) => r.title && r.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelect = (id, title) => {
    setSearchTerm(title);
    setShowSuggestions(false);
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

      <div className="search-wrapper" ref={wrapperRef} style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true); // show suggestions while typing
          }}
          className="search-input"
          style={{ paddingRight: "30px" }}
        />

        {/* Clear X button */}
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setShowSuggestions(false);
            }}
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "16px",
              color: "#999",
            }}
          >
            ×
          </button>
        )}

        {/* Dropdown Suggestion Box */}
        {showSuggestions && searchTerm && (
          <ul
            className="suggestions-box"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              border: "1px solid #ddd",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {suggestions.length > 0 ? (
              suggestions.map((recipe) => (
                <li
                  key={recipe._id}
                  onClick={() => handleSelect(recipe._id, recipe.title)}
                  style={{ padding: "8px", cursor: "pointer" }}
                >
                  {recipe.title}
                </li>
              ))
            ) : (
              <li style={{ padding: "8px", color: "#999" }}>No recipes found</li>
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
