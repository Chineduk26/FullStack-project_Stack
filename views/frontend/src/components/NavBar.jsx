import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/Navbar.css"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">Home</Link>
      </div>

      <div className="navbar-right">
        {!user && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
            <Link to="/patient" className="nav-link">Patient Dashboard</Link>
          </>
        )}

        {user && (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="nav-link">Admin Dashboard</Link>
            )}
            {user.role === "doctor" && (
              <Link to="/doctor" className="nav-link">Doctor Dashboard</Link>
            )}
            {user.role === "patient" && (
              <>
                <Link to="/patient" className="nav-link">Patient Dashboard</Link>
                <Link to="/book" className="nav-link">Book Appointment</Link>
              </>
            )}
            <Link to="/chat" className="nav-link">Chat</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
