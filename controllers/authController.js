const User=require('../model/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const handleLogIn=async(req,res)=>{
const {user,pwd} =req.body;
if(!user||!pwd)return res.status(401).json({"Message":"Username and password are required."})
const foundUser= await User.findOne({username:user}).exec();
console.log(foundUser);
if(!foundUser)return res.sendStatus(401);// unathorized
//evaluate password
const match=await bcrypt.compare(pwd,foundUser.password)
if(match){

    //JWTs
const roles=Object.values(foundUser.roles)

const accessToken=jwt.sign(
    {
        "userInfo":{
        "username":foundUser.username,
        "roles":roles}
    },
    process.env.ACCESS_TOKEN_SECRET,
    {"expiresIn":'1m'}
);
const refreshToken=jwt.sign(
    {"username":foundUser.username},
    process.env.REFRESH_TOKEN_SECRET,
    {"expiresIn":'1d'}
);
//Save refresh token
foundUser.refreshtoken=refreshToken
const result = await foundUser.save();
console.log(result)
res.cookie('jwt',refreshToken,{"httpOnly":true,sameSite:'None',maxAge:24*60*60*1000});//secure:true,

res.json({accessToken})
   
}else{
    res.sendStatus(401);
}
}

module.exports={handleLogIn}
