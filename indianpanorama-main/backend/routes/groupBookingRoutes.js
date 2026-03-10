import express from 'express';
import GroupBooking from '../models/GroupBooking.js';
import Notification from '../models/Notification.js';
import { sendGroupBookingEmail } from '../utils/emailService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const bookings = await GroupBooking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const booking = new GroupBooking(req.body);
    try {
        const newBooking = await booking.save();

        // Generate Admin Notification
        await Notification.create({
            title: 'New Group Booking',
            message: `${newBooking.firstName} ${newBooking.lastName} requested a group booking.`,
            type: 'GroupBooking'
        });

        // Send Email Notification
        const emailSent = await sendGroupBookingEmail(newBooking);
        if (emailSent) {
            console.log('Email process completed successfully for group booking:', newBooking._id);
        } else {
            console.error('Email process failed for group booking:', newBooking._id);
        }

        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await GroupBooking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const booking = await GroupBooking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
