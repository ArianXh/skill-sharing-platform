import React, { useState } from 'react';
import CommentSection from './CommentSection';

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const toggleComments = () => {
        setShowComments(!showComments);
    };
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">Posted by: {post.User.name}</p>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.tags && post.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-indigo-100 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            <button
                onClick={toggleComments}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
                {showComments ? 'Hide Comments' : 'View Comments'}
            </button>
            {showComments && <CommentSection postId={post.id} />}
        </div>
    );
};

export default PostCard;
