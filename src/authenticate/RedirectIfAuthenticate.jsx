import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RedirectIfAuthenticate({ children }) {
  const { authUser } = useContext(AuthContext);
  if (authUser) {
    return <Navigate to="/homepage" />;
  }
  return children;
}

export default RedirectIfAuthenticate;
