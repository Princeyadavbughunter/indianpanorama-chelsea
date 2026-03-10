import express from 'express';
import Reservation from '../models/Reservation.js';
import Notification from '../models/Notification.js';
import { sendReservationEmail, sendCustomerConfirmationEmail } from '../utils/emailService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: -1 });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    console.log('--- NEW RESERVATION REQUEST RECEIVED ---');
    console.log('Body:', req.body);
    const reservation = new Reservation(req.body);
    try {
        const newRes = await reservation.save();

        // Generate Admin Notification
        await Notification.create({
            title: 'New Reservation',
            message: `${newRes.name} booked a table for ${newRes.guests} guests on ${new Date(newRes.date).toLocaleDateString()}`,
            type: 'Reservation'
        });

        // Send Email Notifications
        // Only try sending email if SMTP_USER is configured
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            // Send Admin Notification
            const adminEmailSent = await sendReservationEmail(newRes);
            if (adminEmailSent) {
                console.log('Admin email notification completed successfully for reservation:', newRes._id);
            } else {
                console.error('Admin email notification failed for reservation:', newRes._id);
            }

            // Send Customer Confirmation
            const customerEmailSent = await sendCustomerConfirmationEmail(newRes);
            if (customerEmailSent) {
                console.log('Customer confirmation email completed successfully for reservation:', newRes._id);
            } else {
                console.error('Customer confirmation email failed for reservation:', newRes._id);
            }
        } else {
            console.warn('Skipping email notification: SMTP credentials not configured in .env');
        }

        res.status(201).json(newRes);
    } catch (err) {
        console.error('Reservation Error:', err);
        res.status(400).json({ message: err.message || 'Failed to create reservation' });
    }
});

// Update reservation status (e.g., Pending -> Confirmed)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update reservation (Full update)
router.put('/:id', async (req, res) => {
    try {
        const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Reservation not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete reservation
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Reservation.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Reservation not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
