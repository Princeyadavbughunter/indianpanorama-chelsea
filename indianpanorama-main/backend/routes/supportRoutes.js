import express from 'express';
import Support from '../models/Support.js';
import Notification from '../models/Notification.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await Support.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const item = new Support(req.body);
    try {
        const savedItem = await item.save();

        // Generate Admin Notification
        await Notification.create({
            title: 'New Support Ticket',
            message: `${savedItem.name} submitted a request regarding: ${savedItem.subject}`,
            type: 'Support'
        });

        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Support.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await Support.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
