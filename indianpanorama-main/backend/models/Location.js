import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Downtown Branch"
    address: { type: String, required: true },
    phone: { type: String },
    capacity: { type: Number, default: 0 },
    currentOccupancy: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    status: { type: String, enum: ['Open', 'Closed', 'Busy'], default: 'Open' },
}, { timestamps: true });

export default mongoose.model('Location', locationSchema);
