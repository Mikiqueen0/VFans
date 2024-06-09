import { useContext } from "react";
import PostContext from "../context/PostContext";

const usePost = () => {
    return useContext(PostContext);
};

export default usePost;
