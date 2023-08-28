const express=require('express')
router=express.Router();
const register=require('../controllers/registerController')

router.post('/',register.handleNewUser);

module.exports=router;