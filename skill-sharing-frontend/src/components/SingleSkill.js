import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar component
import SkillDetails from './skills/SkillDetails';
import Reviews from './skills/Reviews';
import AddReview from './skills/AddReview';
import Modal from './skills/Modal';
import axios, { formToJSON } from 'axios';


const SingleSkill = () => {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/skills/skills/${id}`);
        setSkill(response.data);
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch skill.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id]);

  
  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/skills/skills/${id}/review`,
        { review_text: reviewText, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSkill((prevSkill) => ({
        ...prevSkill,
        reviews: [...prevSkill.reviews, response.data],
      }));
      setReviewText('');
      setRating(0);
      setIsModalOpen(false); // Close modal on successful review submission
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while adding the review.');
    }
  };

  const handleViewProfileClick = () => {
    navigate(`/${skill.user_id}/profile`);
  };

  if (loading) return <p className="text-center text-gray-500 mt-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <SkillDetails skill={skill} availabilities={skill.availabilities} handleViewProfileClick={handleViewProfileClick} />
        <Reviews reviews={skill.reviews} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none"
        >
          Add Review
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddReview
            reviewText={reviewText}
            setReviewText={setReviewText}
            rating={rating}
            setRating={setRating}
            handleAddReview={handleAddReview}
            token={token}
            message={message}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SingleSkill;
