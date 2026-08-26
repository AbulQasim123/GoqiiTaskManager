const express = require('express');
const router = express.Router();
const { index, actions } = require('../controllers/auditLogController');
const { authenticate } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/requireAdmin');

router.use(authenticate, requireAdmin);
router.get('/', index);
router.get('/actions', actions);

module.exports = router;