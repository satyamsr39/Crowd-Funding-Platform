const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
// app.use(cors({ origin: true, credentials: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(session({
//   name: 'charity.sid',
//   secret: process.env.SESSION_SECRET || 'devsecret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 2 }
// }));
app.use(session({
  name: 'charity.sid',
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2, // 2h
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production' // must be true on HTTPS
  }
}));




const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/charity_dev';

mongoose.connect(MONGODB_URI).then(()=> console.log('MongoDB connected')).catch(err=>console.error('MongoDB', err));

app.use('/api/admin', require('./routes/admin'));
app.use('/api/ngos', require('./routes/ngos'));
app.use('/api/donations', require('./routes/donations'));

app.get('/api/seed', async (req, res) => {
  const NGO = require('./models/NGO');
  const count = await NGO.countDocuments();
  if (count > 0) return res.json({ seeded: false, count });
  const examples = [
    { name: 'Asha Foundation', type: 'NGO', description: 'Education for underprivileged children.', contactEmail: 'contact@asha.org', goal: 50000, collected: 8000, verified: true, image: 'https://ashaf.org/wp-content/uploads/2020/12/PRYS1937.jpg' },
    { name: 'Care & Cure', type: 'NGO', description: 'Medical help for families in need.', contactEmail: 'info@carecure.org', goal: 100000, collected: 25000, verified: true, image: 'https://via.placeholder.com/400x200?text=Care+%26+Cure' },
    { name: 'Raju Singh', type: 'Person', description: 'Personal support for treatment.', contactEmail: 'raju@example.com', goal: 200000, collected: 15000, verified: true, image: 'https://via.placeholder.com/400x200?text=Raju' }
  ];
  await NGO.insertMany(examples);
  res.json({ seeded: true, count: examples.length });
});

app.get('/', (req, res) => res.send('Charity backend running'));

app.listen(PORT, ()=> console.log('Server listening on', PORT));