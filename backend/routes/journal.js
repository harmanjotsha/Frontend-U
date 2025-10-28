const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createJournal, getJournals, getMyEntries } = require('../controllers/journalController');

router.post('/', auth, createJournal);
router.get('/', auth, getJournals);
router.get('/my-entries', auth, getMyEntries);

module.exports = router;
