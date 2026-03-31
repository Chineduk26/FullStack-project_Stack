const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Log = sequelize.define("Log", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  action: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  userId: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

// Associations
Log.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Log, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Log;
