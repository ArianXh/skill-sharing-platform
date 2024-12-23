import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Modal from './Modal';
import BookingForm from './BookingForm';


const SkillDetails = ({ skill, availabilities, handleViewProfileClick }) => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [isBookingModalOpen, setBookingModalOpen] = useState(false); 

    const handleOpenModal = () => {
        setBookingModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setBookingModalOpen(false);
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
            return true; // indicates success
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred during the purchase.');
            console.error('Booking failed', error);
            return false;
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
                Price:
            </p>

            <p className="mt-2 text-gray-500">
                {skill.hourly_rate} credits / hour
            </p>

            
           
            <p className="mt-4 text-xl font-semibold text-gray-700">
                Skill Level:
            </p>
            <p className="mt-2 text-gray-500">{skill.skill_level}</p>

            <h3 className="mt-4 text-xl font-semibold text-gray-700 border-b-2 border-gray-600">Availabilities:</h3>
            {availabilities.length > 0 ? (
                availabilities.map((availability) => (
                <div key={availability.id} className="border-b border-gray-300 py-4">
                    <p>
                    <strong>{availability.day_of_week}</strong>
                    </p>
                    <p>Start Time: {availability.start_time}</p>
                    <p>End Time: {availability.end_time}</p>

                </div>
                ))
            ) : (
                <p>No availability yet.</p>
            )}


            <button
                onClick={() => setBookingModalOpen(true)} // Open the modal
                className="mt-4 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
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
                    onClose={handleCloseModal}
                    onSubmit={handlePurchase}
                    availabilities={availabilities}
                />
            </Modal>
        </div>
)};

export default SkillDetails;