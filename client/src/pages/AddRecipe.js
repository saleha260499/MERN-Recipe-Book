import React, { useState } from "react";

function AddRecipe() {
    const [newRecipe, setNewRecipe] = useState({
        title: "",
        ingredients: "",
        instructions: "",
        image: "",
    });

    const handleChange = (e) => {
        setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/recipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRecipe),
        });
        await res.json();
        alert("Recipe added successfully!");
        setNewRecipe({ title: "", ingredients: "", instructions: "", image: "" });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ color: "#D36B82" }}>Add New Recipe</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newRecipe.title}
                    onChange={handleChange}
                    required
                    style={{ margin: "10px 0", padding: "10px" }}
                />
                <textarea
                    name="ingredients"
                    placeholder="Ingredients"
                    value={newRecipe.ingredients}
                    onChange={handleChange}
                    required
                    style={{ margin: "10px 0", padding: "10px" }}
                />
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={newRecipe.instructions}
                    onChange={handleChange}
                    required
                    style={{ margin: "10px 0", padding: "10px" }}
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={newRecipe.image}
                    onChange={handleChange}
                    style={{ margin: "10px 0", padding: "10px" }}
                />
                <button type="submit" style={{ backgroundColor: "#D36B82", color: "white", padding: "10px", border: "none", borderRadius: "8px" }}>
                    Add Recipe
                </button>
            </form>
        </div>
    );
}

export default AddRecipe;
