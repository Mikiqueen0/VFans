import { useEffect } from 'react';
import axios from 'axios';
import usePost from './usePost';

export const useFetchUserPosts = (username) => {
    const { setPosts } = usePost();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`/post/user/${username}`);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching user posts', error);
            }
        };
        fetchUserPosts();
    }, [username, setPosts]);
};

export const useFetchAllPosts = () => {
    const { setPosts } = usePost();

    const fetchAllPosts = async () => {
        try {
            const response = await axios.get('/post/all');
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching all posts', error);
        }
    };

    useEffect(() => {
        fetchAllPosts();
    }, [setPosts]);

    return { fetchAllPosts };
};

export const useFetchJoinedCommunityPosts = (userID) => {
    const { setPosts } = usePost();

    const fetchJoinedCommunityPosts = async () => {
        try {
            const response = await axios.get(`/post/user/community/${userID}`);
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching joined community posts', error);
        }
    };

    useEffect(() => {
        fetchJoinedCommunityPosts();
    }, [userID, setPosts]);

    return { fetchJoinedCommunityPosts };
};

export const useFetchCommunityPosts = (communityID) => {
    const { setPosts } = usePost();

    const fetchCommunityPosts = async () => {
        try {
            const response = await axios.get(`/post/community/${communityID}`);
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching community posts', error);
        }
    };

    useEffect(() => {
        fetchCommunityPosts();
    }, [communityID, setPosts]);

    return { fetchCommunityPosts };
};

export const useFetchPostByID = (postID) => {
    const { setPosts } = usePost();

    useEffect(() => {
        const fetchPostByID = async () => {
            try {
                const response = await axios.get(`/post/${postID}`);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching post by ID', error);
            }
        };
        fetchPostByID();
    }, [postID, setPosts]);
};
