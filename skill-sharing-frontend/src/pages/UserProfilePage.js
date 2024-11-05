import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const UserProfilePage = () => {
  const [user, setUser] = useState({
    name: '', 
    email: '', 
    role: '', 
    bio: '', 
    profile_image_url: '', 
    experience: '', 
    ratings_average: 0, 
    skills: [], 
    reviews: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex items-center mb-6">
          {user.profile_image_url && (
            <img
              src={user.profile_image_url}
              alt={`${user.name}'s profile`}
              className="h-20 w-20 rounded-full mr-4"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{user.name}'s Profile</h1>
            <p className="text-gray-600">{user.role}</p>
          </div>
        </div>
        
        {user.bio && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Bio</h2>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}

        {user.experience && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
            <p className="text-gray-700">{user.experience}</p>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Skills</h2>
        <ul className="space-y-4">
          {user.skills.map(skill => (
            <li key={skill.id} className="p-4 border rounded-lg bg-gray-100 hover:bg-gray-200 transition">
              <h3 className="text-xl font-bold text-gray-800">{skill.title}</h3>
              <p className="text-gray-600">{skill.description}</p>
              <p className="text-gray-800 font-semibold">Price: ${skill.price}</p>
              <p className="text-gray-800 font-semibold">Skill Level: {skill.skill_level}</p>
              <p className="text-gray-800 font-semibold">Popularity Score: {skill.popularity_score}</p>
            </li>
          ))}
        </ul>

        {user.ratings_average > 0 && (
          <div className="mt-8 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Average Rating</h2>
            <p className="text-yellow-500 text-lg">{user.ratings_average} / 5</p>
          </div>
        )}

        {user.reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
            <ul className="space-y-4">
              {user.reviews.map((review, index) => (
                <li key={index} className="p-4 border rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                  <p className="text-gray-800 font-semibold">Rating: {review.rating} / 5</p>
                  <p className="text-gray-600">{review.review_text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}


      </div>
    </div>
  );
};

export default UserProfilePage;
