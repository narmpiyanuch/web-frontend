import { createContext, useEffect, useState } from "react";
import axios from "../config/axios";

import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [member, setMember] = useState();

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get("/auth/me")
        .then((res) => {
          setAuthUser(res.data.user);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (loginInput) => {
    try {
      const res = await axios.post("/auth/login", loginInput);
      addAccessToken(res.data.accessToken);
      setAuthUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (registerInput) => {
    const res = await axios.post("/auth/register", registerInput);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };

  const fetchProfile = async () => {
    try {
      const profile = await axios.get("/home/user");
      setMember(profile.data.profile);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        authUser,
        register,
        logout,
        isLoading,
        fetchProfile,
        member,
        setMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
