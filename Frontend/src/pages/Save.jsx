import { useEffect, useState, useRef, useContext } from 'react';
import { NavBar, LeftSideBar, RightSideBar, CreatePostPopup, Post } from '../components/index';
import { FaSpinner } from "react-icons/fa";
import useStatus from "../hooks/useStatus";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSavedPost from '../hooks/useSavedPost';


export default function Save() {
    const { hamburger, setHamburger } = useStatus();
    const hamburgerPopupRef = useRef(null);
    const navigate = useNavigate();
    const { username } = useParams();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedPosts, setSavedPosts] = useState([]);
    // const { savedPosts, fetchSavedPosts, savePost } = useSavedPost();

    useEffect(() => {
        document.body.style.overflow = hamburger ? "hidden" : "auto";
        document.body.style.paddingRight = hamburger ? "15px" : "0";
        
    }, [hamburger]);

    const fetchSavedPosts = async (username) => {
        setLoading(true);
        try {
            const fetchSavedPosts = await axios.get(`/save/allSavePost/${username}`);
            if(fetchSavedPosts.status){
                const filteredData = fetchSavedPosts.data.allSave.filter(item => item.postID !== null);
                setSavedPosts(filteredData);
                console.log(filteredData);
            }
        } catch (err) {
            console.error("Error fetching community data", err);
        } finally {
            setLoading(false);
        };
    };
    

    useEffect(() => {
        fetchSavedPosts(username);
        setLoading(false);
    }, []);

    return (
        <div className="bg-dark-background scrollbar-thin">
            <NavBar setHamburger={setHamburger} hamburger={hamburger} hamburgerPopupRef={hamburgerPopupRef}/>
            <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
                <LeftSideBar name="large" />
                {/* middle section */}
                {loading && 
                    <div className="flex h-[calc(100vh-6.25rem)] items-center justify-center gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
                        <FaSpinner className="animate-spin text-4xl text-emerald-green" />
                    </div>
                }
                {!loading && <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[4rem] w-[800px]">
                    <div className="flex justify-between items-center py-[1rem] max-md:px-[1.5rem] px-[1rem] text-white">
                        <p className="text-[20px] font-medium py-2">Saved Posts</p>
                    </div>
                    {savedPosts?.length === 0 && <p className="w-[12rem] h-[3.2rem] px-[1rem] text-gray-400 text-[14px] text-opacity-90 font-normal flex items-center justify-start py-7">No posts</p>}
                    {savedPosts?.map((post, key) => {
                        return (
                            <Post key={key} post={post.postID || post}/>
                        );
                    })}
                </section>}
                <RightSideBar />
            </div>
            {hamburger && 
                <div className="fixed overflow-y-scroll inset-0 h-full backdrop-brightness-50 backdrop-blur-[1px] flex flex-col items-start z-40 xl:hidden">
                    <div className="bg-dark-background h-full w-[400px] flex flex-col mt-[5rem]" ref={hamburgerPopupRef}>
                        <LeftSideBar name="small" />
                    </div>
                </div>
            }
        </div>
    )
}