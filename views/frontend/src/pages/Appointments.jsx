import { useState, useEffect } from "react";
import { appointmentApi } from "../api/AppointmentApi";
import "../styles/Appointment.css";

export default function Appointments() {
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await appointmentApi.getMyAppointments();
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
      }
    };
    fetchAppointments();
  }, []);

  const book = async () => {
    if (!date) return alert("Please select a date");
    setLoading(true);
    try {
      await appointmentApi.create({ date });
      alert("Booked successfully");

      // Refresh list after booking
      const res = await appointmentApi.getMyAppointments();
      setAppointments(res.data);
      setDate("");
    } catch (err) {
      alert("Failed to book: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointments-container">
      <h2>Book Appointment</h2>
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button onClick={book} disabled={loading}>
        {loading ? "Booking..." : "Book"}
      </button>

      <h2>My Appointments</h2>
      <ul className="appointments-list">
        {appointments.length === 0 ? (
          <p>No appointments yet</p>
        ) : (
          appointments.map((appt) => (
            <li key={appt.id}>
              <strong>Date:</strong> {new Date(appt.date).toLocaleString()} <br />
              <strong>Status:</strong> {appt.status} <br />
              <strong>Doctor:</strong> {appt.doctor?.name} ({appt.doctor?.specialty})
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
