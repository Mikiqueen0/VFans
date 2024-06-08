import { useEffect, useState, useRef, useContext } from 'react';
import { NavBar, LeftSideBar, CommunitySideBar, Post, CreatePostPopup, Filter, CommunitySetting } from '../components/index';
import useStatus from "../hooks/useStatus";
import useUser from "../hooks/useUser";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { FaSpinner } from "react-icons/fa";
import axios from 'axios';

export default function Community() {
    const navigate = useNavigate();
    const location = useLocation();
    const { communityID } = useParams();
    const { hamburger, setHamburger } = useStatus();
    const { user } = useUser();
    const hamburgerPopupRef = useRef(null);
    const [popup, setPopup] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [communityData, setCommunityData] = useState({});
    const [loading, setLoading] = useState(true);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        const fetchCommunity = async () => {
            if(openSetting) return;
            setLoading(true);
            try {
                const { data: fetchCommunityData } = await axios.get(`/community/${communityID}`);
                if(fetchCommunityData.success){
                    setCommunityData(fetchCommunityData.community);
                    if (fetchCommunityData.community && user) {
                        if (fetchCommunityData.community.members.includes(user._id)) {
                            setJoined(true);
                        }
                    }
                }
            } catch (err) {
                console.error("Error fetching community data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCommunity();
    }, [communityID, openSetting, joined]);

    useEffect(() => {
        document.body.style.overflow = hamburger ? "hidden" : "auto";
        document.body.style.paddingRight = hamburger ? "15px" : "0";
        
    }, [hamburger]);

    useEffect(() => {
        document.body.style.overflow = popup || openSetting ? "hidden" : "auto";
        document.body.style.paddingRight = popup || openSetting ? "15px" : "0";
    }, [popup, openSetting]);

    const handleJoin = async () => {
        try {
            const joinCommunity = await axios.put(`/community/join/${communityID}`, { userID: user._id });
            if(joinCommunity.data.success){
                setCommunityData(joinCommunity.data.community);
                setJoined(!joined);
            }
        } catch (err) {
            console.error("Error joining community", err);
        }
    };

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
                {!loading && <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
                    {/* community info */}
                    <div className={`w-full h-[20rem] min-h-[20rem] rounded-[10px] flex flex-col justify-end relative`}>
                        <img
                            src={communityData.banner}
                            alt="Profile Background"
                            className="absolute inset-0 w-full h-full object-cover pb-20 z-0 rounded-[10px]"
                        />
                        <div className="relative w-full min-h-[25%] rounded-b-[10px] bg-primary flex items-center justify-between px-6">
                            <div className="flex flex-col">
                                <p className="text-[26px] font-bold ml-[8.5rem] tracking-wide mt-[0.75rem]">
                                    {communityData.name}
                                </p>
                                <div className="size-[8rem] rounded-full border-[0.4rem] border-primary absolute -top-[4.5rem] hover:cursor-pointer">
                                    <img
                                        src={communityData.image}
                                        alt="profile"
                                        className="absolute inset-0 w-full h-full object-cover z-0 rounded-full"
                                    />
                                </div>
                                <p className="ml-[8.5rem] mt-1 mb-4 font-light text-[13px] group cursor-pointer" onClick={() => navigate(`/joinedCommunity/${communityID}`)}>
                                    <span className="font-semibold opacity-100 mr-1">{communityData.members?.length}</span>
                                    <span className="font-normal opacity-80 tracking-wide group-hover:underline">Members</span>
                                </p>
                            </div>
                            <div className="flex gap-2 items-center text-[14px]">
                                <button className="w-[3.6rem] h-[2.2rem] border rounded-full hover:text-emerald-green hover:border-emerald-green transition-all duration-100" onClick={() => setPopup(true)}>Post</button>
                                <button className={`w-[3.6rem] h-[2.2rem] border rounded-full  transition-all duration-100 ${joined ? "hover:border-red-500  hover:text-red-500" : "hover:border-emerald-green hover:text-emerald-green"}`} onClick={handleJoin}>{joined ? "Leave" : "Join"}</button>
                                {user?._id === communityData.userID && <EllipsisHorizontalCircleIcon className="size-9 hover:text-emerald-green transition-all duration-100 cursor-pointer stroke-1" onClick={() => setOpenSetting(true)}/>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 max-md:px-[1.5rem] px-[4rem] text-white">
                        {/* filter */}
                        <Filter />
                        <Post username={"test"}/>
                        <Post username={"test"}/>
                    </div>
                </section>}
                <CommunitySideBar communityData={communityData}/>
            </div>
            {popup && <div className={`fixed inset-0 backdrop-brightness-50 backdrop-blur-[1px] z-50`}></div>}
            <CreatePostPopup 
                setPopup={setPopup} 
                popup={popup}
            />
            {openSetting && <div className={`fixed inset-0 backdrop-brightness-50 backdrop-blur-[1px] z-50`}></div>}
            <CommunitySetting 
                communityData={communityData}
                setPopup={setOpenSetting} 
                popup={openSetting}
            />
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