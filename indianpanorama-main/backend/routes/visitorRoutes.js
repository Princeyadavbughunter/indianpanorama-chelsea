import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

// Helper to determine device type from User Agent
const getDeviceType = (userAgent) => {
    if (!userAgent) return 'Unknown';
    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/ipad|tablet/i.test(userAgent)) return 'Tablet';
    return 'Desktop';
};

// POST: Record a new site visit
router.post('/', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'] || '';
        const path = req.body.path || '/';

        // Simple anti-spam/duplicate mechanism (don't recount same IP within 30 minutes)
        const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
        const recentVisit = await Visitor.findOne({
            ip,
            createdAt: { $gte: thirtyMinsAgo }
        });

        if (recentVisit) {
            return res.status(200).json({ message: 'Visit already recorded recently' });
        }

        // Basic Geolocation fallback using a free API (ip-api.com) for production use
        let location = 'Unknown';
        try {
            // Only lookup if IP is valid and public (skip localhost during dev to prevent API exhaustion)
            if (ip && ip !== '::1' && ip !== '127.0.0.1') {
                const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=city,country`);
                if (geoRes.ok) {
                    const geoData = await geoRes.json();
                    if (geoData.city && geoData.country) {
                        location = `${geoData.city}, ${geoData.country}`;
                    }
                }
            } else {
                location = 'Localhost Environment';
            }
        } catch (e) {
            console.error('IP Geolocation failed:', e.message);
        }

        const visit = new Visitor({
            ip,
            location,
            userAgent,
            path,
            device: getDeviceType(userAgent)
        });

        await visit.save();
        res.status(201).json({ message: 'Visit recorded' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Aggregated Dashboard Analytics
router.get('/stats', async (req, res) => {
    try {
        const totalVisitors = await Visitor.countDocuments();

        const days = parseInt(req.query.days) || 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const chartData = await Visitor.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Get Top Locations
        const topLocations = await Visitor.aggregate([
            { $match: { location: { $ne: 'Unknown' }, createdAt: { $gte: startDate } } },
            { $group: { _id: "$location", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 4 }
        ]);

        res.json({
            totalVisitors,
            chartData,
            topLocations
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
