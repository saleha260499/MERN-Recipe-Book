import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recipeRoutes from "./routes/recipeRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/recipes", recipeRoutes);


// MongoDB connection
const MONGO_URI = "mongodb+srv://saleha_user:Saleha123@cluster0.mindwzn.mongodb.net/RecipeBook";
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Recipe Book API 🍲');
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
