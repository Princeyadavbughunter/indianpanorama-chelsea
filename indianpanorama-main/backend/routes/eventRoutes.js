import express from 'express';
import Event from '../models/Event.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await Event.find().sort({ date: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', adminAuth, async (req, res) => {
    const item = new Event(req.body);
    try {
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', adminAuth, async (req, res) => {
    try {
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
