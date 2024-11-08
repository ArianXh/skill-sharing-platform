import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';  // Import Navbar component

function SingleSkill() {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
                        {skill.reviews.length > 0 ? (
                            skill.reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-300 py-4">
                                    <p><strong>{review.user.name}</strong>: {review.review}</p>
                                    <p>Rating: {review.rating} stars</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleSkill;
