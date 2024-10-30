import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // You can handle the form submission logic here
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Have any questions or need to reach out? Fill out the form below, and we'll get back to you as soon as possible.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
