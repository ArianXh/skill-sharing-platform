import React, { useRef, useEffect, useState } from "react";
import Chart from 'chart.js/auto';

const BasicAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        numberOfUsers: 0,
        numberOfSkills: 0,
        numberOfCategories: 0,
        numberOfReviews: 0,
        numberOfPosts: 0,
        numberOfComments: 0,
        numberOfTransactions: 0,
      });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Ref for the Chart.js canvas
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // To store Chart instance for cleanup

    useEffect(() => {
        const fetchBasicAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
    
                const [numberOfUsersRes, numberOfSkillsRes] = await Promise.all([
                    fetch("http://localhost:5000/api/admin/basic-analytics", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()), 
                ]);
                setAnalytics(numberOfUsersRes, numberOfSkillsRes);
                
                
            } catch (error) {
            if (error.response && error.response.status === 403) {
                setError('Access denied. Admin privileges are required.');
            } else {
                setError('Failed to retrieve analytics.');
            }
        };
    }
    fetchBasicAnalytics();
    }, []);

     // Render Chart.js
    useEffect(() => {
        if (chartRef.current) {
        // Cleanup previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Initialize new chart
        chartInstance.current = new Chart(chartRef.current, {
            type: 'bar', // Chart type
            data: {
            labels: [
                'Users', 
                'Skills', 
                'Categories', 
                'Reviews', 
                'Posts', 
                'Comments', 
                'Transactions'
            ],
            datasets: [
                {
                label: 'Total Number',
                data: [
                    analytics.numberOfUsers, 
                    analytics.numberOfSkills, 
                    analytics.numberOfCategories, 
                    analytics.numberOfReviews, 
                    analytics.numberOfPosts, 
                    analytics.numberOfComments, 
                    analytics.numberOfTransactions
                ],
                backgroundColor: [
                    '#1E3A8A', '#9333EA', '#059669', '#F59E0B', '#EF4444', '#3B82F6', '#10B981'
                ],
                borderColor: '#000',
                borderWidth: 1,
                },
            ],
            },
            options: {
            responsive: true,
            plugins: {
                legend: {
                display: true,
                position: 'top',
                },
                tooltip: {
                enabled: true,
                },
            },
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });
        }
    }, [analytics]); // Re-run whenever analytics data changes


  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Basic Analytics</h1> 

        {/* Analytics Metrics */}
        {Object.entries(analytics).map(([key, value]) => (
            <div key={key} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-600">
                {key.replace(/numberOf/g, 'Total ')}
            </h2>
            <p className="text-2xl font-bold text-blue-500">{value}</p>
            </div>
        ))}

        {/* Chart.js Integration */}
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Analytics Overview</h2>
            <canvas ref={chartRef} className="w-full h-64"></canvas>
        </div>
    </div>
  )
}

export default BasicAnalytics;