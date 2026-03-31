const User = require("./User");
const Doctor = require("./Doctor");
const Appointment = require("./Appointment");

// Associations
Appointment.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Appointment, { foreignKey: "userId" });

Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId" });

module.exports = { User, Doctor, Appointment };
