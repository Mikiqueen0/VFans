// SavedPostsContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SavedPostsContext = createContext({});

export function SavedPostsProvider({ children }) {
    const [savedPosts, setSavedPosts] = useState([]);

    const fetchSavedPosts = async (username) => {
        try {
            const { data: fetchSavedPosts } = await axios.get(`/post/save/${username}`);
            if (fetchSavedPosts.success) {
                const savedPosts = fetchSavedPosts.savedPosts;
                console.log(fetchSavedPosts.savedPosts);
    
                // const communityDetailsMap = {};
                // const userDetailsMap = {};
    
                // // Fetch community and user details for each post
                // await Promise.all(savedPosts.map(async (post) => {
                //     const communityID = post.postID.communityID;
                //     const userID = post.userID;
    
                //     // Fetch community details if not already fetched
                //     if (!communityDetailsMap[communityID]) {
                //         const { data: community } = await axios.get(`/community/${communityID}`);
                //         communityDetailsMap[communityID] = community.community;
                //     }
    
                //     // Fetch user details if not already fetched
                //     if (!userDetailsMap[userID]) {
                //         const { data: user } = await axios.get(`/user/profile/${userID}`);
                //         userDetailsMap[userID] = user.user;
                //     }
    
                //     // Add community and user details to the post
                //     post.postID.communityDetails = communityDetailsMap[communityID];
                //     post.userIDDetails = userDetailsMap[userID];
                // }));
    
                // // Transform savedPosts to the desired format
                // const transformedPosts = savedPosts.map(savedPost => {
                //     return {
                //         _id: savedPost._id,
                //         userID: savedPost.userIDDetails, // Populate with user details
                //         communityID: savedPost.postID.communityDetails, // Populate with community details
                //         desc: savedPost.postID.desc,
                //         image: savedPost.postID.image,
                //         tag: savedPost.postID.tag,
                //         createAt: savedPost.postID.createdAt,
                //         // Add other properties if needed
                //     };
                // });
    
                // console.log(fetchSavedPosts.savedPosts);
    
                // Update the state with the transformed saved posts
                setSavedPosts(savedPosts);
            }
        } catch (err) {
            console.error("Error fetching saved posts", err);
        }
    };



    const savePost = async (userID, postID) => {
        try {
            const res = await axios.post(`/post/save`, { userID, postID });
            if (res.data.success) {
                console.log(res.data.save.userID.username);
                await fetchSavedPosts(res.data.save.userID.username);
            }
        } catch (err) {
            console.error("Error saving post", err);
        }
    };

    return (
        <SavedPostsContext.Provider value={{ savedPosts, fetchSavedPosts, savePost }}>
            {children}
        </SavedPostsContext.Provider>
    );
};

export default SavedPostsContext;
