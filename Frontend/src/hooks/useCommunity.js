import { useContext } from "react";
import CommunityContext from "../context/FetchCommunity";

const useCommunity = () => {
    return useContext(CommunityContext);
};

export default useCommunity;
