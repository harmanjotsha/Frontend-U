const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  date: { type: Date, default: Date.now }
});

const CommunitySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  reactions: { type: Map, of: Number, default: {} },
  comments: { type: [CommentSchema], default: [] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommunityPost', CommunitySchema);
