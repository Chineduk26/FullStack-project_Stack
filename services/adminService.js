const  User = require("../models/User");
const  Message  = require("../models/chat");
const  Appointment  = require("../models/Appointment");

const Doctor  = require("../models/Doctor"); 
const bcrypt = require("bcryptjs");

// Create Admin
exports.createAdmin = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({
    username,
    password: hashedPassword,
    role: "admin"
  });
};

// Users
exports.getUsers = async () => User.findAll();
exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;;
  await user.destroy();
  return true;
};

// Chats
exports.getChats = async () => Message.findAll({ include: [User] });
exports.deleteChat = async (id) => {
  const chat = await Message.findByPk(id);
  if (!chat) return null;
  await chat.destroy();
  return true;
};

// Appointments
exports.getAppointments = async () => Appointment.findAll({ include: [User, Doctor] });
exports.deleteAppointment = async (id) => {
  const appt = await Appointment.findByPk(id);
  if (!appt) return null;
  await appt.destroy();
  return true;
};


