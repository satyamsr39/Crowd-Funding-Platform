import express from 'express';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';

const router = express.Router();

router.use((req,res,next)=>{
  const token = req.header('x-admin-token');
  if(!token || token !== process.env.ADMIN_TOKEN) return res.status(401).json({ msg:'Unauthorized' });
  next();
});

router.get('/orders', async (req,res)=>{
  const orders = await Order.find().sort({ createdAt:-1 }).limit(500);
  res.json(orders);
});

router.get('/payments', async (req,res)=>{
  const payments = await Payment.find().sort({ createdAt:-1 }).limit(500);
  res.json(payments);
});

export default router;
