const User=require('../model/User')
const jwt=require('jsonwebtoken')


const handleRefreshToken= async (req,res)=>{
const cookies =req.cookies;
if(!cookies?.jwt)return res.sendStatus(401)
console.log(cookies.jwt)
const refreshToken=cookies.jwt;

const foundUser= await User.findOne({refreshtoken:refreshToken}).exec();
console.log('Found User',foundUser);
if(!foundUser)return res.status(403);// forbidden
//evaluate refreshToken
jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err,decoded)=>{
        if(err || foundUser.username!==decoded.username)return res.sendStatus(403)//forbidden
        const roles=Object.values(foundUser.roles)
        const accessToken=jwt.sign({
            "userInfo":{
            "username":decoded.username,
            "roles":roles}
        },
        process.env.ACCESS_TOKEN_SECRET,
        {"expiresIn":'1m'})
        res.json({accessToken})
    }
)
}

module.exports={handleRefreshToken}
