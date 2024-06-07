import { createContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
