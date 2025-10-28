const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { listStudents, sendFeedback } = require('../controllers/teacherController');

router.get('/students', auth, listStudents);
router.post('/feedback', auth, sendFeedback);

module.exports = router;
