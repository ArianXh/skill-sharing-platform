import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
