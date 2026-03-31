
import api from "./api";

export const patientApi = {
  getProfile: () => api.get("/patient/profile"),
  getAppointments: () => api.get("/appointments/me"),   
  bookAppointment: (data) => api.post("/appointments", data)
};
