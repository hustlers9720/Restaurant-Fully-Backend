import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract token
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token format' });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Token verification failed' });
        }

        req.user = decoded; // Attach user details to req.user
        next(); // Move to the next middleware

    } catch (error) {
        console.error('Auth Error:', error.message);
        return res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
    }
};
