const User=require('../model/User')

const handleLogOut=async (req,res)=>{
    //on client, also delete access token
const cookies =req.cookies;
if(!cookies?.jwt)return res.sendStatus(204) //successful no content
const refreshToken=cookies.jwt;
//is refreshtoken in the db
const foundUser= await User.findOne({refreshtoken:refreshToken}).exec();
if(!foundUser){
    res.clearCookie('jwt',{"httpOnly":true,sameSite:'None',secure:true})
    return res.sendStatus(204)
}
//delete the refresh token in the db
foundUser.refreshtoken=''
const result= await foundUser.save();
console.log('Logged out User- ',result);
res.clearCookie('jwt',{"httpOnly":true,sameSite:'None',secure:true})//secure:true - only serves on https
res.sendStatus(204)
}

module.exports={handleLogOut}
