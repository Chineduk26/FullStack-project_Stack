import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import "../index.css";
export default function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "patient",
    specialty: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/users/register", form);
      alert("Account created successfully");
      nav("/login");
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return ( 
  <div className="auth-modal">
     <div className="auth-toggle">
       <button className="active">Sign up</button>
        <button>Sign in</button>
         </div> <h1>Create an account</h1> 
         <form onSubmit={handleSubmit}> 
          <input name="name" placeholder="Full Name" onChange={handleChange} required /> 
          <input name="username" placeholder="Username" onChange={handleChange} required /> 
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
           <select name="role" onChange={handleChange}> 
            <option value="patient">Patient</option> 
            <option value="doctor">Doctor</option>
            </select> 
            
             {form.role === "doctor" && (
          <select name="specialty" value={form.specialty} onChange={handleChange} required >
            <option value="">Select specialty</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Emergency">Emergency</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Paediatrics">Paediatrics</option>
            <option value="Ophthalmology">Ophthalmology</option>
          </select>
        )}
            <button type="submit" className="submit">Create Account</button> 
             </form> 
              <div className="auth-footer">Already have an account? <a href="/login">Sign in</a> </div>
             </div> ); 
             }