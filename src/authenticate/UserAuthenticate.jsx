import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function UserAuthenticate({ children }) {
  const { authUser } = useContext(AuthContext);
  if (!authUser) {
    return <Navigate to="/" />;
  }
  return children;
}

export default UserAuthenticate;
