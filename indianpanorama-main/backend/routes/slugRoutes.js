import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Slug from '../models/Slug.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, 'slug-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all slugs
router.get('/', async (req, res) => {
    try {
        const items = await Slug.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single slug by its URL path
router.get('/path/:slug', async (req, res) => {
    try {
        const item = await Slug.findOne({ slug: req.params.slug });
        if (!item) return res.status(404).json({ message: 'Landing page not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new slug page
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const slugData = { ...req.body };
        if (req.file) {
            slugData.image = `/uploads/${req.file.filename}`;
        }

        const item = new Slug(slugData);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update specific slug
router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const slugData = { ...req.body };
        if (req.file) {
            slugData.image = `/uploads/${req.file.filename}`;
        }

        // Remove 'image' from payload if no new file is uploaded to prevent blanking the existing image
        if (!req.file && slugData.image === 'null') {
            delete slugData.image;
        }

        const updated = await Slug.findByIdAndUpdate(req.params.id, slugData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a slug
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await Slug.findByIdAndDelete(req.params.id);
        res.json({ message: 'Landing page slug deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
