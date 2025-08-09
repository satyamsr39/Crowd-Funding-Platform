import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB connected');

app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
