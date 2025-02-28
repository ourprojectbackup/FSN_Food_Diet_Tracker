import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import nutritionData from '../data/Age_Group_Nutrition.json';

const UserRegistration = () => {
    const navigate = useNavigate();
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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        sex: '',
        dob: '',
        age: '',
        height: '',
        weight: '',
        occupation: ''
    });
    const [bmi, setBmi] = useState(null);
    const [nutrition, setNutrition] = useState({ energy: 0, protein: 0, fat: 0 });
    const [filteredOccupations, setFilteredOccupations] = useState([]);

    useEffect(() => {
        if (formData.height && formData.weight) {
            const heightInMeters = formData.height / 100;
            const calculatedBmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(calculatedBmi);
        }
    }, [formData.height, formData.weight]);

    useEffect(() => {
        if (formData.age) {
            let category = "";

            if (["0-6 months", "6-12 months"].includes(formData.age)) {
                category = "infants";
            } else if (["1-3 years", "4-6 years", "7-9 years"].includes(formData.age)) {
                category = "children";
            } else if (formData.sex === "Male") {
                category = "boys";
            } else if (formData.sex === "Female") {
                category = "girls";
            }



            if (category && nutritionData[category]) {
                const ageGroup = nutritionData[category].find(entry => entry.age === formData.age);

                if (ageGroup) {
                    setNutrition({
                        energy: ageGroup.energy || 0,
                        protein: ageGroup.protein || 0,
                        fat: ageGroup.fat || 0
                    });
                } else {

                    setNutrition({ energy: 0, protein: 0, fat: 0 });
                }
            }
        }
    }, [formData.sex, formData.age]);

    useEffect(() => {
        if (formData.sex && formData.occupation) {
            const category = formData.sex === 'Male' ? 'man' : 'woman';
            const occupationData = nutritionData.adults[category]?.find(entry => entry.occupationType === formData.occupation);
            if (occupationData) {
                setNutrition({ energy: occupationData.energy, protein: occupationData.protein, fat: occupationData.fat });
            }
        }
    }, [formData.sex, formData.occupation]);

    useEffect(() => {
        if (formData.sex === 'Male') {
            setFilteredOccupations(
                nutritionData.adults.man.map(entry => entry.occupationType)
            );
        } else if (formData.sex === 'Female') {
            setFilteredOccupations(
                nutritionData.adults.woman
                    .map(entry => entry.occupationType)
                    .filter(occupation => occupation !== 'Lactation Consultant' && occupation !== 'Pregnant Care')
            );
        } else {
            setFilteredOccupations([]);
        }
    }, [formData.sex]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            ...formData,
            bmi,
            ...nutrition
        };
        console.log("User Data:", JSON.stringify(userData, null, 2));
        localStorage.setItem("userData", JSON.stringify(userData));
        handleSaveData(userData)
        navigate("/food")

    };

    const handleSaveData = async (data) => {
      
        const response = await fetch("/api/RegisteredUsers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        console.log(result);
    };


    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 transition-all duration-300"
            style={{ background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #7C3AED, #4F46E5)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg my-20 ">
                <h1 className="text-xl font-bold mb-4">User Registration</h1>

                {/* Instructions Section */}
                <div className="bg-gray-100 p-4 rounded-md mb-4 text-left">
                    <h2 className="text-md font-semibold mb-2">Instructions:</h2>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        <li>Height and weight entries are mandatory.</li>
                        <li><strong>Sedentary:</strong> Little to no physical activity (e.g., desk job, watching TV).</li>
                        <li><strong>Moderate:</strong> Regular, non-intense physical activity.</li>
                        <li><strong>Heavy:</strong> Vigorous physical activity or physically demanding jobs.</li>
                    </ul>
                </div>


                <form className="space-y-3" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" required />

                    <select name="sex" value={formData.sex} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" required />

                    {/* Height and Weight Instructions */}
                    {/* <div className="text-xs text-gray-600">* Height and weight are mandatory fields.</div> */}
                    <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} className="w-full p-2 border rounded" required />

                    <select name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Age Group</option>
                        {[...new Set(Object.values(nutritionData).flat().map(group => group.age))]
                            .sort((a, b) => a - b)
                            .map((age, index) => (
                                <option key={index} value={age}>{age}</option>
                            ))}
                        {/* <option value="18+">Adults (18+)</option> */}
                    </select>

                    {formData.age === 'Adults (18+)' && (
                        <select name="occupation" value={formData.occupation} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="">Select Occupation Type</option>
                            {filteredOccupations.map((occupation, index) => (
                                <option key={index} value={occupation}>{occupation}</option>
                            ))}
                        </select>
                    )}

                    {bmi && <p className="mt-2 text-sm">BMI: <strong>{bmi}</strong> ({bmi < 18.5 ? 'Underweight' : bmi >= 18.5 && bmi < 24.9 ? 'Normal weight' : bmi >= 25 && bmi < 29.9 ? 'Overweight' : 'Obese'})</p>}

                    {nutrition.energy != 0 ? (
                        <div className="mt-3 p-3 bg-gray-100 rounded">
                            <p>Energy: {nutrition.energy} kcal</p>
                            <p>Protein: {nutrition.protein} g</p>
                            <p>Fat: {nutrition.fat} g</p>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}


                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
                </form>
            </div>
        </motion.div>
    );
};

export default UserRegistration;
