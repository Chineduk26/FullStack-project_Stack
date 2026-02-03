const sequelize = require('sequelize');

const db = new sequelize('MiniChat', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
module.exports = db;