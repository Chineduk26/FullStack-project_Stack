import api from "./api";

export const doctorApi = {

  getAppointments: () =>
    api.get("/doctor/appointments"),

  updateStatus: (id, status) =>
    api.patch(`/doctor/appointments/${id}/status`, { status })

};
