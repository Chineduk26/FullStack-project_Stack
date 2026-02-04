const router = require('express').Router();
const crt =require('../controllers/chatcontroller');

router.post('/',crt.sendMessage);
router.get('/history',crt.getHistory);
module.exports=router;