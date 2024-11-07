import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    experience: '',
  });
  
  const [skillData, setSkillData] = useState({
    title: '',
    description: '',
    price: '',
    skill_level: '',
  });

  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          bio: response.data.bio,
          experience: response.data.experience,
        });
        setSkills(response.data.skills || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setMessage('');
  };

  const handleSkillChange = (e) => {
    setSkillData({
      ...skillData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/users/profile',
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Profile updated successfully');
      setLoading(false);
      navigate('/profile');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Error updating profile');
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/skills/create',
        { ...skillData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSkills([...skills, response.data]);
      setSkillData({ title: '', description: '', price: '' , skill_level: ''});
      setMessage('Skill added successfully');
    } catch (err) {
      console.error('Error adding skill:', err);
      setError('Failed to add skill');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Edit Profile
          </h2>

          {loading && <p className="text-center text-gray-500 mb-4">Loading...</p>}
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          {message && <p className="text-center text-green-500 mb-4">{message}</p>}

          <div className="flex flex-wrap space-x-4">
            {/* Update Profile Form */}
            <form onSubmit={handleUpdate} className="flex-1 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required />
              </div>

              <div>
                <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">Bio</label>
                <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your bio" required />
              </div>

              <div>
                <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">Experience</label>
                <textarea name="experience" id="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your experience" required />
              </div>

              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="flex-1 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Add Skill</h3>

              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Skill Title</label>
                <input type="text" name="title" id="title" value={skillData.title} onChange={handleSkillChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter skill title" required />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea name="description" id="description" value={skillData.description} onChange={handleSkillChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter skill description" required />
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
                <input type="number" name="price" id="price" value={skillData.price} onChange={handleSkillChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter skill price" required />
              </div>

              <div>
                <label htmlFor="skill_level" className="block text-gray-700 font-medium mb-2">Skill Level</label>
                <select name="skill_level" id="skill_level" value={skillData.skill_level} onChange={handleSkillChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300">Add Skill</button>
            </form>
          </div>

          {/* Display Current Skills */}
          <h3 className="text-xl font-bold mt-8 text-gray-800">Current Skills</h3>
          <ul className="mt-4 space-y-2">
            {skills.map((skill) => (
              <li key={skill.id} className="p-2 border rounded bg-gray-100">
                <p className="text-lg font-semibold">Title: {skill.title}</p>
                <p>Description: {skill.description}</p>
                <p>Price: ${skill.price}</p>
                <p>Level: {skill.skill_level}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
