const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Doctor = sequelize.define('Doctor',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    specialty:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true
    },
    availability:{
        type:DataTypes.JSON,
        allowNull:true
    }
},{
    timestamps:true
});

module.exports = Doctor;
