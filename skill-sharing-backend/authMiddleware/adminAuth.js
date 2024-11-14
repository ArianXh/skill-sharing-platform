// adminAuth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('ROLEEE: ', decodedToken.user.role)
    // Check if user has admin role
    if (decodedToken.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges are required.' });
    }

    req.user = decodedToken; // Attach decoded token to request
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

module.exports = adminAuth;
