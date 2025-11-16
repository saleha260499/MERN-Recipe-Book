import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import "./ViewRecipe.css";

export default function ViewRecipe({ recipes, searchTerm }) {
    const { id } = useParams();
    const recipe = recipes?.find((r) => r._id === id);

    // subtle parallax for the whole card
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-3, 3]);
    // ❌ If no recipe found
    if (!recipe)
        return <h2 className="not-found">Recipe not found</h2>;

    // ✔ Show the book-style recipe view when NOT searching
    return (
        <div className="vr-page">
            <motion.div
                className="vr-stage"
                style={{ x, rotate }}
                drag="x"
                dragConstraints={{ left: -40, right: 40 }}
                dragElastic={0.12}
                whileTap={{ scale: 0.995 }}
            >
                {/* Book */}
                <motion.div
                    className="book-container pro"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Ribbon bookmark */}
                    <motion.div
                        className="ribbon"
                        animate={{ y: [0, -30, 0] }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <span>Recipe</span>
                    </motion.div>

                    {/* Page flip */}
                    <div className="pages-wrapper">
                        {/* LEFT PAGE */}
                        <motion.section
                            className="page left-page"
                            initial={{ rotateY: -6 }}
                            animate={{ rotateY: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="left-inner">
                                {recipe.image && (
                                    <motion.img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="recipe-image"
                                        initial={{ scale: 0.96, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.7 }}
                                    />
                                )}

                                <h1 className="title">{recipe.title}</h1>

                                <h3 className="section-title purple">Ingredients</h3>
                                <div className="box purple-box">
                                    <p className="content whitespace">
                                        {recipe.ingredients}
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* RIGHT PAGE */}
                        <motion.section
                            className="page right-page"
                            initial={{ rotateY: 6 }}
                            animate={{ rotateY: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="right-inner">
                                <h3 className="section-title blue">Instructions</h3>
                                <div className="box blue-box">
                                    <p className="content whitespace">
                                        {recipe.instructions}
                                    </p>
                                </div>

                                <div className="meta-row">
                                    <div className="pill">
                                        ⏱ Serves: {recipe.servings ?? "—"}
                                    </div>
                                    <div className="pill">🕒 {recipe.time ?? "—"}</div>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    {/* Back Button */}
                    <div className="book-footer">
                        <button
                            className="back-btn"
                            onClick={() => window.history.back()}
                        >
                            ← Back
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
