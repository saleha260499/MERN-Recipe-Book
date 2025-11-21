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


// MongoDB connectionconst mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Recipe Book API 🍲');
});

// Start the serverconst PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
