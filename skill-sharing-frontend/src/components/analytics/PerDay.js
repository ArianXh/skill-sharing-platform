import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';


const PerDay = () => {  
    const [skillsAddedPerDay, setSkillsAddedPerDay] = useState([]);
    const [reviewsAddedPerDay, setReviewsAddedPerDay] = useState([]);
    const [transactionsMadePerDay, setTransactionsMadePerDay] = useState([]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Chart refs
    const reviewsChartRef = useRef(null);
    const transactionsChartRef = useRef(null);
    const skillsChartRef = useRef(null);

    useEffect(() => {
        const fetchPerDayAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
    
                const [skillsPerDayRes, reviewsPerDayRes, transactionsPerDayRes] = await Promise.all([
                    fetch("http://localhost:5000/api/admin/analytics/skills-added-per-day", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()), 
                    fetch("http://localhost:5000/api/admin/analytics/reviews-added-per-day", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()),
                    fetch("http://localhost:5000/api/admin/analytics/transactions-made-per-day", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then(res => res.json()), 
                ]);
                setSkillsAddedPerDay(skillsPerDayRes);
                setReviewsAddedPerDay(reviewsPerDayRes);
                setTransactionsMadePerDay(transactionsPerDayRes);

                 // Initialize charts after data is loaded
                createChart(reviewsChartRef.current, reviewsPerDayRes, 'Reviews Added Per Day');
                createChart(transactionsChartRef.current, transactionsPerDayRes, 'Transactions Per Day');
                createChart(skillsChartRef.current, skillsPerDayRes, 'Skills Added Per Day');
                
            } catch (error) {
            if (error.response && error.response.status === 403) {
                setError('Access denied. Admin privileges are required.');
            } else {
                setError('Failed to retrieve analytics.');
            }
        };
    }
    fetchPerDayAnalytics();
    }, []);


    const createChart = (chartRef, data, label) => {
        const dates = data.map((entry) => entry.date);
        const counts = data.map((entry) => entry.count);
    
        new Chart(chartRef, {
          type: 'bar',
          data: {
            labels: dates,
            datasets: [
              {
                label,
                data: counts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: '#3b82f6',
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
          },
        });
      };

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-700">Analytics Per Day</h1>
            {/* Reviews Per Day */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews Added Per Day</h2>
                <ul className="divide-y divide-gray-200">
                {reviewsAddedPerDay.map((entry, index) => (
                    <li key={index} className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">{entry.date}</span>
                    <span className="text-sm text-gray-500">{entry.count} Reviews</span>
                    </li>
                ))}
                </ul>
                <canvas ref={reviewsChartRef}></canvas>
            </div>

            {/* Transactions Per Day */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Transactions Made Per Day</h2>
                <ul className="divide-y divide-gray-200">
                {transactionsMadePerDay.map((entry, index) => (
                    <li key={index} className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">{entry.date}</span>
                    <span className="text-sm text-gray-500">{entry.count} Transactions</span>
                    </li>
                ))}
                </ul>
                <canvas ref={transactionsChartRef}></canvas>
            </div>

            {/* Skills Added Per Day */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills Added Per Day</h2>
                <ul className="divide-y divide-gray-200">
                {skillsAddedPerDay.map((entry, index) => (
                    <li key={index} className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">{entry.date}</span>
                    <span className="text-sm text-gray-500">{entry.count} Skills</span>
                    </li>
                ))}
                </ul>
                <canvas ref={skillsChartRef}></canvas>
            </div>    
        </div>
    )
}

export default PerDay