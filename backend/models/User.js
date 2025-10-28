const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  text: { type: String, default: '' },
  emoji: { type: String, default: '' },
  voice: { type: String, default: '' },
  severity: { type: String, enum: ['mild', 'moderate', 'severe'], default: 'mild' }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  
  // User challenges and profile
  challenges: {
    physical: { type: ChallengeSchema, default: {} },
    mental: { type: ChallengeSchema, default: {} },
    academic: { type: ChallengeSchema, default: {} },
    emotional: { type: ChallengeSchema, default: {} }
  },
  
  goals: { type: String, default: '' },
  support_preference: { 
    type: String, 
    enum: ['text', 'voice', 'visual', 'interactive'], 
    default: 'text' 
  },
  
  // Legacy fields
  interests: { type: [String], default: [] },
  
  // Profile completion status
  profile_completed: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
