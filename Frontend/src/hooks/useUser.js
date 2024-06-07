import { useContext } from "react";
import UserContext from "../context/fetchuser";

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
