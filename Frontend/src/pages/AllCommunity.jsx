import { useEffect, useState, useRef, useContext } from 'react';
import { NavBar, LeftSideBar, RightSideBar, CreateCommunityPopup } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';
import useStatus from "../hooks/useStatus";
import useUser from "../hooks/useUser";
import useCommunity from '../hooks/useCommunity';
import axios from "axios";

export default function AllCommunity() {
    const navigate = useNavigate();
    const { hamburger, setHamburger } = useStatus();
    const { user } = useUser();
    const hamburgerPopupRef = useRef(null);
    const [popup, setPopup] = useState(false);
    const { communityList, setCommunityList } = useCommunity();

    useEffect(() => {
        document.body.style.overflow = hamburger ? "hidden" : "auto";
        document.body.style.paddingRight = hamburger ? "15px" : "0";
        
    }, [hamburger]);

    useEffect(() => {
        document.body.style.overflow = popup ? "hidden" : "auto";
        document.body.style.paddingRight = popup ? "15px" : "0";
    }, [popup]);


    return (
        <div className="bg-dark-background scrollbar-thin">
            <NavBar setHamburger={setHamburger} hamburger={hamburger} hamburgerPopupRef={hamburgerPopupRef}/>
            <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
                <LeftSideBar name="large" />
                {/* middle section */}
                <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[4rem] w-[800px]">
                    <div className="flex justify-between items-center py-[1rem] max-md:px-[1.5rem] px-[1rem] text-white">
                        <p className="text-[20px] font-medium">Communities</p>
                        <button className="rounded-[10px] h-fit py-2 px-4 text-emerald-green border border-emerald-green font-medium" onClick={() => setPopup(true)}>Create</button>
                    </div>
                    <div className="grid grid-cols-3 max-md:grid-cols-2 max-md:px-6 justify-items-center gap-4">
                        {communityList.map((community, key) => {
                            return (
                                <div onClick={() => {
                                    const formattedCommunityName = community.name.replace(/\s+/g, '_');
                                    navigate(`/community/${encodeURIComponent(formattedCommunityName)}`, { state: { communityId: community._id } });
                                    }} key={key} className="w-[12rem] h-[3.2rem] px-[1.2rem] text-white text-[14px] text-opacity-90 font-normal flex items-center justify-start gap-2 bg-primary rounded-[8px] hover:cursor-pointer py-7">
                                    <img src={community.image} alt="" className="rounded-full size-8 bg-emerald-green" />
                                    <p>{community.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <RightSideBar />
            </div>
            {/* popup when click create community */}
            {popup && <div className={`fixed inset-0 backdrop-brightness-50 backdrop-blur-[1px] z-50`}></div>}
            <CreateCommunityPopup 
                setPopup={setPopup} 
                popup={popup}
                userID={user?._id}
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
