const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { updateProfile, getProfile, getAISuggestions } = require('../controllers/userController');

router.post('/profile', auth, updateProfile);
router.get('/profile', auth, getProfile);
router.get('/ai-suggestions', auth, getAISuggestions);

module.exports = router;