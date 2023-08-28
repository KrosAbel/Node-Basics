const express=require('express')
router=express.Router();
const logoutController=require('../controllers/logoutController')

router.route('/')
.get(logoutController.handleLogOut);

module.exports=router;