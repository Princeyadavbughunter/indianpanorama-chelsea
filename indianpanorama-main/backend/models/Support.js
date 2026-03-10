import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    issue: { type: String, required: true },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
}, { timestamps: true });

export default mongoose.model('Support', supportSchema);
