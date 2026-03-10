import express from 'express';
import GiftCard from '../models/GiftCard.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await GiftCard.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const item = new GiftCard(req.body);
    try {
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await GiftCard.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await GiftCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
