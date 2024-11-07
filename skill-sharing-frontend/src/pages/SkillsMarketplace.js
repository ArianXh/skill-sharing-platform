import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
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
                                <Link
                                    key={skill.id}
                                    to={`/skills/${skill.id}`} // Link to the user's profile
                                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                >
                                    <h3 className="font-semibold text-lg">{skill.title}</h3>
                                    <p className="text-gray-500">
                                        {skill.category === 1 ? 'Programming' : skill.category === 2 ? 'Design' : 'Other'}
                                    </p>
                                    <p className="text-gray-700">Level: {skill.skill_level}</p>
                                    <p className="text-gray-700">Price: ${skill.price}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500">No skills found. Adjust your filters and try again.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
