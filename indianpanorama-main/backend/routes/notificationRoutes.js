import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// Get all notifications (sorted newest first)
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mark a single notification as read
router.put('/:id/read', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.json(notification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mark all notifications as read
router.put('/read-all', async (req, res) => {
    try {
        await Notification.updateMany({ isRead: false }, { isRead: true });
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
