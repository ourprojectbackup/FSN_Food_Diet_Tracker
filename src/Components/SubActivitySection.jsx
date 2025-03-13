import React from "react";
import FoodItem from "./FoodItem";
import { motion } from "framer-motion";
import ActivityItem from "./ActivityItem";

const SubActivitySection = ({ mealType, foodItems, quantities, dispatch }) => {
 
  return (



    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-4" >

      <ActivityItem
        item={foodItems}
        quantities={quantities}
        dispatch={dispatch}
      />

    </div>
  );
};

export default SubActivitySection;
