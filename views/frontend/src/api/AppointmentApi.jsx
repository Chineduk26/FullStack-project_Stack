import api from "./api";

export const appointmentApi = {
  create: (data) => api.post("/appointments", data),
  getMine: () => api.get("/appointments/me"),
};
