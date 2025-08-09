import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true },
  orderId: { type: String, required: true },
  amount: Number,
  currency: String,
  status: String,
  method: String,
  captured: Boolean,
  createdAt: { type: Date, default: Date.now },
  raw: Object
});

export default mongoose.model('Payment', PaymentSchema);
