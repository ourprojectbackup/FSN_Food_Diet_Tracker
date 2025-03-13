import React, { useState, useEffect } from "react";
import SubMenuSection from "./SubMenuSection";
import { motion, AnimatePresence } from "framer-motion";
import SubActivitySection from "./SubActivitySection";

const ActivitySection = ({ mealType, mealIcon, foodItems, quantities, dispatch, expandedMeal, setExpandedMeal }) => {

  const capitalizeWords = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

 
  const calculateNutrition = (storedQuantities) => {
    
    let nutritionData = {};
  
    Object.values(storedQuantities).forEach((food) => {
      const qty = food.quantity || 0; // Ensure quantity is present and valid
      if (qty <= 0) return; // Skip if quantity is 0 or less
  
      const mealtime = food.parent || "Unknown"; // Ensure mealtime exists
      if (!nutritionData[parent]) {
        nutritionData[parent] = { calories: 0 };
      }
  
      // Accumulate total nutrition, ensuring values are valid numbers
      nutritionData[parent].calories += (food["kcal"] || 0) * qty;
    });
  
    // Optional: Round values for cleaner UI display
    Object.keys(nutritionData).forEach((meal) => {
      nutritionData[meal].calories = parseFloat(nutritionData[meal].calories.toFixed(2));
    });
  
    return nutritionData;
  };
  

  const isExpanded = expandedMeal === mealType;
  const toggleExpand = () => setExpandedMeal(isExpanded ? null : mealType);


 

  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("activityQuantities")) || {}; // Get latest data
    //console.log("Latest Reducer Data:", storedQuantities);
    const updatedNutrition = calculateNutrition( storedQuantities);
  
    setNutrition(updatedNutrition);
  }, [quantities]);

  // Calculate total nutrition values
  const [nutrition, setNutrition] = useState();


  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white transition-all duration-300 
                    hover:shadow-xl hover:border-blue-400 cursor-pointer w-full max-w-xl mx-auto">
      
      <h2
  onClick={toggleExpand}
  className="text-3xl font-black flex items-center justify-between 
             py-3 px-5 rounded-xl shadow-md bg-white bg-opacity-10 
             hover:shadow-lg transition-all duration-300 cursor-pointer"
>
  <span className="flex items-center gap-3">
    {/* Meal Icon - Keep it visible with no gradient effect */}
    <motion.span 
      initial={{ scale: 1 }} 
      whileHover={{ scale: 1.1 }} 
      transition={{ duration: 0.3 }}
      className="text-4xl" // Make icon bigger
    >
      {mealIcon}
    </motion.span> 

    {/* Gradient text only for mealType */}
    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                     bg-clip-text text-transparent">
      {capitalizeWords(mealType)}
    </span>
  </span>

  {/* Dropdown arrow with animation */}
  <motion.span 
    animate={{ rotate: isExpanded ? 180 : 0 }} 
    transition={{ duration: 0.3 }} 
    className="text-gray-700 hover:text-black transition-colors"
  >
    {isExpanded ? "▲" : "▼"}
  </motion.span>
</h2>



{nutrition?.meal && (
  <motion.div 
    className="p-3 bg-gray-100 rounded-lg shadow-md mt-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h3 className="text-md font-semibold text-gray-700 mb-1">{capitalizeWords(mealType)}</h3>

    <div className="flex justify-between text-gray-600 text-sm px-2 py-1">
      <p>🔥 Calories Burned: <span className="font-bold text-red-500">{nutrition[mealType]?.calories.toFixed(2)} kcal</span></p>
    </div>
  </motion.div>
)}

    

      {/* Expandable Submenus */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-2"
          >
            {Object.keys(foodItems).map((submenu) => (
              <SubActivitySection
                key={submenu}
                mealType={submenu}
                foodItems={foodItems[submenu] || []}
                quantities={quantities}
                dispatch={dispatch}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivitySection;
