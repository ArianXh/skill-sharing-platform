import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/comments/${postId}`)
            .then(response => setComments(response.data))
            .catch(err => console.error("Error fetching comments:", err));
            
    }, [postId]);


    const handleCommentSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:5000/api/comments/${postId}`,
            { content: newComment },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
            setComments([...comments, response.data]); // Add new comment
            setNewComment('');
            console.log(`Response data: ${JSON.stringify(response.data)}`)
        } catch (err) {
            console.error('Error adding skill:', err);
            //setError('Failed to add skill');
          }
    };
    console.log(`Comments: ${JSON.stringify(comments)}`)
    return (
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold mb-3">Comments</h3>
            {comments.map(comment => (
                
                <p key={comment.id} className="text-gray-800 mb-2">{comment.User.name}: {comment.content}</p>
            ))}
            <form onSubmit={handleCommentSubmit} className="mt-4">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border rounded-lg w-full p-2 mb-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CommentSection;
