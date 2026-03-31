const sequelize=require('../../models/User');
const {DataTypes}=require('sequelize')
const Product=sequelize.define('Product',{
    id:{
     type:DataTypes.INTEGER.
    },
    name:{
        type:DataTypes.STRIBG,
        allowNull:false,
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    desc:{
        type:DataTypes.TEXT,
    },
    stock:{
        type:DataTypes.INTEGER,
    },
    isDelected:{
        type:DataTypes.BOOLEAN,
    }

})
module.exports=Product;