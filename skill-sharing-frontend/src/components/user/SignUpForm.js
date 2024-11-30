import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '..//Navbar';

const SignUpForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    ratings_average: 0,
    bio: '',
    experience: '',
    credits: 0,
  });

  const handleSignUpChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };
  
  const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/users/signup', formData);
          setSuccess('Registration successful!');
          setError('');
          setFormData({
              name: '',
              email: '',
              password: '',
              role: '',
              bio: '',
              experience: '',
              credits: 0,
          });
      } catch (error) {
          setError(error.response?.data?.message || 'An error occurred');
          setSuccess('');
      }
  };
  
  return (
    <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <form onSubmit={handleSignUpSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleSignUpChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleSignUpChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleSignUpChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            {/* Bio */}
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleSignUpChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
                placeholder="Tell us a little about yourself..."
              />
            </div>
            {/* Experience */}
            <div className="mb-4">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleSignUpChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
                placeholder="Describe your experience..."
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
    </div>
  );
}

export default SignUpForm;
