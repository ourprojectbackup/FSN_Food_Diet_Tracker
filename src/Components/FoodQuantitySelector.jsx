import React from "react";
import { motion } from "framer-motion";

const FoodQuantitySelector = ({ food, quantities, dispatch }) => {

  return (
    <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full shadow-md">
      {/* Decrease Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 bg-red-500 text-white font-bold rounded-full flex items-center justify-center 
                   shadow-md hover:bg-red-600 transition-all duration-300"
        onClick={() => {
          if (quantities[food.id]?.quantity > 0) {
            dispatch({ type: "DECREMENT", foodId: food.id });
          }
        }}
        disabled={!quantities[food.id]} // Disable button if quantity is 0
      >
        -
      </motion.button>

      {/* Quantity Display */}
      <span className="text-lg font-bold text-gray-700 w-6 text-center">
        {quantities[food.id]?.quantity || 0}
      </span>

      {/* Increase Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 bg-green-500 text-white font-bold rounded-full flex items-center justify-center 
                   shadow-md hover:bg-green-600 transition-all duration-300"
        onClick={() => dispatch({ type: "INCREMENT", food })}
      >
        +
      </motion.button>
    </div>
  );
};

export default FoodQuantitySelector;
