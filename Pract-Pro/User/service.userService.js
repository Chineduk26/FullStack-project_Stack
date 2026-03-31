const User1=require('../User/model.UserModel');
const bcrypt = require('bcrypt');

const createUser = async(data)=>{
    const {name,email, password}=data;
    const exitedUser=await User1.findOne({where:{email}})
    if(exitedUser){
        throw new Error("user already exist");
    }
    const hashed=await bcrypt.hash(password,10);
    const user1 = await User1.create({
        name,email,password:hashed
    })
    return user1;
}
const getUser=async(name,email,password)=>{
    const user1= await User1.findOne({where:{email, name}})
    if(!user1){throw new Error('not Found');
    }
    const isMartch= await bcrypt.compare(password,user1.password);
    if(!isMartch){
        throw new Error('not Found');
    }
return user1;
}
module.exports={createUser,getUser};