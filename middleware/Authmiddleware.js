const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, 'yourSecretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        // Attach the decoded payload to the request object for use in subsequent middleware/routes
        req.user = decoded;

        // Move on to the next middleware or route
        next();
    });
};

module.exports = verifyToken;
