import mongoose from 'mongoose';

const giftCardSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchaserName: { type: String, required: true },
    recipientName: { type: String },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    status: { type: String, enum: ['Active', 'Used', 'Expired'], default: 'Active' },
}, { timestamps: true });

export default mongoose.model('GiftCard', giftCardSchema);
