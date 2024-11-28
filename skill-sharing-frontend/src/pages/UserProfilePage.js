import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        skills: [],
        ratings_average: 0,
        bio: '',
        experience: '',
        credits: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile: ', error);
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

    const handleEditProfileClick = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6 bg-gray-50 mt-5">
                {/* User Details Section */}
                <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg p-6">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-800">{user.name}</h1>
                        <div className="text-lg text-gray-700 mt-4 space-y-2">
                            <p><span className="font-semibold">Email:</span> {user.email}</p>
                            <p><span className="font-semibold">Role:</span> {user.role}</p>
                            <p><span className="font-semibold">Bio:</span> {user.bio}</p>
                            <p><span className="font-semibold">Experience:</span> {user.experience}</p>
                            <p><span className="font-semibold">Credits:</span> {user.credits}</p>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-gray-800">Skills Rating Average:</h2>
                            <p className="text-yellow-500 text-lg">{user.ratings_average} / 5</p>
                        </div>
                        <button
                            onClick={handleEditProfileClick}
                            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Edit Profile
                        </button>
                    </div>
                    <div className="wallet flex-1">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Wallet</h2>
                        {user.credits !== null ? (
                            <h3 className="text-lg text-gray-800 font-semibold">Current Balance: {user.credits} credits</h3>
                        ) : (
                            <p>Loading your credit balance...</p>
                        )}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.skills.map(skill => (
                            <div
                                key={skill.id}
                                className="p-4 bg-white rounded-lg shadow-md hover:shadow-2xl transition duration-300"
                            >
                                <Link to={`/skills/${skill.id}`} className="block">
                                    <h3 className="text-xl font-bold text-gray-800">{skill.title}</h3>
                                    <p className="text-gray-600 mt-2">{skill.description}</p>
                                    <p className="text-blue-600 font-semibold mt-2">Price: {skill.hourly_rate} credits / hour</p>
                                    <p className="text-gray-800 font-semibold">Skill Level: {skill.skill_level}</p>
                                    <p className="text-gray-800 font-semibold">Popularity Score: {skill.popularity_score}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
