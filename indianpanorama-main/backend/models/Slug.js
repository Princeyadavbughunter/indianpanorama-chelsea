import mongoose from 'mongoose';

const slugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    category: { type: String },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft',
        index: true
    },
    image: { type: String },
    backgroundColor: { type: String, default: '#ffffff' },
    textColor: { type: String, default: '#000000' },
    ctaText: { type: String },
    ctaLink: { type: String },
    content: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String }
}, { timestamps: true });

export default mongoose.model('Slug', slugSchema);
