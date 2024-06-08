import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import dummyProfile from "../assets/images/dummyProfile.png";
import dummyBackground from "../assets/images/profileBackground.png";

const UserContext = createContext({});
export function UserContextProvider({ children }) {
  // const [user, setUser] = useState({
  //   username: "johny",
  //   image: dummyProfile,
  //   background: dummyBackground,
  //   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aperiam neque minima autem et deserunt alias voluptates earum, ullam corporis temporibus repudiandae"
  // });
  const [user, setUser] = useState(null);
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
      try {
        const { data } = await axios.post(
          `/auth/verify`,
          {},
          { withCredentials: true }
        );
  
        const { data: fetchUser } = await axios.get(`/user/profile/${data.id}`, { withCredentials: true });
  
        if(fetchUser.success){
          setUser(fetchUser.user);
          console.log(fetchUser.user);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error verifying cookie:', error);
      }
    };
    verifyCookie();
  }, []);

  const saveUser = async (userData) => {
    try {
      const { data: saveUserData } = await axios.put(`/user/profile/${userData._id}`, userData, { withCredentials: true });
      setUser(saveUserData.user);
    } catch (err) {
      console.error("Error saving user profile", err);
    };
  };

  return (
    <UserContext.Provider value={{ user, setUser: saveUser }}>
      {children}
    </UserContext.Provider>
  );
}
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
