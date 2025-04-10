import { Navigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

export const ProtectedRoute = ({ children }) => {
  const { data: session } = authClient.useSession();
  if (!session) {
    return <Navigate to="/login" />;
  }
  return children;
};
