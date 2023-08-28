const User=require('../model/User')
const bcrypt=require('bcrypt')

const handleNewUser= async (req,res)=>{
    const {user,pwd}=req.body;
    if(!user||!pwd){
        return res.status(400).json({"message":"Username and Password are required."})
    }
    //Check for duplicate username in the db
    const duplicate= await User.findOne({ username:user }).exec()
    if (duplicate) return res.sendStatus(409); //conflict
    try{
        //encrypt the password
    const hashedPwd=await bcrypt.hash(pwd,10);
    // Create and store the new user
    const Result=await User.create({
    "username":user,
    "password":hashedPwd})
    console.log(Result)
    
    res.status(201).json({"Message":`New user ${user} Created!`})
    }catch(err){
        res.status(500).json({"message":err.message});
    }
}

module.exports={handleNewUser};