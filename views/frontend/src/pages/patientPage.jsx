import { useEffect, useState } from "react";
import { patientApi } from "../api/patientApi";
import { Link } from "react-router-dom";

export default function PatientDashboard() {

  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const loadData = async () => {
    const p = await patientApi.getProfile();
    const a = await patientApi.getAppointments();

    setProfile(p.data);
    setAppointments(a.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>

      <h1>Patient Dashboard</h1>

      {profile && (
        <div>
          <h3>Welcome {profile.name}</h3>
          <p>Email: {profile.email}</p>
        </div>
      )}

      <Link to="/book">Book Appointment</Link>
      <Link to="/chat">Open Chatbot</Link>

      <h2>Your Appointments</h2>

      {appointments.map(a => (
        <div key={a.id} style={{border:"1px solid #ccc",padding:"10px",margin:"10px"}}>

          <p>
            Doctor: {a.doctor?.name}
          </p>

          <p>
            Date: {new Date(a.datetime).toLocaleString()}
          </p>

          <p>
            Status: {a.status}
          </p>

        </div>
      ))}

    </div>
  );
}
