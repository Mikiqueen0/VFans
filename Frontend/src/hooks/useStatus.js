import { useContext } from "react";
import StatusContext from "../context/StatusContext";

const useStatus = () => {
    return useContext(StatusContext);
};

export default useStatus;
