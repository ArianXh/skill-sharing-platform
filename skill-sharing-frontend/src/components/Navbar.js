// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                            <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/explore" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                Explore
                            </Link>
                            <Link to="/marketplace" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                Marketplace
                            </Link>
                            <Link to="/about" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        <Link to="/login">
                            <button
                                type="button"
                                className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
                            >
                                Login
                            </button>
                        </Link>
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
                    <Link to="/login" className="block text-gray-900 py-2">
                        <button
                            type="button"
                            className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
                        >
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
