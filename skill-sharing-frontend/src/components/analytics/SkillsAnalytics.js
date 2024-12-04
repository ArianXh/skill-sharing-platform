import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const SkillsAnalytics = () => {
    const [skillsByCategory, setSkillsByCategory] = useState([]);
    const [topCategories, setTopCategories] = useState([]);
    const [topDemandSkills, setTopDemandSkills] = useState([]);
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const chartRef = useRef(null);

    useEffect(() => {
        const fetchSkillsAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
    
                const [topCategoriesRes, categoriesRes, demandRes] = await Promise.all([
                    fetch("http://localhost:5000/api/admin/analytics/top-skill-categories", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()), 
                    fetch("http://localhost:5000/api/admin/analytics/skills-by-category", {
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
                setTopCategories(topCategoriesRes);
                setSkillsByCategory(categoriesRes);
                setTopDemandSkills(demandRes);

                // Initialize charts after data fetch
                createCategoriesChart(categoriesRes);
                
            } catch (error) {
            if (error.response && error.response.status === 403) {
                setError('Access denied. Admin privileges are required.');
            } else {
                setError('Failed to retrieve analytics.');
            }
            };
        }
            fetchSkillsAnalytics();
    }, [])

      const createCategoriesChart = (data) => {
        const labels = data.map((category) => category.categories.name);
        const values = data.map((category) => category.count);
    
        new Chart(chartRef.current, {
          type: 'pie', // You can change this to 'bar' for a bar chart
          data: {
            labels,
            datasets: [
              {
                label: 'Number of Skills by Category',
                data: values,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                ],
                hoverBackgroundColor: [
                  '#FF6384CC',
                  '#36A2EBCC',
                  '#FFCE56CC',
                  '#4BC0C0CC',
                  '#9966FFCC',
                  '#FF9F40CC',
                ],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.raw} Skills`,
                },
              },
            },
          },
        });
      };  
      
    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-700">Skills Analytics</h1>
            <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Number Of Skills By Category</h2>
                <canvas ref={chartRef}></canvas>
            </div>

            {/* List */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed</h2>
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
        </div>
  )
}

export default SkillsAnalytics