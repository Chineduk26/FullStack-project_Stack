const { Appointment, User, Doctor } = require("../models");

// Create a new appointment
exports.createAppointment = async (data) => {
  const doctor = await Doctor.findByPk(data.doctorId);
  if (!doctor) throw new Error("Doctor not found");

  return await Appointment.create(data);
};

// Get all appointments (with patient + doctor info)
exports.getAppointments = async () => {
  return await Appointment.findAll({
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Doctor, attributes: ["id", "name", "specialty"] }
    ]
  });
};

// Get appointments for a specific user
exports.getAppointmentsByUserId = async (userId) => {
  return await Appointment.findAll({
    where: { userId },
    include: [
      { model: Doctor, attributes: ["id", "name", "specialty"] }
    ]
  });
};

// Get a single appointment by its ID
exports.getAppointmentById = async (id) => {
  return await Appointment.findByPk(id, {
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Doctor, attributes: ["id", "name", "specialty"] }
    ]
  });
};

// Update an appointment (status or other fields)
exports.updateAppointment = async (id, data) => {
  const appt = await Appointment.findByPk(id);
  if (!appt) throw new Error("Appointment not found");

  await appt.update(data);
  return appt;
};

// Delete an appointment
exports.deleteAppointment = async (id) => {
  const appt = await Appointment.findByPk(id);
  if (!appt) throw new Error("Appointment not found");

  return await appt.destroy();
};
