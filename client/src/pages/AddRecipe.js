import React, { useState } from "react";

function AddRecipe() {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: null, // File object
  });

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewRecipe((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newRecipe.title);
      formData.append("ingredients", newRecipe.ingredients);
      formData.append("instructions", newRecipe.instructions);
      if (newRecipe.image) {
        formData.append("image", newRecipe.image);
      }

      const res = await fetch(
        "https://mern-recipebook-backend.onrender.com/api/recipes",
        {
          method: "POST",
          body: formData, // Send as multipart/form-data
        }
      );

      const data = await res.json();
      alert("Recipe added successfully!");
      setNewRecipe({ title: "", ingredients: "", instructions: "", image: null });
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#D36B82" }}>Add New Recipe</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
      >
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
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          style={{ margin: "10px 0", padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#D36B82",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
