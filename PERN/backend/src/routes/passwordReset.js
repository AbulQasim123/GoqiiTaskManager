const express = require('express');
const router = express.Router();
const { forgot, reset } = require('../controllers/passwordResetController');

router.post('/forgot-password', forgot);
router.post('/reset-password', reset);

module.exports = router;