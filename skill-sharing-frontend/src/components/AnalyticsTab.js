import React, { useEffect, useState } from "react";
import axios from 'axios';

const AnalyticsTab = () => {
  const [analytics, setAnalytics] = useState({
    numberOfUsers: 0,
    numberOfSkills: 0,
    //transactionsPerDay: 0,
    //reviewsPerDay: 0,
    //skillsAddedPerDay: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Check if token is null or undefined
            if (!token) {
              throw new Error("No token found in localStorage.");
            }
    
            const response = await fetch("http://localhost:5000/api/admin/analytics", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                throw new Error("Failed to fetch analytics data");
            }
    
            const data = await response.json();
            console.log("Fetched Analytics Data:", data); // Log fetched data
            setAnalytics(data);
            setLoading(false);
            
        } catch (error) {
            if (error.response && error.response.status === 403) {
              setError('Access denied. Admin privileges are required.');
            } else {
              setError('Failed to retrieve analytics.');
            }
            setLoading(false);
          }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700">Analytics</h1>
      
      {/* Number of Users */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-600">Number of Users</h2>
        <p className="text-2xl font-bold text-blue-500">{analytics.numberOfUsers}</p>
      </div>

      {/* Number of Skills */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-600">Number of Skills</h2>
        <p className="text-2xl font-bold text-green-500">{analytics.numberOfSkills}</p>
      </div>

      {/* Transactions Per Day */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-600">Transactions Per Day</h2>
        <p className="text-2xl font-bold text-orange-500">{}</p>
      </div>

      {/* Reviews Per Day */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-600">Reviews Per Day</h2>
        <p className="text-2xl font-bold text-purple-500">{}</p>
      </div>

      {/* Skills Added Per Day */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-600">Skills Added Per Day</h2>
        <p className="text-2xl font-bold text-red-500">{}</p>
      </div>
    </div>
  );
};

export default AnalyticsTab;
