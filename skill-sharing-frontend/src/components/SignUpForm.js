import React, { useState} from 'react';
import axios from 'axios'; // Axios for making HTTP requests
import Navbar from './Navbar';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('Form submitted:', formData);
        try {
            // Make the API call to register the user
            const response = await axios.post('http://localhost:5000/api/users/signup', formData);

            // Handle success
            setSuccess('Registration successful!');
            setError('');

            // Optionally, redirect the user or clear the form
            setFormData({
                name: '',
                email: '',
                password: '',
            });
        } catch (error){
            // Handle error
            setError(error.response.data.message || 'An error occured');
            setSuccess('');
        }
    };
    
    return (
      <div>
          <Navbar />
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              {success && <p className="text-green-500 text-center mb-4">{success}</p>}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
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

export default SignUpForm
