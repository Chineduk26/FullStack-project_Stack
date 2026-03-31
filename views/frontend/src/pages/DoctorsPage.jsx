import { useEffect, useState } from "react";
import { doctorApi } from "../api/doctorsApi.jsx";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    try {
      const res = await doctorApi.getAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.error("Doctor load error:", err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await doctorApi.updateStatus(id, { status });
    loadAppointments();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Doctor Dashboard</h1>

      {appointments.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No appointments assigned yet</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Patient</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Status</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{a.user?.name}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {new Date(a.date).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{a.status}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  <button
                    style={{ marginRight: "5px", backgroundColor: "#4CAF50", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => updateStatus(a.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    style={{ marginRight: "5px", backgroundColor: "#f44336", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => updateStatus(a.id, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    style={{ backgroundColor: "#2196F3", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => updateStatus(a.id, "completed")}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
