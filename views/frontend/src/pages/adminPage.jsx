import { useEffect, useState } from "react";
import { admin } from "../api/adminApi";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [logs, setLogs] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", email: "" });

  const loadData = async () => {
    try {
      const [u, c, a, l, d] = await Promise.all([
        admin.getUsers(),
        admin.getChats(),
        admin.getAppointments(),
        admin.getLogs(),
        admin.getDoctors()
      ]);
      setUsers(u.data);
      setChats(c.data);
      setAppointments(a.data);
      setLogs(l.data);
      setDoctors(d.data);
    } catch (err) {
      console.error("Error loading admin data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Delete handlers
  const deleteUser = async (id) => {
    try {
      await admin.deleteUser(id);
      loadData();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  const deleteChat = async (id) => {
    try {
      await admin.deleteChat(id);
      loadData();
    } catch (err) {
      console.error("Error deleting chat:", err);
      alert("Failed to delete chat");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await admin.deleteAppointment(id);
      loadData();
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment");
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await admin.deleteDoctor(id);
      loadData();
    } catch (err) {
      console.error("Error deleting doctor:", err);
      alert("Failed to delete doctor");
    }
  };

  // Admin form
  const handleAdminChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    try {
      await admin.createAdmin(newAdmin);
      alert("New admin created successfully");
      setNewAdmin({ username: "", password: "" });
      loadData();
    } catch (err) {
      console.error("Error creating admin:", err);
      alert("Failed to create admin");
    }
  };

  // Doctor form
  const handleDoctorChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const createDoctor = async (e) => {
    e.preventDefault();
    try {
      await admin.createDoctor(newDoctor);
      alert("New doctor created successfully");
      setNewDoctor({ name: "", specialty: "", email: "" });
      loadData();
    } catch (err) {
      console.error("Error creating doctor:", err);
      alert("Failed to create doctor");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Create Admin Section */}
      <section className="admin-section">
        <h2>Create New Admin</h2>
        <form onSubmit={createAdmin} className="admin-form">
          <input
            name="username"
            placeholder="Username"
            value={newAdmin.username}
            onChange={handleAdminChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={handleAdminChange}
            required
          />
          <button type="submit" className="submit">Create Admin</button>
        </form>
      </section>

      {/* Create Doctor Section */}
      <section className="admin-section">
        <h2>Create New Doctor</h2>
        <form onSubmit={createDoctor} className="admin-form">
          <input
            name="name"
            placeholder="Doctor Name"
            value={newDoctor.name}
            onChange={handleDoctorChange}
            required
          />
          <input
            name="specialty"
            placeholder="Specialty"
            value={newDoctor.specialty}
            onChange={handleDoctorChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={newDoctor.email}
            onChange={handleDoctorChange}
             required
/>
          <button type="submit" className="submit">Add Doctor</button>
        </form>
      </section>

      {/* Doctors List */}
      <section className="admin-section">
        <h2>Doctors</h2>
        {doctors.length === 0 ? (
          <p>No doctors found</p>
        ) : (
          doctors.map((d) => (
            <div key={d.id} className="admin-item doctor">
              <span>{d.name} ({d.specialty})</span>
              <button className="delete-btn" onClick={() => deleteDoctor(d.id)}>Delete</button>
            </div>
          ))
        )}
      </section>

      {/* Admins List */}
      <section className="admin-section">
        <h2>Admins</h2>
        {users.filter(u => u.role === "admin").length === 0 ? (
          <p>No admins found</p>
        ) : (
          users.filter(u => u.role === "admin").map((u) => (
            <div key={u.id} className="admin-item admin">
              <span>{u.username}</span>
              <button className="delete-btn" onClick={() => deleteUser(u.id)}>Delete</button>
            </div>
          ))
        )}
      </section>

      {/* Users Section */}
      <section className="admin-section">
        <h2>Users</h2>
        {users.filter(u => u.role !== "admin").length === 0 ? (
          <p>No users found</p>
        ) : (
          users.filter(u => u.role !== "admin").map((u) => (
            <div key={u.id} className={`admin-item ${u.role}`}>
              <span>{u.username}</span>
              <button className="delete-btn" onClick={() => deleteUser(u.id)}>Delete</button>
            </div>
          ))
        )}
      </section>

      {/* Chats Section */}
      <section className="admin-section">
        <h2>Chats</h2>
        {chats.length === 0 ? <p>No chats found</p> : chats.map((c) => (
          <div key={c.id} className="admin-item">
            <span><b>{c.user?.username}:</b> {c.content}</span>
            <button className="delete-btn" onClick={() => deleteChat(c.id)}>Delete</button>
          </div>
        ))}
      </section>

      {/* Appointments Section */}
      <section className="admin-section">
        <h2>Appointments</h2>
        {appointments.length === 0 ? <p>No appointments found</p> : appointments.map((a) => (
          <div key={a.id} className="admin-item">
            <span>
              <b>{a.user?.username}</b> with <b>{a.doctor?.name}</b> on {new Date(a.date).toLocaleString()}
            </span>
            <button className="delete-btn" onClick={() => deleteAppointment(a.id)}>Delete</button>
          </div>
        ))}
      </section>

      {/* Logs Section */}
      <section className="admin-section">
  <h2>System Logs</h2>
  {logs.length === 0 ? <p>No logs found</p> : logs.map((l) => (
    <div key={l.id} className="admin-item log">
      <span>[{new Date(l.timestamp).toLocaleString()}] {l.action} by {l.User?.username}</span>
    </div>
  ))}
</section>
    </div>
  );
}
