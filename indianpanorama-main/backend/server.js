import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import menuRoutes from './routes/menuRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import giftcardRoutes from './routes/giftcardRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import slugRoutes from './routes/slugRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import groupBookingRoutes from './routes/groupBookingRoutes.js';
import { adminAuth } from './middleware/adminAuth.js';
import fs from 'fs';

// Simple file logger for debugging
const logFile = path.join(process.cwd(), 'debug.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
    const msg = `[${new Date().toISOString()}] LOG: ${args.join(' ')}\n`;
    logStream.write(msg);
    originalLog(...args);
};

console.error = (...args) => {
    const msg = `[${new Date().toISOString()}] ERROR: ${args.join(' ')}\n`;
    logStream.write(msg);
    originalError(...args);
};

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Global request logger for debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
});

// Security & Scaling Middleware
// 1. Helmet sets essential HTTP headers (XSS filtering, HSTS, NoSniff)
app.use(helmet({
    crossOriginResourcePolicy: false, // Ensure image uploads return correctly across CORS
}));

// 2. Compression minimizes payload sizes before sending them to clients
app.use(compression());

// 3. Global Rate Limiting - General protection for all endpoints
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 500 requests per 15 minutes
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(globalLimiter);

// General Middleware
app.use(cors({
    origin: [
        'https://www.indianpanoramachelsea.co.uk',
        'https://indianpanoramachelsea.co.uk',
        'https://admin.indianpanoramachelsea.co.uk',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(express.json());
// Serve the uploads directory from the project root instead of /server/uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 4. Strict Rate Limiting for Public Submission Routes 
// Stops bots from spamming the database with fake inquiries or reservations
const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 200, // Strict limit: increased to 200 submissions per hour per IP
    message: 'Too many submissions created from this IP, please try again after an hour'
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/indian-panoram')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Indian Panoram API is running');
});

// API Routes
// PUBLIC content routes - frontend website reads these without auth
// Admin write ops (POST/PUT/DELETE) are protected per-route inside each file
app.use('/api/menu', menuRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/slugs', slugRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/locations', locationRoutes);

// SENSITIVE customer-data routes - fully protected by auth (GET, POST all require token)
app.use('/api/reservations', strictLimiter, adminAuth, reservationRoutes);
app.use('/api/group-bookings', strictLimiter, adminAuth, groupBookingRoutes);
app.use('/api/support', strictLimiter, adminAuth, supportRoutes);
app.use('/api/visitors', adminAuth, visitorRoutes);
app.use('/api/notifications', adminAuth, notificationRoutes);
app.use('/api/dashboard', adminAuth, dashboardRoutes);
app.use('/api/giftcards', adminAuth, giftcardRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

