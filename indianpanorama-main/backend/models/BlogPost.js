import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    author: { type: String, default: 'Admin' },
    image: { type: String },
    isPublished: { type: Boolean, default: true },
    tags: [String],
}, { timestamps: true });

export default mongoose.model('BlogPost', blogPostSchema);
