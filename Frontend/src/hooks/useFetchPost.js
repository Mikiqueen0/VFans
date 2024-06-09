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
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get('/post/all');
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching all posts', error);
            }
        };
        fetchAllPosts();
    }, [setPosts]);
};

export const useFetchJoinedCommunityPosts = (userID) => {
    const { setPosts } = usePost();

    useEffect(() => {
        const fetchJoinedCommunityPosts = async () => {
            try {
                const response = await axios.get(`/post/user/${userID}`);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching joined community posts', error);
            }
        };
        fetchJoinedCommunityPosts();
    }, [userID, setPosts]);
};

export const useFetchCommunityPosts = (communityID) => {
    const { setPosts } = usePost();

    useEffect(() => {
        const fetchCommunityPosts = async () => {
            try {
                const response = await axios.get(`/post/community/${communityID}`);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching community posts', error);
            }
        };
        fetchCommunityPosts();
    }, [communityID, setPosts]);
};
