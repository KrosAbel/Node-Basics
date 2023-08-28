const express=require('express')
router=express.Router();
const refreshTokenController=require('../controllers/refreshTokenController')

router.route('/')
.get(refreshTokenController.handleRefreshToken);

module.exports=router;