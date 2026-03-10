import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    user: { type: String, required: true }, // e.g., "Admin", "Customer"
    action: { type: String, required: true }, // e.g., "New Reservation", "Menu Update"
    details: { type: String },
    type: { type: String, enum: ['Order', 'Reservation', 'System', 'Review'], default: 'System' }
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
