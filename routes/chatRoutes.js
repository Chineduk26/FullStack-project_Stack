const router = require('express').Router();
const chatController = require('../controllers/chatcontroller');
const authware = require('../middleware/authware');

router.post('/', authware, chatController.sendMessage);
router.get('/history', authware, chatController.getHistory);

module.exports = router;
