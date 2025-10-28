const CommunityPost = require('../models/CommunityPost');

exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = new CommunityPost({ studentId: req.user._id, text });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ date: -1 }).limit(100).populate('studentId', 'name');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.react = async (req, res) => {
  try {
    const { postId, reaction = 'like' } = req.body;
    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ message: 'Not found' });
    const current = post.reactions.get(reaction) || 0;
    post.reactions.set(reaction, current + 1);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.comment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ message: 'Not found' });
    post.comments.push({ userId: req.user._id, text });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
