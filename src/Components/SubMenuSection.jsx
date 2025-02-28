import React from "react";
import FoodItem from "./FoodItem";
import { motion } from "framer-motion";

const SubMenuSection = ({ mealType, foodItems, quantities, dispatch }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-5 shadow-lg 
                 border border-gray-200 w-full max-w-3xl mx-auto mt-3"
    >
      {/* Submenu Header */}
      <h3 className="text-2xl font-extrabold text-white bg-gradient-to-r from-amber-500 to-red-500 
               py-3 px-6 rounded-lg shadow-md uppercase tracking-wide flex justify-center items-center gap-3 w-full">
  🍽️ {mealType}
</h3>



      {/* Food Items List */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-4" >
        {foodItems.map((item) => (
          <FoodItem
            key={item.menu}
            item={item}
            quantities={quantities}
            dispatch={dispatch}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SubMenuSection;
