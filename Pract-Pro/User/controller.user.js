const jwt= require('jsonwebtoken');
const user1= require('./service.userService');

const reqister =async(req,res)=>{
    try{
        const user= await user1.createUser(req.body)
        res.status(201).json({message:"user created",user})
    }catch(error){
        res.status(500).json({error:error.message})
    }   
}
const login= async(req,res)=>{
    try{
        const {name , email, password}=req.body;
        const user= await user1.getUser(name,email,password)
        const token=  await jwt.sign({id:user.id,role:user.role},'123456',{expiresIn:'1h'})
        res.status(200).json({message:'login sucessfully',token})
    }catch(error){
        res.status(500).json({error:error.message})
    }
    
}
module.exports={reqister,login};