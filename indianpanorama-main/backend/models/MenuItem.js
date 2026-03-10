import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String }, // Store image URL/path
    isPopular: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
