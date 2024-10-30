import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marketplace = () => {
    const [skills, setSkills] = useState([]);
    const [category, setCategory] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/skills/skills', {
                    params: { category, skill_level: skillLevel, search },
                });
                setSkills(response.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };
        fetchSkills();
    }, [category, skillLevel, search]);

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                <a href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
                                    Home
                                </a>
                                <a href="/explore" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                    Explore
                                </a>
                                <a href="/about" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                    About
                                </a>
                                <a href="/contact" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                    Contact
                                </a>
                            </div>
                        </div>
                        <a href="/login" className="hidden sm:ml-6 sm:flex sm:items-center">
                            <button
                                type="button"
                                className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
                            >
                                Login
                            </button>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <div className="p-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Explore Skills</h2>

                {/* Filters Section */}
                <div className="flex space-x-4 mb-6">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 rounded-md border"
                    >
                        <option value="">All Categories</option>
                        <option value="1">Programming</option>
                        <option value="2">Design</option>
                    </select>

                    <select
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        className="p-2 rounded-md border"
                    >
                        <option value="">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search skills..."
                        className="p-2 rounded-md border"
                    />
                </div>

                {/* Skills Listing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.length > 0 ? (
                        skills.map((skill) => (
                            <div key={skill.id} className="p-4 bg-white rounded-lg shadow-md">
                                <h3 className="font-semibold text-lg">{skill.title}</h3>
                                <p className="text-gray-500">
                                    {skill.category === 1 ? 'Programming' : skill.category === 2 ? 'Design' : 'Other'}
                                </p>
                                <p className="text-gray-700">Level: {skill.skill_level}</p>
                                <p className="text-gray-700">Price: ${skill.price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No skills found. Adjust your filters and try again.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
