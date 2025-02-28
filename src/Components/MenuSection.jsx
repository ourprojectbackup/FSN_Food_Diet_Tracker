import React, { useState, useEffect } from "react";
import SubMenuSection from "./SubMenuSection";
import { motion, AnimatePresence } from "framer-motion";

const MealSection = ({ mealType, mealIcon, foodItems, quantities, dispatch, expandedMeal, setExpandedMeal }) => {

  const capitalizeWords = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

 
  const calculateNutrition = (storedQuantities) => {
    console.log(storedQuantities,"VALUES CHANGESD")
    let nutritionData = {};
  
    Object.values(storedQuantities).forEach((food) => {
      const qty = food.quantity || 0; // Ensure quantity is present and valid
      if (qty <= 0) return; // Skip if quantity is 0 or less
  
      const mealtime = food.mealtime || "Unknown"; // Ensure mealtime exists
      if (!nutritionData[mealtime]) {
        nutritionData[mealtime] = { energy: 0, protein: 0, fats: 0 };
      }
  
      // Accumulate total nutrition, ensuring values are valid numbers
      nutritionData[mealtime].energy += (food["energy (kcal)"] || 0) * qty;
      nutritionData[mealtime].protein += (food["protein(g)"] || 0) * qty;
      nutritionData[mealtime].fats += (food["fat(g)"] || 0) * qty;
    });
  
    // Optional: Round values for cleaner UI display
    Object.keys(nutritionData).forEach((meal) => {
      nutritionData[meal].energy = parseFloat(nutritionData[meal].energy.toFixed(2));
      nutritionData[meal].protein = parseFloat(nutritionData[meal].protein.toFixed(2));
      nutritionData[meal].fats = parseFloat(nutritionData[meal].fats.toFixed(2));
    });
  
    return nutritionData;
  };
  

  const isExpanded = expandedMeal === mealType;
  const toggleExpand = () => setExpandedMeal(isExpanded ? null : mealType);


 

  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("foodQuantities")) || {}; // Get latest data
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


{nutrition?.[mealType] && (
  <motion.div 
    className="p-3 bg-gray-100 rounded-lg shadow-md mt-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h3 className="text-md font-semibold text-gray-700 mb-1">{capitalizeWords(mealType)}</h3>

    <div className="flex justify-between text-gray-600 text-sm px-2 py-1">
      <p>🔥 Energy: <span className="font-bold text-red-500">{nutrition[mealType]?.energy.toFixed(2)} kcal</span></p>
      <p>💪 Protein: <span className="font-bold text-green-500">{nutrition[mealType]?.protein.toFixed(2)} g</span></p>
      <p>🛢️ Fats: <span className="font-bold text-yellow-500">{nutrition[mealType]?.fats.toFixed(2)} g</span></p>
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
              <SubMenuSection
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

export default MealSection;
