const service = require("../services/adminService");
const Doctor = require("../models/Doctor");
const logService = require("../services/logService");


// Users
exports.getUsers = async (req, res) => {
  try {
    const data = await service.getUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
   const deletedUser = await service.deleteUser(req.params.id);
   if (!deletedUser) {
     return res.status(404).json({ error: "User not found" });
   }
    await logService.addLog(req.user.id, `Deleted user ${req.params.id}`);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Chats
exports.getChats = async (req, res) => {
  try {
    const chats = await service.getChats();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
   const deletedChat = await service.deleteChat(req.params.id);
   if (!deletedChat) {
     return res.status(404).json({ error: "Chat not found" });
   }
    await logService.addLog(req.user.id, `Deleted chat ${req.params.id}`);
    res.json({ message: "Chat deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appts = await service.getAppointments();
    res.json(appts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
   const deletedAppointment = await service.deleteAppointment(req.params.id);
   if (!deletedAppointment) {
     return res.status(404).json({ error: "Appointment not found" });
   }
    await logService.addLog(req.user.id, `Deleted appointment ${req.params.id}`);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await logService.getLogs();
    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err.message);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

// Admins
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAdmin = await service.createAdmin({ username, password });
    await logService.addLog(req.user.id, `Created admin ${newAdmin.username}`);
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Doctors
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialty, email } = req.body;
    if (!name || !specialty) {
      return res.status(400).json({ error: "Name and specialty are required" });
    }

    const doctor = await Doctor.create({ name, specialty, email });
    await logService.addLog(req.user.id, `Created doctor ${doctor.name}`);
    res.status(201).json(doctor);
  } catch (error) {
    console.error("Error creating doctor:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await Doctor.destroy({ where: { id } });
    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    await logService.addLog(req.user.id, `Deleted doctor ${id}`);
    res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    console.error("Error deleting doctor:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
