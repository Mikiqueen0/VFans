import { useEffect, useState, useRef, useContext } from 'react';
import { NavBar, LeftSideBar, CommunitySideBar, Post, CreatePostPopup } from '../components/index';
import { StatusContext } from '../context/StatusContext';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import profileBackground from '../assets/images/profileBackground.png';
import profileTestIcon from '../assets/images/test-profile.jpg';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { CSSTransition } from 'react-transition-group';

export default function Community() {
    const navigate = useNavigate();
    const location = useLocation();
    const communityId = location.state.communityId;
    const username = "Mikiqueen";
    const { communityName } = useParams();
    // Replace underscores with spaces
    const formattedCommunityName = communityName.replace(/_/g, ' ');
    const { hamburger, setHamburger } = useContext(StatusContext);
    const hamburgerPopupRef = useRef(null);
    const [popup, setPopup] = useState(false);




    const [profileData, setProfileData] = useState({
        profileBackground: "",
        profileImage: "",
        userDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aperiam neque minima autem et deserunt alias voluptates earum, ullam corporis temporibus repudiandae",
    });

    const [profileDataCopy, setProfileDataCopy] = useState(profileData);

    // useEffect(() => {
    //     console.log("State: ", state.communityId, "Params: ", communityName);
    // }, []);

    useEffect(() => {
        document.body.style.overflow = popup ? "hidden" : "auto";
        document.body.style.paddingRight = popup ? "15px" : "0";
    }, [popup]);

    useEffect(() => {
        document.body.style.overflow = hamburger ? "hidden" : "auto";
        document.body.style.paddingRight = hamburger ? "15px" : "0";
        
    }, [hamburger]);

    // When submit Post
    const handleSubmitPost = (e) => {
        e.preventDefault();
        console.log("Post Content: " + createPostContent);
        console.log("Post Tag: " + createPostTag);
        console.log("Post Image: " + imageFile);
        console.log("Post time: " + new Date().toLocaleString());
        setPopup(false);
    };

    return (
        <div className="bg-dark-background scrollbar-thin">
            <NavBar setHamburger={setHamburger} hamburger={hamburger} hamburgerPopupRef={hamburgerPopupRef} username={username} />
            <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
                <LeftSideBar name="large" />
                {/* middle section */}
                <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
                    {/* user info */}
                    <div className={`w-full h-[20rem] min-h-[20rem] rounded-[10px] flex flex-col justify-end relative`}>
                        <img
                            src={profileBackground}
                            alt="Profile Background"
                            className="absolute inset-0 w-full h-full object-cover pb-20 z-0 rounded-[10px]"
                        />
                        <div className="relative w-full min-h-[25%] rounded-b-[10px] bg-primary flex items-center justify-between px-6">
                            <div className="flex flex-col">
                                <p className="text-[26px] font-bold ml-[8.5rem] tracking-wide mt-[0.75rem]">
                                    {formattedCommunityName}
                                </p>
                                <div className="size-[8rem] rounded-full border-[0.4rem] border-primary absolute -top-[4.5rem] hover:cursor-pointer">
                                    <img
                                        src={profileData.profileImage || profileDataCopy.profileImage || profileTestIcon}
                                        alt="profile"
                                        className="absolute inset-0 w-full h-full object-cover z-0 rounded-full"
                                    />
                                </div>
                                <p className="ml-[8.5rem] mt-1 mb-4 font-light text-[13px] group cursor-pointer" onClick={() => navigate(`/${communityName}/joinedCommunity`)}>
                                    <span className="font-semibold opacity-100 mr-1">279</span>
                                    <span className="font-normal opacity-80 tracking-wide group-hover:underline">Members</span>
                                </p>
                            </div>
                            <div className="flex gap-2 items-center text-[14px]">
                                <button className="w-[3.6rem] h-[2.2rem] border rounded-full hover:text-emerald-green hover:border-emerald-green transition-all duration-100" onClick={() => setPopup(true)}>Post</button>
                                <button className="w-[3.6rem] h-[2.2rem] border rounded-full hover:text-emerald-green hover:border-emerald-green transition-all duration-100">Join</button>
                                {/* <button className="w-[4rem] h-[2.5rem] border rounded-full">...</button> */}
                                <EllipsisHorizontalCircleIcon className="size-8 hover:text-emerald-green transition-all duration-100 cursor-pointer" style={{ strokeWidth: 1 }}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 max-md:px-[1.5rem] px-[4rem] text-white">
                        <Post username={username}/>
                        <Post username={username}/>
                    </div>
                </section>
                <CommunitySideBar communityId={communityId}/>
            </div>
            <CreatePostPopup 
                setPopup={setPopup} 
                popup={popup}
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