const mongoose = require('mongoose');

const EmotionSchema = new mongoose.Schema({
  journalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal' },
  emotionType: { type: String },
  confidenceScore: { type: Number },
  aiResponse: { type: Object },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emotion', EmotionSchema);
