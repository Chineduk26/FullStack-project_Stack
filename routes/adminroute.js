const router = require("express").Router();
const authware = require("../middleware/authware");
const admin = require("../middleware/admin");
const adminController = require("../controllers/adminController");


// Users
router.get("/users", authware, admin, adminController.getUsers);
router.delete("/users/:id", authware, admin, adminController.deleteUser);

// Chats
router.get("/chats", authware, admin, adminController.getChats);
router.delete("/chats/:id", authware, admin, adminController.deleteChat);

// Appointments
router.get("/appointments", authware, admin, adminController.getAppointments);
router.delete("/appointments/:id", authware, admin, adminController.deleteAppointment);

// Logs
router.get("/logs", authware, admin, adminController.getLogs);

// Create Admin
router.post("/users/admin/create", authware, admin, adminController.createAdmin);


router.post("/doctors", adminController.createDoctor);
router.get("/doctors", adminController.getDoctors);
router.delete("/doctors/:id", adminController.deleteDoctor);

module.exports = router;
