const express = require('express');
const router = express.Router();
const { register, login, me, logout, refresh, profile, updateProfile} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

router.use(authenticate);

router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/me', me);

router.get('/profile', profile);
router.put('/profile', updateProfile);

module.exports = router;