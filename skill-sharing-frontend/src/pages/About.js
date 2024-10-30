import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            Welcome to Skill Sharing Platform, a space where users can share, learn, and grow together. Our mission is to connect learners with skilled professionals in various fields, offering accessible and diverse learning opportunities.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            We believe in the power of collaboration and community. Whether you're an expert looking to teach or a learner wanting to develop new skills, our platform provides the tools and community support needed to make it happen.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our journey started with a simple idea: make knowledge-sharing easy and accessible. We aim to continuously improve and adapt to meet the needs of our growing community.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
