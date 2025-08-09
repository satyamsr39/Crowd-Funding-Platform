const express = require('express');
const router = express.Router();
const NGO = require('../models/NGO');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g,'_'))
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const ngos = await NGO.find({ verified: true }).sort({ createdAt: -1 });

  res.json(ngos);
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const payload = req.body;
    if (req.file) payload.image = '/' + req.file.filename;
    payload.verified = false;
    const ngo = await NGO.create(payload);
    return res.status(201).json({ ok: true, ngo });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const ngo = await NGO.findById(req.params.id);
  if (!ngo) return res.status(404).json({ message: 'Not found' });
  if (!ngo.verified) return res.status(403).json({ message: 'Not verified' });
  res.json(ngo);
});

module.exports = router;