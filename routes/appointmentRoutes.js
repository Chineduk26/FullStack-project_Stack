
const router = require("express").Router();
const crt = require("../controllers/appointmentController");
const auth = require("../middleware/authware");

router.post("/appointments", auth, crt.createAppointment);
router.get("/appointments", auth, crt.getAppointments); // maybe restrict to doctors/admin
router.get("/appointments/me", auth, crt.getMyAppointments);
router.put("/appointments/:id", auth, crt.updateAppointment);
router.delete("/appointments/:id", auth, crt.deleteAppointment);

module.exports = router;
