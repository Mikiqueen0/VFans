import React, { createContext, useState, useContext, useEffect } from 'react';

const PostContext = createContext({});

export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const filterPosts = () => {
            let filtered = posts;

            if (searchKeyword) {
                filtered = filtered.filter(post => post.desc.includes(searchKeyword)); // or tag or community name too
            }

            if (selectedTags.length > 0) {
                filtered = filtered.filter(post => selectedTags.every(tag => post.tag.includes(tag)));
            }

            setFilteredPosts(filtered);
        };

        filterPosts();
    }, [posts, searchKeyword, selectedTags]);

    return (
        <PostContext.Provider value={{
            posts, setPosts,
            filteredPosts, setFilteredPosts,
            searchKeyword, setSearchKeyword,
            selectedTags, setSelectedTags
        }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContext;