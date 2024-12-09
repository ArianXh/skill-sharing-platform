import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            const token = localStorage.getItem('token');

            const newPost = {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()), // Convert tags into an array
            };

            const response = await axios.post('http://localhost:5000/api/posts', newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            
            onPostCreated(response.data); // Notify parent of the new post
            setTitle('');
            setContent('');
            setTags('');
        }
         catch (err) {
            console.error('Error adding posts:', err);
            //setError('Failed to add post');
          }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                    type="text"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Content</label>
                <textarea
                    placeholder="Write something..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Tags</label>
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                    Separate tags with commas, e.g., "React, TailwindCSS, Community"
                </p>
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition"
            >
                Post
            </button>
        </form>
    );
};

export default CreatePost;
