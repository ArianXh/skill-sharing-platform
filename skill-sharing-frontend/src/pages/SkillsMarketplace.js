import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Marketplace = () => {
    const [skills, setSkills] = useState([]);
    const [category, setCategory] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/skills/skills', { 
                    params: {category, skill_level: skillLevel, search }});
                setSkills(response.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };

        fetchSkills();
    }, [category, skillLevel, search]);
    console.log(`Category: ${category}`)
    console.log(`Skill Level: ${skillLevel}`)
    console.log(`Search: ${search}`)
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
                            <option value="3">Data Science</option>
                            <option value="4">Marketing</option>
                            <option value="5">Business</option>
                            <option value="6">Personal Development</option>
                            <option value="7">Finance</option>
                            <option value="8">Language</option>
                            <option value="9">Health & Fitness</option>
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
                    {message && <p>{message}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.length > 0 ? (
                            skills.map((skill) => (
                                <Link   
                                    key={skill.id}
                                    to={`/skills/${skill.id}`} // Link to the single skill page
                                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-2xl transition duration-300"
                                >
                                    <h3 className="font-semibold text-lg">{skill.title}</h3>
                                    <p className="text-gray-500">
                                        {
                                            skill.category_id === 1 ? 'Programming': 
                                            skill.category_id === 2 ? 'Design'  : 
                                            skill.category_id === 3 ? 'Data Science' :
                                            skill.category_id === 4 ? 'Marketing' :
                                            skill.category_id === 5 ? 'Business' :
                                            skill.category_id === 6 ? 'Personal Development' :
                                            skill.category_id === 7 ? 'Finance' :
                                            skill.category_id === 8 ? 'Language' :
                                            skill.category_id === 9 ? 'Health & Fitness' : 
                                            'Other'
                                        }
                                    </p>
                                    <p className="text-gray-700">Level: {skill.skill_level}</p>
                                    <p className="text-blue-600 font-semibold mt-2">Price: {skill.hourly_rate} credits / hour</p>
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
