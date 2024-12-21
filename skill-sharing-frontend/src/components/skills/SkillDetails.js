import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Modal from './Modal';
import BookingForm from './BookingForm';


const SkillDetails = ({ skill, handleViewProfileClick }) => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [isBookingModalOpen, setBookingModalOpen] = useState(false); // Booking Modal State

    const handleBookingSubmit = async (duration) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/transactions',
                { skillId: id, duration },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Booking successful!');
            setBookingModalOpen(false); // Close the modal after booking
        } catch (error) {
            console.error('Booking failed:', error);
            alert('An error occurred during booking.');
        }
    };

    const handlePurchase = async (duration) => {
        try {
            const token = localStorage.getItem('token'); 
            const decodedToken = jwtDecode(token);
            const buyerId = decodedToken.user.id;
            const response = await axios.post(
                'http://localhost:5000/api/transactions', 
                { buyerId, skillId: id, duration },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage('Purchase successful!');
            console.log('Transaction successful:', response.data);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred during the purchase.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800">{skill.title}</h1>
            <p className="text-lg text-gray-600 mt-4">{skill.description}</p>
            <p className="mt-2 text-black-500">
                Posted by: {skill.user.name} ({skill.user.email})
            </p>

            <button
                onClick={handleViewProfileClick}
                className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
            >
                View Profile
            </button>

            <p className="mt-4 text-xl font-semibold text-gray-700">
                Price: {skill.hourly_rate} credits / hour
            </p>

            <p className="mt-2 text-gray-500">Skill Level: {skill.skill_level}</p>
            <button
                onClick={() => setBookingModalOpen(true)} // Open the modal
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded"
            >
                Book a Session
            </button>

            {/* Booking Modal */}
            <Modal
                isOpen={isBookingModalOpen}
                onClose={() => setBookingModalOpen(false)} // Close the modal
            >
                <BookingForm
                    hourlyRate={skill.hourly_rate}
                    onSubmit={handlePurchase}
                />
            </Modal>
        </div>
)};

export default SkillDetails;