const Journal = require('../models/Journal');
const Emotion = require('../models/Emotion');
const { analyzeText } = require('../utils/ai');

exports.createJournal = async (req, res) => {
  try {
    const { text, voiceUrl, emoji } = req.body;
    const journal = new Journal({ studentId: req.user._id, text, voiceUrl, emoji });
    await journal.save();

    // analyze emotion
    const { emotionType, confidence, aiResponse } = await analyzeText(text || emoji || '');
    journal.emotionDetected = emotionType;
    journal.emotionConfidence = confidence;
    await journal.save();

    const emotion = new Emotion({ journalId: journal._id, emotionType, confidenceScore: confidence, aiResponse });
    await emotion.save();

    res.json({ journal, emotion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJournals = async (req, res) => {
  try {
    const { studentId } = req.query;
    let filter = {};
    if (studentId) filter.studentId = studentId;
    else if (req.user.role === 'student') filter.studentId = req.user._id;

    const journals = await Journal.find(filter).sort({ date: -1 }).limit(200);
    res.json(journals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyEntries = async (req, res) => {
  try {
    const journals = await Journal.find({ studentId: req.user._id }).sort({ date: -1 }).limit(20);
    res.json(journals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
