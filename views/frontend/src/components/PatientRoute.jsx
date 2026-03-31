import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function PatientRoute({ children }) {

  const { user } = useAuth();

  if(!user || user.role !== "patient"){
    return <Navigate to="/" />;
  }

  return children;
}
