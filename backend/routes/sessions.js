const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Create a new session
router.post('/', async (req, res) => {
  const { userId, location } = req.body;
  try {
    const session = new Session({ userId, location });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update location and status
router.put('/:id', async (req, res) => {
  const { location, status } = req.body;
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { location, status, lastUpdated: Date.now() },
      { new: true }
    );
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get session info
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
