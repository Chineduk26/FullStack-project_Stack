import api from "./api";

export const admin = {
  // Users
  getUsers: () => api.get("/api/admin/users"),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),

  // Chats
  getChats: () => api.get("/api/admin/chats"),
  deleteChat: (id) => api.delete(`/api/admin/chats/${id}`),

  // Appointments
  getAppointments: () => api.get("/api/admin/appointments"),
  deleteAppointment: (id) => api.delete(`/api/admin/appointments/${id}`),

  // Logs
  getLogs: () => api.get("/api/admin/logs"),

  // Admins
  createAdmin: (data) => api.post("/api/admin/users/admin/create", data),

  // Doctors (missing before)
  getDoctors: () => api.get("/api/admin/doctors"),
  createDoctor: (data) => api.post("/api/admin/doctors", data),
  deleteDoctor: (id) => api.delete(`/api/admin/doctors/${id}`),
};
