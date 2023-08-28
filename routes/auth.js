const express=require('express')
router=express.Router();
const auth=require('../controllers/authController')

router.route('/')
.post(auth.handleLogIn);

module.exports=router;