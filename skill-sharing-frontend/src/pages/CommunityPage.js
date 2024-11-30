import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from '../components/community/CreatePost';
import PostCard from '../components/community/PostCard';
import Navbar from '../components/Navbar';

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then((response) => {
                setPosts(response.data.posts || response.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <header className="bg-blue-500 text-white py-10 px-6 rounded-lg shadow-lg mb-8">
                    <h1 className="text-4xl font-bold text-center">
                        Welcome to the Community Hub!
                    </h1>
                    <p className="text-center mt-4 text-lg">
                        Connect, share, and explore posts from the community.
                    </p>
                </header>

                {/* Main Content: Create Post & Posts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Create Post Section */}
                    <section className="bg-white shadow-lg rounded-lg p-6 lg:col-span-1">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                            Share Your Thoughts
                        </h2>
                        <CreatePost onPostCreated={addNewPost} />
                    </section>

                    {/* Recent Posts Section */}
                    <section className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Recent Posts
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        className="transform hover:scale-105 transition duration-300 ease-in-out shadow-md"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center col-span-full">
                                    No posts yet. Be the first to share something!
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
