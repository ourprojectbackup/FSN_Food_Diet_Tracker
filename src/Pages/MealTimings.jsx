import React, { useReducer, useEffect, useState } from "react";
import foodReducer from "../reducer/foodReducer";
import MealSection from "../Components/MenuSection";
import foodData from "../data/Food_Items_Varieties.json";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ActivitySection from "../Components/ActivitySection";
import activityReducer from "../reducer/activityReducer";

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

    const activityData = {
        "Light Activities": [
            { id: "light-1", name: "Watching TV", kcal: 86, parent: "Light Activities" },
            { id: "light-2", name: "Sleeping", kcal: 57, parent: "Light Activities" },
            { id: "light-3", name: "Typing", kcal: 108, parent: "Light Activities" },
            { id: "light-4", name: "Sitting", kcal: 108, parent: "Light Activities" },
            { id: "light-5", name: "Walking 4 Km/hr", kcal: 160, parent: "Light Activities" },
            { id: "light-6", name: "Volley Ball", kcal: 180, parent: "Light Activities" },
            { id: "light-7", name: "Shopping", kcal: 204, parent: "Light Activities" },
            { id: "light-8", name: "Standing", kcal: 208, parent: "Light Activities" },
            { id: "light-9", name: "Fishing", kcal: 222, parent: "Light Activities" },
            { id: "light-10", name: "Table Tennis", kcal: 245, parent: "Light Activities" },
        ],
        "Moderate Activities": [
            { id: "moderate-1", name: "Cleaning/Mopping", kcal: 210, parent: "Moderate Activities" },
            { id: "moderate-2", name: "Gardening", kcal: 300, parent: "Moderate Activities" },
            { id: "moderate-3", name: "Shuttle", kcal: 348, parent: "Moderate Activities" },
            { id: "moderate-4", name: "Cycling 15 Km/hr", kcal: 360, parent: "Moderate Activities" },
            { id: "moderate-5", name: "Dancing", kcal: 372, parent: "Moderate Activities" },
            { id: "moderate-6", name: "Tennis", kcal: 392, parent: "Moderate Activities" },
            { id: "moderate-7", name: "Running 6 Km/hr", kcal: 353, parent: "Moderate Activities" },
        ],
        "Intense Activities": [
            { id: "intense-1", name: "Running 8 Km/hr", kcal: 522, parent: "Intense Activities" },
            { id: "intense-2", name: "Running 10 Km/hr", kcal: 655, parent: "Intense Activities" },
            { id: "intense-3", name: "Running 12 Km/hr", kcal: 750, parent: "Intense Activities" },
        ],
    };
    const activityIcons = {
        "Light Activities": "💤",
        "Moderate Activities": "🚴‍♂️",
        "Intense Activities": "🏃‍♂️",
        Watching: "📺",
        Sleeping: "🛌",
        Typing: "⌨️",
        Cleaning: "🧹",
        Cycling: "🚲",
        Dancing: "💃",
        Running: "🏃‍♂️",
        Walking: "🚶‍♀️",
        Standing: "🧍‍♂️",
        Shuttle: "🏸",
        Tennis: "🎾",
        Volleyball: "🏐",
        Shopping: "🛍️",
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


    const [tot,settot] = useState(0)
    const initialactivityState = JSON.parse(localStorage.getItem("activityQuantities")) || {};


    const [activityquantities, activitydispatch] = useReducer(activityReducer, initialactivityState);

    useEffect(() => {
        localStorage.setItem("activityQuantities", JSON.stringify(activityquantities));
      

        const totalCalories = Object.values(activityquantities).reduce((acc, activity) => {
            return acc + activity.kcal * activity.quantity;
          }, 0);
          

          settot(totalCalories)
    }, [activityquantities]);




    const [expandedMeal, setExpandedMeal] = useState(null);
    const [expandedActivity, setExpandedActivity] = useState(null);

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 transition-all duration-300"
            // style={{
            //     background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #7C3AED, #4F46E5)`,
            // }}
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

            <h1 className="text-white text-3xl font-bold my-10">
                🔥 Your Daily Calorie Expenditure
            </h1>

            <div className="w-full max-w-2xl space-y-4">
                {Object.keys(activityData).map((activity) => (
                    <motion.div
                        key={activity}
                        className="w-full bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-103 border border-transparent hover:border-purple-400"
                        whileHover={{ scale: 1.01 }}
                    >
                        <ActivitySection
                            mealType={activity}
                            mealIcon={activityIcons[activity] || "🏃‍♂️"}
                            foodItems={activityData[activity] || []}
                            quantities={activityquantities}
                            dispatch={activitydispatch}
                            expandedMeal={expandedActivity}
                            setExpandedMeal={setExpandedActivity}
                        />
                    </motion.div>
                ))}

            </div>


            <h1 className="text-white text-3xl font-bold my-10">
            🔥 Calories Burned : {tot}
            </h1>


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
                    onClick={() => {dispatch({ type: "RESET" });activitydispatch({ type: "RESET" });
                
                    }}
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
                        activitydispatch({ type: "RESET" });
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
