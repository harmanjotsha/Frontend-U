const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String },
  voiceUrl: { type: String },
  emoji: { type: String },
  emotionDetected: { type: String },
  emotionConfidence: { type: Number },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', JournalSchema);
