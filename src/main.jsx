import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css";
import Landing from "./Pages/Landing";
import UserRegistration from "./Pages/UserRegistration";
import MealTimings from "./Pages/MealTimings";
import NutritionReport from "./Pages/RDAReport";
import UserList from "./Pages/RegisteredUsers";

const App = () => {
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

  return (
    <div className="">
      <motion.div
        className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 transition-all duration-300 py-10"
        style={{
          background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #7C3AED, #4F46E5)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/bmi" element={<UserRegistration />} />
            <Route path="/food" element={<MealTimings />} />
            <Route path="/NutritionReport" element={<NutritionReport />} />
            <Route path="/RegisteredUsers" element={<UserList />} />
          </Routes>
        </Router>
      </motion.div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
