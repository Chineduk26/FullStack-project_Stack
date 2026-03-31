const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Doctor = require('./Doctor');

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  doctorId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  source: { type: DataTypes.STRING, defaultValue: 'web' },
  reason: { type: DataTypes.TEXT }
}, { timestamps: true });

// Associations
Appointment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Appointment, { foreignKey: 'userId', onDelete: 'CASCADE' });

Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', onDelete: 'CASCADE' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId', onDelete: 'CASCADE' });

module.exports = Appointment;
