const  User = require('../../models/User');
const {DataTypes} = require('sequelize');
const User1= User.define('User1',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM('user','admin'),
        defaultValue:'user'

    }
})
module.exports=User1;
