const router= require('express').Router();
const controllerUser= require('./controller.user');

router.post('/signup',controllerUser.reqister);
router.post('/login',controllerUser.login);

module.exports=router;