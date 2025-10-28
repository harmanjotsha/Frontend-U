const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, listPosts, react, comment } = require('../controllers/communityController');

router.post('/', auth, createPost);
router.get('/', auth, listPosts);
router.post('/react', auth, react);
router.post('/comment', auth, comment);

module.exports = router;
