import React, { useEffect, useState } from "react";

const Metrics = () => {
    const [topCategories, setTopCategories] = useState([]);
    const [skillsGrowth, setSkillsGrowth] = useState([]);
    const [pricingTrends, setPricingTrends] = useState([]);
    const [topDemandSkills, setTopDemandSkills] = useState([]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = localStorage.getItem('token'); // Adjust token retrieval as per your app's logic
    
                const [categoriesRes, growthRes, pricingRes, demandRes] = await Promise.all([
                    fetch("http://localhost:5000/api/admin/analytics/top-skill-categories", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()), 
                    fetch("http://localhost:5000/api/admin/analytics/skills-growth", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()),
                    fetch("http://localhost:5000/api/admin/analytics/skill-pricing-trends", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()), 
                    fetch("http://localhost:5000/api/admin/analytics/top-demand-skills", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()),
                ]);
                setTopCategories(categoriesRes);
                setSkillsGrowth(growthRes);
                setPricingTrends(pricingRes);
                setTopDemandSkills(demandRes);
                
            } catch (error) {
            if (error.response && error.response.status === 403) {
                setError('Access denied. Admin privileges are required.');
            } else {
                setError('Failed to retrieve analytics.');
            }
        };
    }
    fetchMetrics();
    }, []);
    
    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-700">Metrics</h1>
            {/* Top Categories */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Skills by Category</h2>
                <ul className="divide-y divide-gray-200">
                    {topCategories.map((category) => (
                    <li
                        key={category.category_id}
                        className="flex justify-between items-center py-2"
                    >
                        <span className="text-gray-700 font-medium">{category.categories.name}</span>
                        <span className="text-sm text-gray-500">{category.skill_count} Skills</span>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Pricing Trends */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Skill Pricing Trends by Category</h2>
                <ul>
                    {pricingTrends.map((trend) => (
                    <li key={trend.category_id} className="flex justify-between items-center py-2">
                        <span className="text-gray-700 font-medium">{trend.categories.name}</span>
                        <span className="text-sm text-gray-500">{isNaN(parseFloat(trend.average_price)) ? 'N/A' : parseFloat(trend.average_price).toFixed(2)} credits</span>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Skills Growth */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills Growth Over Time</h2>
                <ul className="divide-y divide-gray-200">
                    {skillsGrowth.map((growth, index) => (
                        <li key={index} className="flex justify-between items-center py-2">
                            <span className="text-gray-700 font-medium">{new Date(growth.month).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                            <span className="text-sm text-gray-500">{growth.skill_count} Skills</span>
                        </li>
                    ))}
                </ul>
            </div>
            

            {/* Top Demand Skills */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Demand Skills</h2>
                <ul className="divide-y divide-gray-200">
                    {topDemandSkills.map((skill) => (
                        <li key={skill.id} className="flex justify-between items-center py-2">
                            <span className="text-gray-700 font-medium">{skill.skill.title}</span>
                            <span className="text-sm text-gray-500">{skill.skill_count} Sold</span>
                        </li>
                    ))}
                </ul>
            </div>          
        </div>
    )
}

export default Metrics;