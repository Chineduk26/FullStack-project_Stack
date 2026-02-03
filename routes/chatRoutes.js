const router = require('express').Router();
const crt =require('../controllers/chatcontroller');

router.post('/',crt.sendMessage);
router.get('/',crt.getHistory);
module.exports=router;