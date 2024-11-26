import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar'; // Import the Navbar component

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then(response => {
                //console.log(response.data); // Log data here
                setPosts(response.data.posts || response.data);
            })
            .catch(err => console.error(err));
    }, []);
    
    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts]); // Add new post to the list
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar /> {/* Add the Navbar here */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
                    Community Hub
                </h1>
                <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
                    <CreatePost onPostCreated={addNewPost} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.length > 0 ? (
                        posts.map(post => {
                            return <PostCard key={post.id} post={post} />;
                        })
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">
                            No posts yet. Be the first to share something!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
