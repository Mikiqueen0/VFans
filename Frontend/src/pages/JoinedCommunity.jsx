import { useEffect, useState, useRef, useContext } from 'react';
import { NavBar, LeftSideBar, RightSideBar, CreatePostPopup } from '../components/index';
import { StatusContext } from '../context/StatusContext';
import { useParams } from 'react-router-dom';

export default function JoinedCommunity() {
    const { hamburger, setHamburger } = useContext(StatusContext);
    const hamburgerPopupRef = useRef(null);
    const { profileUsername } = useParams();

    useEffect(() => {
        document.body.style.overflow = hamburger ? "hidden" : "auto";
        document.body.style.paddingRight = hamburger ? "15px" : "0";
        
    }, [hamburger]);

    // useEffect(() => {
    //     console.log(profileUsername);
    // });


    return (
        <div className="bg-dark-background scrollbar-thin">
            <NavBar setHamburger={setHamburger} hamburger={hamburger} hamburgerPopupRef={hamburgerPopupRef} username={username} />
            <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
                <LeftSideBar name="large" />
                {/* middle section */}
                <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[4rem] w-[800px]">
                    <div className="flex justify-between items-center py-[1rem] max-md:px-[1.5rem] px-[1rem] text-white">
                        Joined Community of {profileUsername}
                    </div>
                </section>
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