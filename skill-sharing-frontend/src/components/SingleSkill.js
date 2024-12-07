import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';  // Import Navbar component
import BookASession from './skills/BookASession';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const SingleSkill = () => {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);


     // dummy availability data
    const availability = {
        '2024-12-01': ['10:00 AM', '2:00 PM', '4:00 PM'],
        '2024-12-03': ['9:00 AM', '1:00 PM'],
    };
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/skills/skills/${id}`);
                
                if (!response.ok) {
                  throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setSkill(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        /*const fetchAvailability = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/skills/skills/${id}/availability`);
                if (!response.ok) {
                  throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setAvailability(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };*/

        fetchSkill();
        //fetchAvailability();
    }, [id]);
    console.log(availability)
    // Handle Review Submission
    const handleAddReview = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:5000/api/skills/skills/${id}/review`, { review_text: reviewText, rating }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSkill((prevSkill) => ({
                ...prevSkill,
                reviews: [...prevSkill.reviews, response.data]  // Add the new review to the list
            }));
            console.log(response.data);
            setReviewText('');
            setRating(0);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred while adding the review');
        }
    };

    // Handle Purchase Skill
    const handlePurchase = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const decodedToken = jwtDecode(token);
            const buyerId = decodedToken.user.id;
            const response = await axios.post('http://localhost:5000/api/transactions', { buyerId, skillId: id }, {
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

    const handleBookingConfirm = (date, slot, message) => {
        console.log('Booking confirmed:', { date, slot, message });
        setIsBookingOpen(false);
    };

    const handleViewProfileClick = () => {
        navigate(`/${skill.user_id}/profile`);
    };


    if (loading) return <p className="text-center text-gray-500 mt-5">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-5">Error: {error}</p>;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="container mx-auto p-6">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800">{skill.title}</h1>
                    <p className="text-lg text-gray-600 mt-4">{skill.description}</p>
                    <p className="mt-2 text-black-500">Posted by: {skill.user.name} ({skill.user.email})</p>

                     
                    <button
                        onClick={handleViewProfileClick}
                        className='px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none'
                    >
                        View Profile
                    </button>
                    

                    <p className="mt-4 text-xl font-semibold text-gray-700">Price: {skill.hourly_rate} credits / hour</p>

                    <p className="mt-2 text-gray-500">Skill Level: {skill.skill_level}</p>
                    
                     {/* Book a Session Button */}
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="px-4 py-2 mr-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none"
                    >
                        Book a Session
                    </button>

                    {/* Book a Session Modal */}
                    <BookASession
                        isOpen={isBookingOpen}
                        onClose={() => setIsBookingOpen(false)}
                        availability={availability}
                        onConfirm={handleBookingConfirm}
                    />
                    <button
                        onClick={handlePurchase}
                        className='px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none'
                    >
                        Purchase Skill
                    </button>
                    
                    
                    {message && <p className="mt-2 text-blue-500">{message}</p>}

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
                        {skill.reviews.length > 0 ? (
                            skill.reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-300 py-4">
                                    <p><strong>{review.user?.name || 'Anonymous'}</strong>: {review.review_text}</p>
                                    <p>Rating: {review.rating} stars</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </div>

                 {/* Add Review Section */}

                 {token ? (

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800">Add a Review</h3>
                    <form onSubmit={handleAddReview} className="mt-4">
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Write your review here..."
                            required
                        ></textarea>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full p-2 mt-2 border rounded-md"
                            required
                        >
                            <option value="" disabled>Rate the skill</option>
                            <option value={1}>1 Star</option>
                            <option value={2}>2 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={5}>5 Stars</option>
                        </select>

                        <button type="submit" className="px-4 py-2 mt-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 focus:outline-none">
                            Submit Review
                        </button>
                    </form>
                    {message && <p className="mt-2 text-blue-500">{message}</p>}
                </div>

                ) : (

                <p className="mt-6 text-gray-500">Log in to leave a review!</p>
                
                )}

            </div>
        </div>
    );
}

export default SingleSkill;