const mongoose = require('mongoose');
const NGOSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['NGO','Person'], default: 'NGO' },
  description: String,
  contactEmail: String,
  contactNumber: String,
  upi_id: String,
  goal: { type: Number, default: 0 },
  collected: { type: Number, default: 0 },
  image: String,
  verified: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('NGO', NGOSchema);