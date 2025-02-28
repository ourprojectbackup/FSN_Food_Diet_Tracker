import React, { useReducer, useEffect, useState } from "react";
import foodReducer from "../reducer/foodReducer";
import MealSection from "../Components/MenuSection";
import foodData from "../data/Food_Items_Varieties.json";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MealTimings = () => {
    const mealIcons = {
        "early morning": "🌅",
        breakfast: "🍳",
        "mid morning": "☕",
        lunch: "🥗",
        evening: "🌆",
        dinner: "🍽️",
        "bed time": "🌙",
    };

    const navigate = useNavigate();
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setGradientPosition({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const initialState = JSON.parse(localStorage.getItem("foodQuantities")) || {};
    const [quantities, dispatch] = useReducer(foodReducer, initialState);

    useEffect(() => {
        localStorage.setItem("foodQuantities", JSON.stringify(quantities));
    }, [quantities]);

    const [expandedMeal, setExpandedMeal] = useState(null);

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 transition-all duration-300"
            style={{
                background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #7C3AED, #4F46E5)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h1 className="text-white text-3xl font-bold mb-6">
                🍽️ Your Daily Meal Plan
            </h1>

            <div className="w-full max-w-2xl space-y-4">
                {Object.keys(foodData).map((mealType) => (
                    <motion.div
                        key={mealType}
                        className="w-full bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-103 border border-transparent hover:border-purple-400"
                        whileHover={{ scale: 1.01 }}
                    >
                        <MealSection
                            mealType={mealType}
                            mealIcon={mealIcons[mealType] || "🍽️"}
                            foodItems={foodData[mealType] || []}
                            quantities={quantities}
                            dispatch={dispatch}
                            expandedMeal={expandedMeal}
                            setExpandedMeal={setExpandedMeal} // Pass state handler
                        />
                    </motion.div>
                ))}
            </div>

            {/* Button Section */}
            <motion.div
                className="flex flex-wrap justify-center gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Reset Selection Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch({ type: "RESET" })}
                    className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
                >
                    🔄 Reset Selection
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all"
                    onClick={() => navigate("/NutritionReport")}
                >
                    📊 View Nutrition Report
                </motion.button>
                {/* Reset User Data Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        localStorage.setItem("userData", "{}");
                        dispatch({ type: "RESET" });
                        navigate("/");
                    }}
                    className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
                >
                    🗑️ Reset User Data
                </motion.button>

                {/* View Nutrition Report Button */}
              
            </motion.div>
        </motion.div>
    );
};

export default MealTimings;
