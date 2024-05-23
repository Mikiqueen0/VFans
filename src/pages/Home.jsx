import { useEffect, useState, useRef } from 'react';
import { NavBar, LeftSideBar, RightSideBar, Post, CreatePostPopup } from '../components/index';

export default function Home() {
    const username = "Mikiqueen";
    const [ popup, setPopup ] = useState(false); //popup create post in detail when click create post at home page

    useEffect(() => {
        document.body.style.overflow = popup ? "hidden" : "auto";
        document.body.style.paddingRight = popup ? "15px" : "0";
    }, [popup]);

    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
    const hamburgerPopupRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = hamburgerIsOpen ? "hidden" : "auto";
        document.body.style.paddingRight = hamburgerIsOpen ? "15px" : "0";
        
    }, [hamburgerIsOpen]);

    // When submit Post 
    const handleSubmitPost = (e) => {
        e.preventDefault();
        console.log("Post Content: " + createPostContent);
        console.log("Post Tag: " + createPostTag);
        console.log("Post Image: " + imageFile);
        console.log("Post time: " + new Date().toLocaleString());
        setPopup(false);
    }

    return (
        <div className="bg-dark-background scrollbar-thin">
            <NavBar setHamburgerIsOpen={setHamburgerIsOpen} hamburgerIsOpen={hamburgerIsOpen} hamburgerPopupRef={hamburgerPopupRef} username={username} />
            <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
                <LeftSideBar name="large" />
                {/* middle section */}
                <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[4rem] w-[800px]">
                    {/* filter */}
                    <div className="box-border flex flex-row items-center bg-primary rounded-[10px] font-poppins font-medium px-4 py-2">
                        <button className="mr-8 flex items-center gap-1 text-white font-normal text-base text-opacity-[78%] hover:text-opacity-90">
                            <img src="./assets/images/top.png" alt="top" className="h-[1.5rem]"/>
                            Top
                        </button>
                        <button className="mr-8 flex items-center gap-1 text-white font-normal text-base text-opacity-[78%] hover:text-opacity-90">
                            <img src="./assets/images/new.png" alt="new" className="h-[1.5rem]"/>
                            New
                        </button>
                    </div>
                    {/* Create Post */}
                    <div className="bg-primary rounded-[10px] px-5 py-2">
                        <div className="flex items-center">
                            <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-[2.5rem] max-lg:h-[2.5rem]"/>
                            <textarea readOnly placeholder="Create Post" className="font-poppins font-normal text-white text-base text-opacity-90 bg-transparent focus:outline-none caret-[#8c8c8c] border-b border-white border-opacity-10 pt-4 ml-3 w-full h-[3.2rem] box-border resize-none overflow-hidden cursor-text" onClick={() => setPopup(true)}/>
                        </div>
                    </div>
                    {/* display post */}
                    <Post username={username} />
                    <Post username={username} />
                    <Post username={username} />
                    <Post username={username} />
                </section>
                <RightSideBar />
            </div>
            {/* popup when click create post */}
            { popup &&
                <CreatePostPopup handleSubmitPost={handleSubmitPost} setPopup={setPopup} />
            }
            {hamburgerIsOpen && 
                <div className="fixed overflow-y-scroll inset-0 h-full backdrop-brightness-50 backdrop-blur-[1px] flex flex-col items-start z-40 xl:hidden">
                    <div className="bg-dark-background h-full w-[400px] flex flex-col mt-[5rem]" ref={hamburgerPopupRef}>
                        <LeftSideBar name="small" />
                    </div>
                </div>
            }
        </div>
    )
}