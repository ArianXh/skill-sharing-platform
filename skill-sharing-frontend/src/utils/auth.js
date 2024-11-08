// utils/auth.js
import jwt_decode, { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // Check if token is expired
    const currentTime = Date.now() / 1000; // current time in seconds
    if (decoded.exp < currentTime) {
      // Token has expired
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};
