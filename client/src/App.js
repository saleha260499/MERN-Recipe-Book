import React, { useState, useEffect } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  // Fetch recipes from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  // Submit new recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });
    const data = await res.json();
    setRecipes([...recipes, data]);
    setNewRecipe({ title: "", ingredients: "", instructions: "" });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🍰 Recipe Book</h1>

      {/* Add Recipe Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newRecipe.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="ingredients"
          placeholder="Ingredients"
          value={newRecipe.ingredients}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={newRecipe.instructions}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Add Recipe</button>
      </form>

      {/* Display Recipes */}
      <div>
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{recipe.title}</h3>
            <p>
              <strong>Ingredients:</strong><br />
              {Array.isArray(recipe.ingredients)
                ? recipe.ingredients.map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))
                : recipe.ingredients.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}

            </p>

            <p><strong>Instructions:</strong> {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
