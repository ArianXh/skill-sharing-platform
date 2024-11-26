import React from 'react';
import Navbar from '../components/Navbar';

const Explore = () => {
    const categories = ['Programming', 'Design', 'Marketing', 'Music', 'Languages']; // Example categories

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Explore Categories</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category}</h2>
                                <p className="text-gray-600">
                                    Explore various {category.toLowerCase()} resources, tutorials, and classes curated just for you.
                                </p>
                                <a href="#"className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-500">
                                    Learn More
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
