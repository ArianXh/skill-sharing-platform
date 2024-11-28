import React, { useEffect, useState } from "react";

const SkillsAnalytics = () => {
    const [skillsByCategory, setSkillsByCategory] = useState([]);
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkillsByCategory = async () => {
            try {
                const token = localStorage.getItem('token');
    
                if (!token) {
                  throw new Error("No token found in localStorage.");
                }
                const response = await fetch("http://localhost:5000/api/admin/analytics/skills-by-category", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setSkillsByCategory(data);
            } catch (error) {
                console.error("Failed to fetch skills by category", error);
            }
        };
        fetchSkillsByCategory();
    
      }, []);

  
    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-700">Skills Analytics</h1>
            <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Number Of Skills By Category</h2>
                <ul className="divide-y divide-gray-200">
                {skillsByCategory.map((category) => (
                    <li
                    key={category.category_id}
                    className="flex justify-between items-center py-2"
                    >
                    <span className="text-gray-700 font-medium">{category.categories.name}</span>
                    <span className="text-sm text-gray-500">{category.count} Skills</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
  )
}

export default SkillsAnalytics