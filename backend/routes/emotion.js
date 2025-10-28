const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { analyze, getMyAnalyses } = require('../controllers/emotionController');

router.post('/analyze', auth, analyze);
router.get('/my-analyses', auth, getMyAnalyses);

module.exports = router;
