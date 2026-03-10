import mongoose from 'mongoose';

const groupBookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    eventDescription: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
        index: true
    },
}, { timestamps: true });

export default mongoose.model('GroupBooking', groupBookingSchema);
