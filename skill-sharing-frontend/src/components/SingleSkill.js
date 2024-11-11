import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';  // Import Navbar component
import axios from 'axios';

function SingleSkill() {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

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
        fetchSkill();
    }, [id]);

    const handlePurchase = async (skillId) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/skills/skills/purchase/${skillId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setMessage(`Successfully purchased skill! Remaining credits: ${response.data.remainingCredits}`);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred during purchase');
        }
    };

    // Handle Review Submission
    const handleAddReview = async (e) => {
        e.preventDefault();
        try {
            console.log("Rating submitted: ", rating);
            const response = await axios.post(
                `http://localhost:5000/api/skills/skills/${id}/review`,
                { review_text: reviewText, rating },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
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
                    <p className="mt-4 text-xl font-semibold text-gray-700">Price: ${skill.price}</p>
                    <p className="mt-2 text-gray-500">Skill Level: {skill.skill_level}</p>
                    <p className="mt-2 text-gray-500">Posted by: {skill.user.name} ({skill.user.email})</p>
                    <button onClick={() => handlePurchase(skill.id)} className='px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none'>Purchase Skill</button>


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
                {/* Add Review Form */}
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
                
            </div>
        </div>
    );
}

export default SingleSkill;
