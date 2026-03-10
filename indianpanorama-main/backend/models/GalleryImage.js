import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
    title: { type: String },
    url: { type: String, required: true },
    alt: { type: String },
    order: { type: Number, default: 0 }, // For sorting UI
    category: { type: String, default: 'General' },
}, { timestamps: true });

export default mongoose.model('GalleryImage', galleryImageSchema);
