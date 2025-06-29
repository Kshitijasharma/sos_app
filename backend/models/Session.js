const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userId: { type: String },
  location: {
    latitude: Number,
    longitude: Number,
  },
  status: {
    type: String,
    enum: ['active', 'escalated', 'completed'],
    default: 'active',
  },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', SessionSchema);
