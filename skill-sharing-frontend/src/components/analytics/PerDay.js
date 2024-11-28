import React, { useEffect, useState } from 'react'

const PerDay = () => {
    const [skillsAddedPerDay, setSkillsAddedPerDay] = useState([]);
    const [reviewsAddedPerDay, setReviewsAddedPerDay] = useState([]);
    const [transactionsMadePerDay, setTransactionsMadePerDay] = useState([]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

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
            </div>    
        </div>
    )
}

export default PerDay