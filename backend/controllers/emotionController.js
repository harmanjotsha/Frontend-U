const { analyzeText } = require('../utils/ai');
const Emotion = require('../models/Emotion');
const Journal = require('../models/Journal');

exports.analyze = async (req, res) => {
  try {
    const { text, journalId } = req.body;
    const { emotionType, confidence, aiResponse } = await analyzeText(text);

    if (journalId) {
      const j = await Journal.findById(journalId);
      if (j) {
        j.emotionDetected = emotionType;
        j.emotionConfidence = confidence;
        await j.save();
      }
    }

    const emotion = new Emotion({ journalId, emotionType, confidenceScore: confidence, aiResponse });
    await emotion.save();
    res.json({ emotion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyAnalyses = async (req, res) => {
  try {
    // Get emotions linked to user's journals
    const userJournals = await Journal.find({ studentId: req.user._id });
    const journalIds = userJournals.map(j => j._id);
    
    const emotions = await Emotion.find({ 
      journalId: { $in: journalIds } 
    }).sort({ date: -1 }).limit(20);
    
    res.json(emotions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
