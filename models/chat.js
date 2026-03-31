const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Appointment = require("./Appointment");

const Message = sequelize.define("Message", {
  role: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER },
  source: { type: DataTypes.STRING },
  appointmentId: { type: DataTypes.INTEGER }
}, { timestamps: true });

// Associations
Message.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Message, { foreignKey: "userId", onDelete: "CASCADE" });

Message.belongsTo(Appointment, { foreignKey: "appointmentId", onDelete: "CASCADE" });
Appointment.hasMany(Message, { foreignKey: "appointmentId", onDelete: "CASCADE" });

module.exports = Message;
