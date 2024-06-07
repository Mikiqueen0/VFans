import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser, updateUser] = useState({
    user: "johny",
  });
  const [cookies, removeCookie] = useCookies([]);

  //   useEffect(() => {
  //     if (!user) {
  //       axios
  //         .post(`/auth/verify`, { withCredentials: true })
  //         .then(({ data }) => {
  //           console.log("Fetched user profile from cookie:", data);
  //           setUser(data);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching user profile from cookie:", error);
  //         });
  //     } else if (user) {
  //       axios
  //         .post(`/auth/verify`, { withCredentials: true })
  //         .then((response) => {
  //           console.log("Fetched user profile from database:", response.data);
  //           setUser(response.data);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching user profile from database:", error);
  //         });
  //     }
  //   }, []);

  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        `/auth/verify`,
        {},
        { withCredentials: true }
      );
      //   const { status, user } = data;
      setUser(data);
      console.log(data);
      //   return status;
    };
    verifyCookie();
  }, [cookies]);

  //   const saveUser = (userData) => {
  //     setUser(userData);
  //     localStorage.setItem("user", JSON.stringify(userData));
  //   };
  //   const clearUser = () => {
  //     setUser(null);
  //     localStorage.removeItem("user");
  //   };
  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
