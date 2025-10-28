const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { challenges, goals, support_preference, age } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        challenges,
        goals,
        support_preference,
        age,
        profile_completed: true
      },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAISuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const suggestions = [];

    // Generate suggestions based on user challenges
    if (user.challenges?.mental?.severity === 'severe') {
      suggestions.push({
        type: 'mental_health',
        title: 'मानसिक स्वास्थ्य सहायता',
        message: 'आपकी मानसिक स्थिति के लिए विशेष देखभाल की जरूरत है। कृपया किसी विशेषज्ञ से संपर्क करें।',
        priority: 'high'
      });
    }

    if (user.challenges?.academic?.text) {
      suggestions.push({
        type: 'academic',
        title: 'शैक्षणिक सहायता',
        message: 'आपकी पढ़ाई की समस्याओं के लिए व्यक्तिगत ट्यूटरिंग सेशन उपलब्ध है।',
        priority: 'medium'
      });
    }

    if (user.support_preference === 'interactive') {
      suggestions.push({
        type: 'chatbot',
        title: 'AI चैटबॉट',
        message: 'हमारा AI असिस्टेंट आपके सवालों का जवाब देने के लिए तैयार है।',
        priority: 'low'
      });
    }

    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};