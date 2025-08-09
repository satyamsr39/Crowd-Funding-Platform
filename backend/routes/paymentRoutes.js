import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post('/order', async (req,res)=>{
  try{
    const { amount, currency='INR', receiptNote } = req.body;
    if(!amount) return res.status(400).json({ error:'amount required' });

    const options = {
      amount: Math.round(amount * 100), // rupees -> paise
      currency,
      receipt: receiptNote || `rcpt_${Date.now()}`
    };
    const rOrder = await razorpay.orders.create(options);

    const saved = await Order.create({
      orderId: rOrder.id,
      receipt: rOrder.receipt,
      amount: rOrder.amount,
      currency: rOrder.currency,
      razorpayResponse: rOrder,
      status: 'CREATED'
    });

    res.json(saved);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Verify payment
router.post('/verify', async (req,res)=>{
  try{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error:'missing fields' });
    }

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expected = hmac.digest('hex');

    if(expected !== razorpay_signature){
      await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status:'FAILED' });
      return res.status(400).json({ success:false, msg:'Invalid signature' });
    }

    // fetch payment details from Razorpay (optional)
    const razorpayInstance = razorpay;
    let paymentDetails = null;
    try { paymentDetails = await razorpayInstance.payments.fetch(razorpay_payment_id); } catch(e){}

    const p = await Payment.create({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: paymentDetails?.amount ?? null,
      currency: paymentDetails?.currency ?? null,
      status: paymentDetails?.status ?? 'captured',
      method: paymentDetails?.method ?? null,
      captured: paymentDetails?.captured ?? false,
      raw: paymentDetails ?? { fromClient: req.body }
    });

    await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status:'PAID' });

    res.json({ success:true, payment: p });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
