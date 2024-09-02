import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      
                      
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
                        Home
                      </a>
                      <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                        Explore
                      </a>
                      <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                        About
                      </a>
                      <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                        Contact
                      </a>
                    </div>
                  </div>
                  <Link to="/login" className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                    type="button"
                    className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
                    >
                    Login
                    </button>
                  </Link>
                </div>
              </div>
            </nav>
            {/* Hero Section */}
            <header className="bg-blue-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to SkillShare Hub</h1>
                    <p className="text-xl mb-8">
                        Share your skills with the world, learn from others, and grow your expertise.
                    </p>
                    <a
                        href="/signup"
                        className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Get Started | Sign Up Now
                    </a>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Share Your Skills</h3>
                            <p className="text-gray-600">
                                Create a profile, list your skills, and start sharing your expertise with others. Set your
                                own prices and earn money by helping others.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Learn New Skills</h3>
                            <p className="text-gray-600">
                                Explore a wide range of skills and topics. Connect with experts in the field and learn
                                directly from them.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Grow Your Network</h3>
                            <p className="text-gray-600">
                                Join a community of like-minded individuals. Grow your network, collaborate on projects,
                                and advance your career.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-100 shadow-md rounded-lg">
                            <p className="text-gray-600 mb-4">
                                "SkillShare Hub has helped me grow my business by connecting me with clients who need my
                                expertise. It's a fantastic platform!"
                            </p>
                            <h4 className="text-xl font-semibold">John Doe</h4>
                        </div>
                        <div className="p-6 bg-gray-100 shadow-md rounded-lg">
                            <p className="text-gray-600 mb-4">
                                "I've learned so much from the experts on SkillShare Hub. The community is supportive,
                                and I've made great connections."
                            </p>
                            <h4 className="text-xl font-semibold">Jane Smith</h4>
                        </div>
                        <div className="p-6 bg-gray-100 shadow-md rounded-lg">
                            <p className="text-gray-600 mb-4">
                                "As a new user, I found the platform easy to navigate and the support team very helpful.
                                Highly recommend it!"
                            </p>
                            <h4 className="text-xl font-semibold">Mary Johnson</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
                    <p className="text-xl mb-8">
                        Join the community of skilled professionals and learners. Share your expertise or learn new
                        skills today.
                    </p>
                    <a
                        href="/signup"
                        className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Sign Up Now
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-400">&copy; 2024 SkillShare Hub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
