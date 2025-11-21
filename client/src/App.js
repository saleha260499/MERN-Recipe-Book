import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import ViewRecipe from "./pages/ViewRecipe.js";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/recipes`)
      .then(res => res.json())
      .then(data => setRecipes(Array.isArray(data) ? data : data.recipes || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} recipes={recipes} />} />

        <Route path="/add" element={<AddRecipe />} />
        <Route path="/view/:id" element={<ViewRecipe recipes={recipes} searchTerm={searchTerm} />} />
      </Routes>
    </Router>
  );
}

export default App;
