import React, { useEffect, useState } from "react";

const AnalyticsTab = () => {
  const [analytics, setAnalytics] = useState({
    numberOfUsers: 0,
    numberOfSkills: 0,
    //transactionsPerDay: 0,
    //reviewsPerDay: 0,
    //skillsAddedPerDay: 0,
  });
  const [skillsAddedPerDay, setSkillsAddedPerDay] = useState([]);
  const [reviewsAddedPerDay, setReviewsAddedPerDay] = useState([]);
  const [skillsByCategory, setSkillsByCategory] = useState([]);
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


    const fetchSkillsAddedPerDay = async () => {
      try {
        const token = localStorage.getItem('token');
            
        // Check if token is null or undefined
        if (!token) {
          throw new Error("No token found in localStorage.");
        }
        const response = await fetch("http://localhost:5000/api/admin/analytics/skills-added-per-day", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setSkillsAddedPerDay(data);
      } catch (error) {
        console.error('Failed to fetch skills added per day', error);
      }
    };
    
    const fetchReviewsAddedPerDay = async () => {
      try {
        const token = localStorage.getItem('token');
            
        // Check if token is null or undefined
        if (!token) {
          throw new Error("No token found in localStorage.");
        }
        const response = await fetch("http://localhost:5000/api/admin/analytics/reviews-added-per-day", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setReviewsAddedPerDay(data);
      } catch (error) {
        console.error('Failed to fetch reviews added per day', error);
      }
    };


    const fetchSkillsByCategory = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Check if token is null or undefined
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

    fetchAnalytics();
    fetchSkillsAddedPerDay();
    fetchReviewsAddedPerDay();
    fetchSkillsByCategory();
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

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills by Category</h2>
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
  );
};

export default AnalyticsTab;
