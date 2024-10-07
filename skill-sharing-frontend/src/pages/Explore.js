import React from 'react';

const Explore = () => {
    const categories = ['Programming', 'Design', 'Marketing', 'Music', 'Languages']; // Example categories

    return (
        <div>
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                <a href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                    Home
                                </a>
                                <a href="/explore" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
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
                                <a
                                    href="#"
                                    className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-500"
                                >
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
