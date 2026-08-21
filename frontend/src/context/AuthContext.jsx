import { createContext, useContext, useState } from "react";
import apiClient from "../ApiClient/interceptor";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (formData) => {
    try {
      const response = await apiClient.post("auth/signin", formData);
      setUser(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log(err.message);
    }
  };
  const value = {
    user,
    setUser,
    login,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
