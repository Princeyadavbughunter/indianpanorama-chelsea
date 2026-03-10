import dotenv from 'dotenv';
dotenv.config();

export const adminAuth = (req, res, next) => {
    // Check if the route is deliberately bypassing auth (for public POST routes handled within mixed files)
    if (req.method === 'POST') {
        const publicPostRoutes = ['/api/reservations', '/api/group-bookings', '/api/support', '/api/visitors'];
        console.log('--- AUTH BYPASS CHECK ---');
        console.log('Method:', req.method, 'BaseUrl:', req.baseUrl, 'OriginalUrl:', req.originalUrl);
        if (publicPostRoutes.includes(req.baseUrl)) {
            console.log('Auth bypassed for public POST route');
            return next();
        }
    }
    console.log('--- AUTH REQUIRED CHECK ---');
    console.log('Method:', req.method, 'BaseUrl:', req.baseUrl, 'AuthHeader:', !!req.headers.authorization);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Auth blocked: Missing or invalid token format for', req.url);
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token format' });
    }

    const token = authHeader.split(' ')[1];
    const adminSecret = process.env.ADMIN_SECRET || 'leela_admin_secret_123';

    if (token === adminSecret) {
        next();
    } else {
        console.error('Auth blocked: Invalid token for', req.url);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
