const express = require('express');
const router = express.Router();
const { index, store, show, update, destroy, stats } = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);
router.get('/stats', stats);
router.get('/', index);
router.post('/', store);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;