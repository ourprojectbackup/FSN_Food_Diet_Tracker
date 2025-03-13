import React from "react";
import { motion } from "framer-motion";
import FoodQuantitySelector from "./FoodQuantitySelector";
import { FaBicycle, FaUtensils } from "react-icons/fa"; // Food icon

// Function to capitalize the first letter of each word
const capitalizeWords = (text) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

const ActivityItem = ({ item, quantities, dispatch }) => {
 

  return (
    <motion.div
      className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 mb-3 border-l-8 border-amber-500 w-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left Side - Food Name & Energy */}
      <div className="flex items-center gap-4">
        <motion.span
          className="bg-gradient-to-r from-yellow-400 to-red-500 text-white p-2 rounded-full shadow-md"
          whileHover={{ rotate: 15 }}
          transition={{ duration: 0.3 }}
        >
          <FaBicycle size={22} />
        </motion.span>

        <span className="text-lg font-semibold text-gray-800">
          {capitalizeWords(item.name)} 
          <span className="text-sm text-left text-gray-600 block">{item["kcal"]} kcal</span>
        </span>
      </div>

      {/* Right Side - Quantity Selector */}
      <FoodQuantitySelector food={item} quantities={quantities} dispatch={dispatch} />
    </motion.div>
  );
};

export default ActivityItem;
