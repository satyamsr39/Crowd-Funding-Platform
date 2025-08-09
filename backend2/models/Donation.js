const mongoose = require('mongoose');
const DonationSchema = new mongoose.Schema({
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
  donorName: String,
  donorEmail: String,
  amount: { type: Number, required: true },
  status: { type: String, enum: ['created','paid','failed'], default: 'created' },
  txn_id: String
}, { timestamps: true });
module.exports = mongoose.model('Donation', DonationSchema);