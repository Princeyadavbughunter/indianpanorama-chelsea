import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

// ─── Helpers ──────────────────────────────────────────────────────────

const getDeviceType = (userAgent) => {
    if (!userAgent) return 'Unknown';
    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/ipad|tablet/i.test(userAgent)) return 'Tablet';
    return 'Desktop';
};

// Normalise IPv4-mapped IPv6 like ::ffff:127.0.0.1 → 127.0.0.1
const normaliseIp = (raw) => {
    if (!raw) return '';
    // x-forwarded-for can be a comma-separated list; take the first (original client)
    const first = String(raw).split(',')[0].trim();
    return first.replace(/^::ffff:/i, '');
};

// Detect loopback, private-network, or link-local addresses — anything that
// is definitely *not* a real public visitor.
const isLocalOrPrivateIp = (ip) => {
    if (!ip) return true;
    if (ip === '::1' || ip === '127.0.0.1') return true;
    if (ip.startsWith('10.')) return true;
    if (ip.startsWith('192.168.')) return true;
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return true; // 172.16.0.0/12
    if (ip.startsWith('169.254.')) return true;             // link-local
    if (ip.startsWith('fc') || ip.startsWith('fd')) return true; // IPv6 ULA
    if (ip.startsWith('fe80:')) return true;                // IPv6 link-local
    return false;
};

// Filter out common bot/crawler user-agents and CLI tools.
const isBotUserAgent = (ua) => {
    if (!ua) return true; // no UA = almost certainly a script
    return /bot|crawler|spider|slurp|mediapartners|headless|curl|wget|python-requests|axios\/|postman/i.test(ua);
};

// Paths that should never count as a real website page-view.
const isIgnoredPath = (path) => {
    if (!path) return false;
    return /^\/(api|admin|_next|static|favicon|robots\.txt|sitemap)/i.test(path);
};

// Locations we consider "not a real visitor" when reading stats. These entries
// may exist in historical data, so every aggregation filters them out.
const EXCLUDED_LOCATIONS = ['Localhost Environment', 'Unknown', '', null];

// ─── POST /api/visitors — record a public site visit ──────────────────

router.post('/', async (req, res) => {
    try {
        const ip = normaliseIp(req.headers['x-forwarded-for'] || req.socket.remoteAddress);
        const userAgent = req.headers['user-agent'] || '';
        const path = (req.body && req.body.path) || '/';

        // Skip non-visitors entirely — don't write to DB, don't inflate counts.
        if (isLocalOrPrivateIp(ip) || isBotUserAgent(userAgent) || isIgnoredPath(path)) {
            return res.status(204).end();
        }

        // Dedupe: don't recount same IP within 30 minutes.
        const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
        const recentVisit = await Visitor.findOne({
            ip,
            createdAt: { $gte: thirtyMinsAgo }
        });

        if (recentVisit) {
            return res.status(200).json({ message: 'Visit already recorded recently' });
        }

        // Best-effort IP geolocation (ip-api.com — free tier, 45 req/min).
        let location = 'Unknown';
        try {
            const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=city,country,status`);
            if (geoRes.ok) {
                const geoData = await geoRes.json();
                if (geoData.status === 'success' && geoData.city && geoData.country) {
                    location = `${geoData.city}, ${geoData.country}`;
                } else if (geoData.country) {
                    location = geoData.country;
                }
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

// ─── GET /api/visitors/stats — aggregated dashboard analytics ────────

router.get('/stats', async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Base filter: real public visitors only. Applied to every aggregation
        // so historical "Localhost Environment" records stay out of the numbers.
        const publicVisitorFilter = {
            location: { $nin: EXCLUDED_LOCATIONS },
        };

        const totalVisitors = await Visitor.countDocuments(publicVisitorFilter);

        const chartData = await Visitor.aggregate([
            { $match: { ...publicVisitorFilter, createdAt: { $gte: startDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const topLocations = await Visitor.aggregate([
            { $match: { ...publicVisitorFilter, createdAt: { $gte: startDate } } },
            { $group: { _id: "$location", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
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
