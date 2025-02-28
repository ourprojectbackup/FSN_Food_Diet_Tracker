import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaRuler, FaWeight, FaBriefcase } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const UsersGrid = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/UsersData.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">📋 User Information</h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {users.map((user, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-lg shadow-lg p-5 border-l-8 border-purple-600 transform hover:scale-105 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2">
              <FaUser /> {user.name}
            </h3>
            <p className="text-gray-600 flex items-center gap-2">
              <FaEnvelope /> {user.email}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <FaPhone /> {user.phoneNumber}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <FaBirthdayCake /> DOB: {user.dob} ({user.age})
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <MdDateRange /> Registered On: {user.date}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <p className="bg-gray-200 rounded-lg p-2 flex items-center gap-2">
                <FaRuler /> Height: {user.height} cm
              </p>
              <p className="bg-gray-200 rounded-lg p-2 flex items-center gap-2">
                <FaWeight /> Weight: {user.weight} kg
              </p>
              <p className="bg-gray-200 rounded-lg p-2 flex items-center gap-2">
                <FaBriefcase /> {user.occupation || "No Job Info"}
              </p>
            </div>
            <div className="mt-3 text-center">
              <p className="text-gray-700 font-semibold">📊 BMI: {user.bmi}</p>
              <p className="text-gray-700 font-semibold">🔥 Energy: {user.energy} kcal</p>
              <p className="text-gray-700 font-semibold">💪 Protein: {user.protein} g</p>
              <p className="text-gray-700 font-semibold">🍽 Fat: {user.fat} g</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UsersGrid;
