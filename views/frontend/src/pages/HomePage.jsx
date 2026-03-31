
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/authContext"; 
import "../styles/Home.css";

export default function Home() {
  const { logout } = useAuth(); 
  const navigate = useNavigate();
   const handleLogout = () => {
     logout(); // clears auth state 
     navigate("/login"); // redirects to login page 
   };
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <h1 className="logo">Healthcare Assistant</h1>
          <Link to="/" className="nav-link">Home</Link>
        </div>
        <div className="navbar-right">
          <Link to="/chat" className="nav-link">Chat</Link>
          <Link to="/patient" className="nav-link">Patient Dashboard</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="home-container">
        <h1>Healthcare Personal Assistant System</h1>
        <p>
          Book appointments, chat with AI,
          manage doctors and patients.
        </p>
        <div className="home-links">
          <Link to="/Login" className="cta-btn">Login</Link>
          <Link to="/signup" className="cta-btn">Sign Up</Link>
        </div>
      </div>
    </>
  );
}
