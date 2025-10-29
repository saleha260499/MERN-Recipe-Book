import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
});

// Allow plain string input and convert to array automatically
recipeSchema.pre("save", function (next) {
    if (typeof this.ingredients === "string") {
        this.ingredients = this.ingredients.split("\n").map((line) => line.trim());
    }
    next();
});

export default mongoose.model("Recipe", recipeSchema);
