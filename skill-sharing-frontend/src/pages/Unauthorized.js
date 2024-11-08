// src/pages/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Unauthorized Access</h1>
        <p className="mt-4 text-lg">You need to be logged in to view this page.</p>
        <Link to="/login" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
