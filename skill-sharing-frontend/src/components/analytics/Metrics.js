import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const Metrics = () => {
    const [skillsGrowth, setSkillsGrowth] = useState([]);
    const [pricingTrends, setPricingTrends] = useState([]);
    const [topDemandSkills, setTopDemandSkills] = useState([]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const growthChartRef = useRef(null);
    const pricingChartRef = useRef(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = localStorage.getItem('token'); // Adjust token retrieval as per your app's logic
    
                const [growthRes, pricingRes, demandRes] = await Promise.all([
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
                ]);
                setSkillsGrowth(growthRes);
                setPricingTrends(pricingRes);

                // Initialize charts after data fetch
                createGrowthChart(growthRes);
                createPricingChart(pricingRes);
                
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

    const createGrowthChart = (data) => {
        const months = data.map((growth) => new Date(growth.month).toLocaleString('default', { month: 'long', year: 'numeric' }));
        const skillCounts = data.map((growth) => growth.skill_count);
    
        new Chart(growthChartRef.current, {
          type: 'line',
          data: {
            labels: months,
            datasets: [
              {
                label: 'Skills Growth Over Time',
                data: skillCounts,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                ticks: {
                  autoSkip: true,
                },
              },
            },
          },
        });
      };
    
      const createPricingChart = (data) => {
        const categories = data.map((trend) => trend.categories.name);
        const prices = data.map((trend) => parseFloat(trend.average_price) || 0);
    
        new Chart(pricingChartRef.current, {
          type: 'bar',
          data: {
            labels: categories,
            datasets: [
              {
                label: 'Average Skill Price (Credits / Hour)',
                data: prices,
                backgroundColor: '#FFCE56',
                hoverBackgroundColor: '#FFCE56CC',
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      };
    
    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-700">Metrics</h1>

            {/* Pricing Trends */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Skill Pricing / Hour Trends by Category</h2>
                <ul>
                    {pricingTrends.map((trend) => (
                    <li key={trend.category_id} className="flex justify-between items-center py-2">
                        <span className="text-gray-700 font-medium">{trend.categories.name}</span>
                        <span className="text-sm text-gray-500">{isNaN(parseFloat(trend.average_price)) ? 'N/A' : parseFloat(trend.average_price).toFixed(2)} credits / hour</span>
                    </li>
                    ))}
                </ul>
                <canvas ref={pricingChartRef}></canvas>
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
                <canvas ref={growthChartRef}></canvas>
            </div>
        </div>
    )
}

export default Metrics;