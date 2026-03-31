import { useState } from "react";
import { patientApi } from "../api/patientApi";
import "../styles/Appointment.css";

export default function BookAppointment(){

  const [doctorId,setDoctorId]=useState("");
  const [datetime,setDatetime]=useState("");

  const submit = async ()=>{
    await patientApi.bookAppointment({
      doctorId,
      datetime
    });

    alert("Appointment booked");
  };

  return ( <div className="book-appointment">
     <h1>Book Appointment</h1> 
     <input placeholder="Doctor ID" 
     value={doctorId} 
     onChange={(e) => setDoctorId(e.target.value)} 
     required />
      <input type="datetime-local" value={datetime} 
      onChange={(e) => setDatetime(e.target.value)}
       required /> 
  <button onClick={submit}>Book</button> 
  </div>
   ); 
}
