const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("MiniChat", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
