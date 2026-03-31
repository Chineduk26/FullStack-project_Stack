const router = require('express').Router();
const webhookController = require('../controllers/n8nController');

router.post('/n8n', webhookController.n8nMessage);

module.exports = router;
