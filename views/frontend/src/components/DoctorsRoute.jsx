import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function DoctorRoute({ children }) {

  const { user } = useAuth();

  if (!user || user.role !== "doctor") {
    return <Navigate to="/" />;
  }

  return children;
}
