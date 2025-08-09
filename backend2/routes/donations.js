const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/', async (req, res) => {
  try {
    const { ngoId, donorName, donorEmail, amount } = req.body;
    if (!ngoId || !amount) return res.status(400).json({ message: 'Missing fields' });
    const donation = await Donation.create({ ngo: ngoId, donorName, donorEmail, amount, status: 'created' });
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: donation._id.toString(),
      payment_capture: 1,
      notes: { ngoId: ngoId }
    });
    res.json({ orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID, donationId: donation._id, amount: Math.round(amount * 100) });
  } catch (err) { console.error(err); res.status(500).json({ message: err.message }); }
});

router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } = req.body;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
    if (expected === razorpay_signature) {
      const donation = await Donation.findById(donationId);
      donation.status = 'paid'; donation.txn_id = razorpay_payment_id; await donation.save();
      await NGO.findByIdAndUpdate(donation.ngo, { $inc: { collected: donation.amount } });
      return res.json({ ok: true });
    } else {
      return res.status(400).json({ ok: false, message: 'Invalid signature' });
    }
  } catch (err) { console.error(err); res.status(500).json({ message: err.message }); }
});

module.exports = router;