import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaAppleAlt, FaHeart, FaLeaf, FaFireAlt } from "react-icons/fa";
import { useNavigate, useNavigation } from "react-router-dom";


export default function Landing() {
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
    const navigate = useNavigate();
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setGradientPosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);


    const [clickCount, setClickCount] = useState(0);
  
    const handleClick = () => {
      if (clickCount + 1 === 5) {
        navigate("/Registeredusers"); // Replace with your actual route
      } else {
        setClickCount(clickCount + 1);
      }
    };

    

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 transition-all duration-300"
            style={{
              ///  background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #7C3AED, #4F46E5)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.h1
                className="text-5xl font-extrabold text-white mb-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                 onClick={handleClick}
            >
                🍏 Food Diet Monitoring 🥗
            </motion.h1>
            <motion.p
                className="text-lg text-white max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
            >
                Track your calories and maintain a healthy diet with ease! Stay fit, eat smart, and monitor your daily intake.
            </motion.p>

            <div className="flex space-x-6 text-white text-4xl mt-6">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    whileHover={{ scale: 1.3 }}
                >
                    <FaAppleAlt />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    whileHover={{ scale: 1.3 }}
                >
                    <FaHeart />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    whileHover={{ scale: 1.3 }}
                >
                    <FaLeaf />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
                    whileHover={{ scale: 1.3 }}
                >
                    <FaFireAlt />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="mt-8"
            >
                <motion.button
                    className="px-6 py-3 bg-white text-indigo-700 font-semibold text-lg rounded-full shadow-lg hover:bg-indigo-200"
                    whileHover={{ scale: 1.1 }} onClick={() => navigate("/bmi")}
                >
                    Start Checking Calories 🍽️
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
