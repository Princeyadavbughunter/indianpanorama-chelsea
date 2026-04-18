import mongoose from 'mongoose';

const bookingButtonSchema = new mongoose.Schema({
    label: { type: String, required: true },
    url: { type: String, required: true },
    style: {
        type: String,
        enum: ['gold', 'outline', 'opentable', 'sevenrooms', 'deliveroo'],
        default: 'gold',
    },
}, { _id: false });

const slugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    heroSubtitle: { type: String },
    description: { type: String },
    category: { type: String, default: 'Promotion' },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft',
        index: true,
    },
    image: { type: String },
    content: { type: String },
    bookingButtons: { type: [bookingButtonSchema], default: [] },
    metaTitle: { type: String },
    metaDescription: { type: String },

    // Deprecated — kept only for backwards-compatibility with old records.
    backgroundColor: { type: String },
    textColor: { type: String },
    ctaText: { type: String },
    ctaLink: { type: String },
}, { timestamps: true });

export default mongoose.model('Slug', slugSchema);
