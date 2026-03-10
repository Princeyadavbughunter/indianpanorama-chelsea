import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    location: { type: String, default: 'Unknown' },
    userAgent: { type: String },
    path: { type: String },
    device: { type: String, enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'], default: 'Unknown' }
}, { timestamps: true });

// Optimize for aggregated dashboard counting and timeframe filtering
visitorSchema.index({ createdAt: -1 });

export default mongoose.model('Visitor', visitorSchema);
