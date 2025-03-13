import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const NutritionReport = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  
  // Function to extract only numerical values from text (e.g., "80 Kcal/kg/d" -> 80)
  const extractNumber = (str) => {
    if (!str) return 0; // Handle undefined or null values
    const match = String(str).match(/[\d.]+/); // Convert to string before matching
    return match ? parseFloat(match[0]) : 0;
  };

  // Process numeric RDA values
  const processedRDA = {
    energy: extractNumber(userData.energy),
    protein: extractNumber(userData.protein),
    fat: extractNumber(userData.fat),
  };
  
  const bmi = userData.bmi;
  
  // Function to calculate the reduced RDA based on BMI
  const getReducedValue = (value, percentage) => {
    return value - (value * percentage) / 100;
  };
  
  // Check BMI and apply reduction
  if (bmi >= 30 && bmi < 35) {
    processedRDA.energy = getReducedValue(processedRDA.energy, 10);
    processedRDA.fat = getReducedValue(processedRDA.fat, 10);
  } else if (bmi >= 35 && bmi < 40) {
    processedRDA.energy = getReducedValue(processedRDA.energy, 15);
    processedRDA.fat = getReducedValue(processedRDA.fat, 15);
  } else if (bmi >= 40) {
    processedRDA.energy = getReducedValue(processedRDA.energy, 20);
    processedRDA.fat = getReducedValue(processedRDA.fat, 20);
  }

  const [nutrition, setNutrition] = useState({ energy: 0, protein: 0, fat: 0 });
  const navigate = useNavigate();


  const calculateNutrition = (storedQuantities) => {
    let nutritionData = {};

    Object.values(storedQuantities).forEach((food) => {
      const qty = food.quantity || 0; // Ensure quantity is present

      if (qty > 0) {
        const mealtime = food.mealtime; // Group by mealtime

        if (!nutritionData[mealtime]) {
          nutritionData[mealtime] = { energy: 0, protein: 0, fat: 0 };
        }

        // Accumulate total nutrition (Ensure correct unit handling)
        nutritionData[mealtime].energy += (food["energy (kcal)"] || 0) * qty;
        nutritionData[mealtime].protein += (food["protein(g)"] || 0) * qty;
        nutritionData[mealtime].fat += (food["fat(g)"] || 0) * qty;
      }
    });

    // ✅ Calculate the TOTAL across all meals
    const total = Object.values(nutritionData).reduce(
      (acc, meal) => ({
        energy: acc.energy + meal.energy,
        protein: acc.protein + meal.protein,
        fat: acc.fat + meal.fat,
      }),
      { energy: 0, protein: 0, fat: 0 }
    );

    return total;
  };



  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("foodQuantities")) || {};
    let total = { energy: 0, protein: 0, fat: 0 };

    total = calculateNutrition(storedQuantities)

    setNutrition(total);
  }, []);

  return (
    <div className="p-6 min-h-screen text-white flex flex-col items-center">
      {/* Animated Header */}
      <motion.h1
        className="text-3xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        📊 Your Nutritional Report
      </motion.h1>

      {/* User Info Section */}
      <motion.div
        className="bg-white bg-opacity-20 backdrop-blur-md text-black p-5 rounded-lg shadow-lg w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl font-semibold text-center text-black">👤 User Information</h2>
        <div className="grid grid-cols-2 gap-4 mt-4 text-black text-left">
          <p><span className="font-semibold">📛 Name:</span> {userData.name}</p>
          <p><span className="font-semibold">📧 Email:</span> {userData.email}</p>
          <p><span className="font-semibold">📞 Phone:</span> {userData.phoneNumber}</p>
          <p><span className="font-semibold">⚤ Gender:</span> {userData.sex}</p>
          <p><span className="font-semibold">🎂 DOB:</span> {userData.dob}</p>
          <p><span className="font-semibold">📏 Height:</span> {userData.height} cm</p>
          <p><span className="font-semibold">⚖️ Weight:</span> {userData.weight} kg</p>
          <p><span className="font-semibold">💼 Occupation:</span> {userData.occupation || "N/A"}</p>
          <p><span className="font-semibold">📊 BMI:</span> {userData.bmi}</p>

        </div>
      </motion.div>

      {/* Nutrient Report Section */}
      <motion.div
        className="bg-white bg-opacity-20 backdrop-blur-md text-black p-5 rounded-lg shadow-lg w-full max-w-2xl mt-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-center text-black">🥗 Nutrient Analysis</h2>
        <table className="w-full text-center border-collapse mt-4">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-3">📝 Nutrient</th>
              <th className="p-3">✅ Required (RDA)</th>
              <th className="p-3">🍽️ Consumed</th>
              <th className="p-3">⚖️ Difference</th>
            </tr>
          </thead>
          <tbody>
            {["energy", "protein", "fat"].map((key) => (
              <motion.tr key={key} className="border-b">
                <td className="p-3 font-bold">{key.toUpperCase()}</td>
                <td className="p-3">{processedRDA[key]} {key === "energy" ? "Kcal" : "g"}</td>
                <td className="p-3 text-black">{nutrition[key].toFixed(1)} {key === "energy" ? "Kcal" : "g"}</td>
                <td
  className={`p-3 font-bold ${
    (processedRDA[key] - nutrition[key]) < 0 ? "text-green-500" : "text-red-500"
  }`}
>
  { Math.abs(processedRDA[key] - nutrition[key]).toFixed(1)} {key === "energy" ? "Kcal" : "g"}
</td>

              </motion.tr>
            ))}

          </tbody>
        </table>
      </motion.div>

      {/* Back Button with Framer Motion */}
      <motion.button
        onClick={() => navigate("/food")}
        className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-full shadow-lg hover:bg-purple-900 transition flex items-center"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        🔙 Back to Meal Selection
      </motion.button>
    </div>
  );
};

export default NutritionReport;9