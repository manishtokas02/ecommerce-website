const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];

    if (!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: 'Not authenticated',
            message: "Authentication Failed"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        };
        next(); // Token is valid, proceed to the next middleware
    } catch (err) {
        return res.status(401).json({
            success: false,
            data: {},
            error: 'Not authenticated',
            message: "Invalid Token"
        });
    }
}

async function isAdmin(req, res, next) {
    const loggedInUser = req.user;
    
    if (loggedInUser.role === "ADMIN") {
        return next(); // User is an admin, proceed to the next middleware or route
    }

    // User is not an admin, send unauthorized error response
    return res.status(401).json({
        success: false,
        data: {},
        message: "You are not authorized for this action",
        error: {
            reason: "Unauthorized user for this action"
        }
    });
}

module.exports = {
    isLoggedIn,
    isAdmin
};
