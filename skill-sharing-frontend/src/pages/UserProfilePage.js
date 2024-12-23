import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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
                //const decodedToken = jwtDecode(token);
                //const userId = decodedToken.user.id;
                const response = await axios.get(`http://localhost:5000/api/users/profile`, {
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
        <div>
            <Navbar />
            <div className="min-h-screen flex bg-white-100 ">
            {/* Sidebar */}
            <aside className="w-1/4 bg-blue-600 text-white p-6 shadow-lg rounded-lg">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                    <p className="text-sm">{user.email}</p>
                </div>
                <nav className="space-y-4">
                    <button className="block w-full text-left py-2 px-4 rounded-md hover:bg-blue-700">
                        Skills
                    </button>
                    <button className="block w-full text-left py-2 px-4 rounded-md hover:bg-blue-700">
                        Payments
                    </button>
                    <button onClick={handleEditProfileClick} className="block w-full text-left py-2 px-4 rounded-md hover:bg-blue-700">
                        Edit Profile
                    </button>
                </nav>
                <div className="mt-10">
                    <h3 className="text-3xl font-bold">Wallet</h3>
                    {user.credits !== null ? (
                        <p className="text-3xl font-semibold">{user.credits} credits</p>
                    ) : (
                        <p>Loading your credit balance...</p>
                    )}
                </div>
            </aside>
    
            {/* Main Content */}
            <main className="flex-1 p-8">
                {/* User Overview Section */}
                <section className="mb-10 bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile Overview</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p>
                                <span className="font-semibold">Role:</span> {user.role}
                            </p>
                            <p>
                                <span className="font-semibold">Bio:</span> {user.bio}
                            </p>
                            <p>
                                <span className="font-semibold">Experience:</span> {user.experience}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">Skills Rating Average:</span>
                            </p>
                            <p className="text-blue-600 font-bold text-lg">{user.ratings_average} / 10</p>
                        </div>
                    </div>
                </section>
    
                {/* Skills Section */}
                <section className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user.skills.map(skill => (
                            <div
                                key={skill.id}
                                className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg hover:bg-green-200 transition duration-300"
                            >
                                <Link to={`/skills/${skill.id}`} className="block">
                                    <h3 className="text-xl font-bold text-gray-800">{skill.title}</h3>
                                    <p className="text-gray-600 mt-2">{skill.description}</p>
                                    <p className="text-blue-600 font-semibold mt-2">
                                        Price: {skill.hourly_rate} credits / hour
                                    </p>
                                    <p className="text-gray-800 font-semibold">Skill Level: {skill.skill_level}</p>
                                    <p className="text-gray-800 font-semibold">
                                        Popularity Score: {skill.popularity_score}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    </div>
        
    );
};

export default UserProfilePage;
