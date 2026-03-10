import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Upcoming', 'Completed', 'Cancelled'], default: 'Upcoming' },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
