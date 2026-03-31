import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If a role is specified and doesn't match, redirect home
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
