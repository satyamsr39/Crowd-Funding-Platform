const express = require('express');
const router = express.Router();
const NGO = require('../models/NGO');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing' });
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    console.log("✅ Session after login:", req.session);
    return res.json({ ok: true });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(()=> res.json({ ok: true }));
});

function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  return res.status(401).json({ message: 'Unauthorized' });
}

router.get('/ngos', requireAdmin, async (req, res) => {
  const ngos = await NGO.find().sort({ createdAt: -1 });
  res.json(ngos);
});

router.post('/verify/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const ngo = await NGO.findByIdAndUpdate(id, { verified: true }, { new: true });
  if (!ngo) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true, ngo });
});

module.exports = router;