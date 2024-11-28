import React, { useEffect, useState } from "react";

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


  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Basic Analytics</h1> 
        {/* Number of Users */}
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-600">Total Number of Users</h2>
            <p className="text-2xl font-bold text-blue-500">{analytics.numberOfUsers}</p>
        </div>

        {/* Number of Skills */}
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-600">Total Number of Skills</h2>
            <p className="text-2xl font-bold text-blue-500">{analytics.numberOfSkills}</p>
        </div>

        {/* Number of Categories */}
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-600">Total Number of Categories</h2>
            <p className="text-2xl font-bold text-blue-500">{analytics.numberOfCategories}</p>
        </div>

        {/* Number of Reviews */}
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-600">Total Number of Reviews</h2>
            <p className="text-2xl font-bold text-blue-500">{analytics.numberOfReviews}</p>
        </div>

        {/* Number of Posts */}
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-600">Total Number of Posts</h2>
            <p className="text-2xl font-bold text-blue-500">{analytics.numberOfPosts}</p>
        </div>

        {/* Number of Comments */}
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-600">Total Number of Comments</h2>
            <p className="text-2xl font-bold text-blue-500">{analytics.numberOfComments}</p>
        </div>

        {/* Number of Transactions */}
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-600">Total Number of Transactions</h2>
            <p className="text-2xl font-bold text-blue-500">{analytics.numberOfTransactions}</p>
        </div>

    </div>
  )
}

export default BasicAnalytics;