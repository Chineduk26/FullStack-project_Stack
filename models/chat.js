const db = require('../config/db');
const { DataTypes } = require('sequelize');
const Message = db.define("Message",{
    role:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})
module.exports = Message;
// Model talk to db directly and knows no http