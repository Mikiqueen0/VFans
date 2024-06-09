import { useContext } from "react";
import SavedPostsContext from "../context/SavedPostsContext";

const usePost = () => {
    return useContext(SavedPostsContext);
};

export default usePost;
