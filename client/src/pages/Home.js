import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home({ searchTerm }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("https://mern-recipebook-backend.onrender.com/api/recipes")
            .then((res) => res.json())
            .then((data) =>
                setRecipes(Array.isArray(data) ? data : data.recipes || [])
            )
            .catch((err) => console.error(err));
    }, []);

    // 🔍 Filter recipes based on search term
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://mern-recipebook-backend.onrender.com/api/recipes/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Recipe deleted successfully!");
                window.location.reload();
            } else {
                const errorData = await res.json();
                alert(`Failed to delete recipe: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error deleting recipe:", error);
            alert("An error occurred while deleting the recipe.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ color: "#D36B82" }}>All Recipes</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "20px",
                }}
            >
                {(filteredRecipes.length === 0) ? (
                    <p style={{ fontSize: "18px", color: "#999" }}>
                        No recipes found.
                    </p>
                ) : (
                    filteredRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            style={{
                                border: "1px solid #eee",
                                borderRadius: "12px",
                                padding: "15px",
                                backgroundColor: "#fffafc",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            }}
                        >
                            <h6 style={{ textAlign: "right" }}>
                                <button
                                    onClick={() => handleDelete(recipe._id)}
                                    style={{
                                        cursor: "pointer",
                                        background: "none",
                                        border: "none",
                                    }}
                                >
                                    ❌
                                </button>
                            </h6>

                            <Link
                                to={`/view/${recipe._id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                {recipe.image && (
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        style={{
                                            width: "100%",
                                            borderRadius: "8px",
                                            height: "160px",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}

                                <h3 style={{ color: "#D36B82" }}>{recipe.title}</h3>
                                <p>
                                    <strong>Ingredients:</strong> {recipe.ingredients}
                                </p>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
