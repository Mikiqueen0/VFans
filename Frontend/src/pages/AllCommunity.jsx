import { useEffect, useState, useRef, useContext } from 'react';
import { NavBar, LeftSideBar, RightSideBar, CreateCommunityPopup } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { StatusContext } from '../context/StatusContext';

export default function AllCommunity() {
    const navigate = useNavigate();
    const username = "Mikiqueen";
    const { hamburger, setHamburger } = useContext(StatusContext);
    const hamburgerPopupRef = useRef(null);
    const [popup, setPopup] = useState(false);
    const [communityList, setCommunityList] = useState([
        {
            communityId: 1,
            communityName: "Community 1",
            communityImage: ""
        },
        {
            communityId: 2,
            communityName: "Community 2",
            communityImage: ""
        },
        {
            communityId: 3,
            communityName: "Community 3",
            communityImage: ""
        },
        {
            communityId: 4,
            communityName: "Community 4",
            communityImage: ""
        },
        {
            communityId: 5,
            communityName: "Community 5",
            communityImage: ""
        },
        {
            communityId: 6,
            communityName: "Community 6",
            communityImage: ""
        },
        {
            communityId: 7,
            communityName: "Community 7",
            communityImage: ""
        },
        {
            communityId: 8,
            communityName: "Community 8",
            communityImage: ""
        },
        {
            communityId: 9,
            communityName: "Community 9",
            communityImage: ""
        },
        {
            communityId: 10,
            communityName: "Community 10",
            communityImage: ""
        }
    ]);

    useEffect(() => {
        document.body.style.overflow = hamburger ? "hidden" : "auto";
        document.body.style.paddingRight = hamburger ? "15px" : "0";
        
    }, [hamburger]);

    useEffect(() => {
        document.body.style.overflow = popup ? "hidden" : "auto";
        document.body.style.paddingRight = popup ? "15px" : "0";
    }, [popup]);

    // When submit Post 
    const handleCreate = (e) => {
        e.preventDefault();
        console.log("Post Content: " + createPostContent);
        console.log("Post Tag: " + createPostTag);
        console.log("Post Image: " + imageFile);
        console.log("Post time: " + new Date().toLocaleString());
        setPopup(false);
    }


    return (
        <div className="bg-dark-background scrollbar-thin">
            <NavBar setHamburger={setHamburger} hamburger={hamburger} hamburgerPopupRef={hamburgerPopupRef} username={username} />
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
                                    const formattedCommunityName = community.communityName.replace(/\s+/g, '_'); // Replace spaces with underscores
                                    navigate(`/community/${encodeURIComponent(formattedCommunityName)}`, { state: { communityId: community.communityId } });
                                    }} key={key} className="w-[12rem] h-[3.2rem] px-[1.2rem] text-white text-[14px] text-opacity-90 font-normal flex items-center justify-center gap-2 bg-primary rounded-[8px] hover:cursor-pointer py-7">
                                    <img src="" alt="" className="rounded-full size-8 bg-emerald-green" />
                                    <p>{community.communityName}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <RightSideBar />
            </div>
            {/* popup when click create community */}
            { popup &&
                <CreateCommunityPopup handleCreate={handleCreate} setPopup={setPopup} />
            }
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
