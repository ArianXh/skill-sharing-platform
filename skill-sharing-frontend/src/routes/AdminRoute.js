// src/routes/AdminRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    //console.log(decodedToken.user);
    if (decodedToken.user.role !== 'admin') {
      return <Navigate to="/login" replace />;
    }

    return (
        <Outlet /> /* This will render the child routes (AdminDashboard, AdminUsers, AdminSettings) */
    );
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
