// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null); // State to hold user info
    const location = useLocation(); // Get current location
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
      };

    const handleLogout = () => {
        localStorage.removeItem('token'); // remove token from localStorage
        setUser(null); // Optionally clear user state
        navigate('/'); // Redirect to the login page
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:5000/api/users/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data); // Set user data
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium'
            : 'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium';
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {/* You can add a logo here if needed */}
                        </div>
                        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className={getLinkClass('/')}>Home</Link>
                            <Link to="/explore" className={getLinkClass('/explore')}>Explore</Link>
                            <Link to="/marketplace" className={getLinkClass('/marketplace')}>Marketplace</Link>
                            <Link to="/about" className={getLinkClass('/about')}>About</Link>
                            <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        {user ? (
                        <>
                            <span className="text-gray-900 px-4 py-2">
                                <b>Welcome, {user.name}</b>
                            </span>
                            <button
                                type="button"
                                onClick={handleProfileClick}
                                className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none"
                            >
                                My Profile
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none"
                            >
                                Logout
                            </button>
                          </>
                        ) : (
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
                                >
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                    {/* Hamburger Icon */}
                    <div className="flex sm:hidden">
                        <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-4 py-2">
                    <Link to="/" className="block text-gray-900 py-2">Home</Link>
                    <Link to="/explore" className="block text-gray-900 py-2">Explore</Link>
                    <Link to="/marketplace" className="block text-gray-900 py-2">Marketplace</Link>
                    <Link to="/about" className="block text-gray-900 py-2">About</Link>
                    <Link to="/contact" className="block text-gray-900 py-2">Contact</Link>
                    {user ? (
                        <span className="block text-gray-900 py-2">
                            Welcome, {user.name}
                        </span>
                    ) : (
                        <Link to="/login">
                            <button
                                type="button"
                                className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
                            >
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
