import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['Reservation', 'Support', 'Order', 'System', 'GroupBooking'], required: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
