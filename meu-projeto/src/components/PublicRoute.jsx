import { Navigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

export const PublicRoute = ({ children }) => {
  const { data: session } = authClient.useSession();
  if (session) {
    return <Navigate to="/home" />;
  }
  return children;
};
