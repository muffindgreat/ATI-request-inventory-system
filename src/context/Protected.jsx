import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ isProtected }) {
  const { currentUser, isVerifying } = useAuth();

  if (isVerifying) {
    return null; // Wait until Firestore check is complete
  }

  if (isProtected && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!isProtected && currentUser) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
