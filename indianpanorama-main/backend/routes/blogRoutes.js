import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import BlogPost from '../models/BlogPost.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appends timestamp to prevent overwrites
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const items = await BlogPost.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/slug/:slug', async (req, res) => {
    try {
        const item = await BlogPost.findOne({ slug: req.params.slug });
        if (!item) return res.status(404).json({ message: 'Blog post not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const blogData = { ...req.body };
        // If an actual file was uploaded, construct its public path
        if (req.file) {
            blogData.image = `/uploads/${req.file.filename}`;
        }

        // Convert string mapped booleans back to true booleans for form-data
        if (blogData.isPublished === 'true') blogData.isPublished = true;
        if (blogData.isPublished === 'false') blogData.isPublished = false;

        const item = new BlogPost(blogData);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const blogData = { ...req.body };
        if (req.file) {
            blogData.image = `/uploads/${req.file.filename}`;
        }

        if (blogData.isPublished === 'true') blogData.isPublished = true;
        if (blogData.isPublished === 'false') blogData.isPublished = false;

        const updated = await BlogPost.findByIdAndUpdate(req.params.id, blogData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
