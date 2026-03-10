import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    specialRequests: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
        index: true
    },
}, { timestamps: true });

export default mongoose.model('Reservation', reservationSchema);
