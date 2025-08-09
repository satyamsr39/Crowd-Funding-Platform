import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, // Razorpay order id
  receipt: String,
  amount: Number, // in paise
  currency: String,
  status: { type: String, enum: ['CREATED','PAID','FAILED'], default: 'CREATED' },
  createdAt: { type: Date, default: Date.now },
  razorpayResponse: Object
});

export default mongoose.model('Order', OrderSchema);
