import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ searchTerm, setSearchTerm }) {
    const [allRecipes, setAllRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/recipes")
            .then(res => res.json())
            .then(data =>
                setAllRecipes(Array.isArray(data) ? data : data.recipes || [])
            );
    }, []);

    // Filter suggestions
    const suggestions = searchTerm
        ? allRecipes.filter(r =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleSelect = (id, title) => {
        setSearchTerm(title);
        navigate(`/view/${id}`);
    };

    return (
        <nav className="navbar">
            <h2><Link to="/" style={{ margin: "0 10px", color: "#D36B82", textDecoration: "none", fontWeight: "bold", }} >🍰 Recipe Book</Link></h2>

            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                {/* Dropdown Suggestion Box */}
                {searchTerm && suggestions.length > 0 && (
                    <ul className="suggestions-box">
                        {suggestions.map((recipe) => (
                            <li
                                key={recipe._id}
                                onClick={() => handleSelect(recipe._id, recipe.title)}
                            >
                                {recipe.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div><Link to="/" style={{ margin: "0 10px", color: "#333", textDecoration: "none", fontWeight: "bold", }} > Home </Link>
                <Link to="/add" style={{ margin: "0 10px", color: "#333", textDecoration: "none", fontWeight: "bold", }} > Add Recipe </Link>
            </div>
        </nav>
    );
}

export default Navbar;
