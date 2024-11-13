const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware/controller
    } else {
        res.status(403).json({ error: 'Access denied: Admins only.' });
    }
};

module.exports =  adminAuth;