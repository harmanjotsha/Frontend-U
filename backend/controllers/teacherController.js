const User = require('../models/User');
const Feedback = require('../models/Feedback');

exports.listStudents = async (req, res) => {
  try {
    // only teacher
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Forbidden' });
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendFeedback = async (req, res) => {
  try {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Forbidden' });
    const { studentId, message } = req.body;
    const fb = new Feedback({ teacherId: req.user._id, studentId, message });
    await fb.save();
    res.json(fb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
