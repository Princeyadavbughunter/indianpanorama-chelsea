import express from 'express';
import Location from '../models/Location.js';
import Activity from '../models/Activity.js';
import GiftCard from '../models/GiftCard.js';
import MenuItem from '../models/MenuItem.js';
import BlogPost from '../models/BlogPost.js';
import Event from '../models/Event.js';
import Reservation from '../models/Reservation.js';
import GroupBooking from '../models/GroupBooking.js';

const router = express.Router();

// Get Locations
router.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json({ locations: locations.length ? locations : [{ name: "Leela Indian Main", address: "Local Branch", status: "Open" }] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Dashboard Metrics
router.get('/metrics', async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const [menuCount, blogCount, eventCount, reservationCount, giftCardCount, groupCount] = await Promise.all([
            MenuItem.countDocuments(),
            BlogPost.countDocuments(),
            Event.countDocuments({ createdAt: { $gte: startDate } }),
            Reservation.countDocuments({ createdAt: { $gte: startDate } }),
            GiftCard.countDocuments({ createdAt: { $gte: startDate } }),
            GroupBooking.countDocuments({ createdAt: { $gte: startDate } })
        ]);

        res.json({
            menuItems: menuCount,
            blogPosts: blogCount,
            events: eventCount,
            pendingReservations: reservationCount,
            giftCards: giftCardCount,
            groupBookings: groupCount,
            supportRequests: 0 // Mocking zero since support requests module isn't strictly defined
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Activities
router.get('/activities', async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const activities = await Activity.find({ createdAt: { $gte: startDate } })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get GiftCards
router.get('/giftcards', async (req, res) => {
    try {
        const cards = await GiftCard.find().sort({ createdAt: -1 });
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
