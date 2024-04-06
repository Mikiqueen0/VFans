import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const username = "Mikiqueen";
    const [createPostContent, setCreatePostContent] = useState("");
    const [allDropdown, setAllDropdown] = useState(false);
    const [languageDropdown, setLanguageDropdown] = useState({ 
        "English": false,
        "Indonesia": false,
        "Thai": false
    });
    const [companyDropdown, setCompanyDropdown] = useState({
        "English": {
            "Hololive": false
        },
        "Indonesia": {
            "Nijisanji": false
        },
        "Thai": {
            "VShojo": false
        }
    });
    const [talentDropdown, setTalentDropdown] = useState({
        "English": {
            "Hololive": {
                "Gawr Gura": false,
                "Mori Calliope": false,
                "Takanashi Kiara": false,
                "Ninomae Ina'nis": false,
                "Watson Amelia": false
            }
        },
        "Indonesia": {
            "Nijisanji": {
                "Gawr Gura": false,
                "Mori Calliope": false,
                "Takanashi Kiara": false,
                "Ninomae Ina'nis": false,
                "Watson Amelia": false
            }
        },
        "Thai": {
            "VShojo": {
                "Gawr Gura": false,
                "Mori Calliope": false,
                "Takanashi Kiara": false,
                "Ninomae Ina'nis": false,
                "Watson Amelia": false,
                "a": false,
                "b": false,
                "c": false
            }
        }
    });

    const onToggleDropdown = () => {
        setAllDropdown(!allDropdown);
    };

    const onToggleLanguageDropdown = (language) => {
        setLanguageDropdown((prev) => ({ ...prev, [language]: !prev[language] }));
    };

    const onToggleCompanyDropdown = (language, company) => {
        setCompanyDropdown((prev) => ({
            ...prev,
            [language]: {
                ...prev[language],
                [company]: !prev[language][company]
            }
        }));
    };

    const onToggleTalentDropdown = (language, company, talent) => {
        setTalentDropdown((prev) => ({
            ...prev,
            [language]: {
                ...prev[language],
                [company]: {
                    ...prev[language][company],
                    [talent]: !prev[language][company][talent]
                }
            }
        }));
    };

    let navigate = useNavigate(); 
    const routeChange = (e) =>{ 
        let path = e.target.name; 
        navigate(path);
    }

    const [ popup, setPopup ] = useState(false); //popup create post in detail when click create post at home page
    const [ tagVal, setTagVal ] = useState(""); //tag in text field
    const [ createPostTag, setCreatePostTag ] = useState([]); //tag add already added in create post
    //tag user can choose
    const [ tagData, setTagData] = useState([
        "News",
        "Debut",
        "Meme",
        "Image",
        "Video",
        "Fanart",
        "Fanfiction",
        "Discussion",
        "Question",
        "Poll",
        "Announcement",
        "Event",
        "Guide",
        "Review"
    ]);

    const createPostPopupRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (createPostPopupRef.current && !createPostPopupRef.current.contains(e.target)) {
                setPopup(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [createPostPopupRef]);

    useEffect(() => {
        document.body.style.overflow = popup ? "hidden" : "auto";
        document.body.style.paddingRight = popup ? "15px" : "0";
        setCreatePostTag([]);
    }, [popup]);

    const removeTag = (tag) => {
        let temp = [ ...createPostTag ];
        let index = temp.indexOf(tag);
        if (index !== -1) {
            temp.splice(index, 1);
            setCreatePostTag(temp);
        }
    }

    const addTag = (tag) => {
        setCreatePostTag([ ...createPostTag, tag]);
    }

    // prevent tag duplicate (but not working with upper/lower case)
    const onEnterTag = (e) => {
        let tagName = e.target.value;
        let temp = [ ...createPostTag ];
        let index = temp.indexOf(tagName);
        if(index !== -1){
            setTagVal("");
        }else{
            addTag(tagName);
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            onEnterTag(e);
            setTagVal("");
        }
    }

    return (
        <div className="bg-dark-background scrollbar-thin">
            {/* <div>
                <button name="/login" onClick={routeChange} className="text-white">login</button>
                <br />
                <button name="/signup" onClick={routeChange} className="text-white">signup</button>
            </div> */}
            <nav className="sticky top-0 bg-primary grid grid-cols-[20%_40%_20%] justify-between items-center h-[5rem]">
                <a href="/" className="ml-[5rem] max-lg:ml-[2rem]">
                    <img src="./assets/images/white-vfans.png" alt="vfans" className="h-[1.8rem]" />
                </a>
                <div className="bg-white h-[2.8rem] rounded-[10px] flex items-center">
                    <img src="./assets/images/search.png" alt="search" className="opacity-90 h-[1.3rem] ml-4 mr-2"/>
                    <input type="text" placeholder="Search" className="font-poppins font-normal text-[14px] text-black text-opacity-[78%] bg-white mr-[2rem] w-full focus:outline-none"/> 
                </div>
                <div className="flex flex-row-reverse mr-[5rem] max-lg:mr-[2rem]">
                    <div className="flex flex-row items-center justify-end">
                        <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-[2.5rem] max-lg:hidden"/>
                        <p id="username" className="font-poppins font-medium text-opacity-90 text-[14px] text-white ml-2 flex-1">
                            {username}
                        </p>
                        <div className="flex items-center ml-2">
                            <button className="w-4 h-4">
                                <img src="./assets/images/arrow-down.png" alt="arrow-down" className="w-full h-full"/>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem]">
                <section className="px-[2.5rem] border-r border-primary bg-dark-background max-xl:hidden w-[300px] h-full sticky top-[6.25rem]">
                    <div className="flex flex-col items-start divide-solid divide-y-[1px] divide-primary">
                        <div className="flex flex-col items-center w-full">
                            <button name="/" onClick={routeChange} className="font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] bg-transparent text-white text-opacity-90 hover:bg-primary active:text-emerald-green active:bg-lighter-primary">
                                Home
                            </button>
                            <button className="font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] text-opacity-90 text-emerald-green bg-lighter-primary">
                                Following
                            </button>
                        </div>
                        <div className="my-5">
                            <h1 className="font-poppins font-medium text-base text-white text-opacity-90 mt-[1.25rem] px-[1.2rem]">
                                Tag
                            </h1>
                            <div className="flex flex-wrap gap-2 my-[1.5rem]">
                                <button className="font-poppins text-white text-sm text-opacity-[78%] bg-primary rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center">
                                    <img src="./assets/images/plus.png" alt="" className="h-[0.8rem] mr-2"/>
                                    News
                                </button>
                                <button className="font-poppins text-white text-sm  text-opacity-[78%] bg-primary rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center">
                                <img src="./assets/images/plus.png" alt="" className="h-[0.8rem] mr-2"/>
                                    Debut
                                </button>
                                <button className="font-poppins text-black text-sm  text-opacity-[78%] bg-emerald-green rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center ">
                                    <img src="./assets/images/minus.png" alt="" className="w-[0.8rem] mr-2"/>
                                    Meme
                                </button>
                                <button className="font-poppins text-white text-sm  text-opacity-[78%] bg-primary rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center">
                                    <img src="./assets/images/plus.png" alt="" className="w-[0.8rem] mr-2"/>
                                    Image
                                </button>
                            </div>
                            <button className="font-poppins text-white text-opacity-[78%] rounded-[20px] border-[0.5px] border-emerald-green py-[0.8rem] px-[1.2rem] w-full font-medium text-[14px]">
                                Show more
                            </button>
                        </div>
                        <div className="text-white mb-5 w-full">
                            <div className="flex justify-between mt-[1.25rem] px-[1.2rem] my-2">
                                <p className="font-poppins font-medium text-base text-white text-opacity-90">
                                    Language
                                </p>
                                <button onClick={onToggleDropdown}>
                                    {allDropdown ? 
                                        <img src="./assets/images/arrow-up.png" alt="up" className="w-4 h-4"/>
                                        : 
                                        <img src="./assets/images/arrow-up.png" alt="down" className="w-4 h-4 rotate-180"/>
                                    }
                                </button>
                            </div>
                            {allDropdown && 
                                Object.entries(languageDropdown).map(([language, isActive]) => (
                                    <div key={language}>
                                        <ul className="font-poppins font-normal text-base text-white text-opacity-[78%]">
                                            <li className="flex justify-between mt-[1.25rem] px-[1.2rem] pl-[2rem] my-2">
                                                <p className="text-start">{language}</p>
                                                <button onClick={() => onToggleLanguageDropdown(language)}>
                                                    <img src="./assets/images/arrow-up.png" alt="up" className="w-4 h-4"/>
                                                </button>
                                            </li>
                                            {isActive && 
                                                companyDropdown[language] && 
                                                Object.entries(companyDropdown[language]).map(([company, isCompanyActive]) => (
                                                    <li key={company} className="flex justify-between mt-[1.25rem] px-[1.2rem] pl-[3rem] my-2 text-base font-light">
                                                        <p className="text-start">{company}</p>
                                                        <button onClick={() => onToggleCompanyDropdown(language, company)}>
                                                            <img src="./assets/images/arrow-up.png" alt="up" className="w-4 h-4"/>
                                                        </button>
                                                    </li>
                                                ))
                                            }
                                            {isActive && 
                                                companyDropdown[language] && 
                                                Object.entries(companyDropdown[language]).map(([company, isCompanyActive]) => (
                                                    isCompanyActive && 
                                                    talentDropdown[language][company] && 
                                                    Object.entries(talentDropdown[language][company]).map(([talent, isTalentActive]) => (
                                                        <li key={talent} className="flex justify-between mt-[1.25rem] px-[1.2rem] pl-[4rem] my-2 text-base font-extralight">
                                                            <button className="text-start">{talent}</button>
                                                        </li>
                                                    ))
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
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
                    <div className="bg-primary rounded-[10px] px-5 py-4">
                        <div className="flex justify-between">
                            <div className="flex flex-row flex-1 items-center gap-2">
                                <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-7"/>
                                <div className="flex flex-row gap-2 max-sm:flex-col max-sm:gap-0 ">
                                    <p className="font-poppins font-normal text-[13px]  text-opacity-90 text-white">
                                        English/Hololive/Myth/Gawr_Gura
                                    </p>
                                    <p className="font-poppins font-normal text-[12px] text-opacity-60 text-white">
                                        Posted by {username} - 1 hour ago
                                    </p>
                                </div>
                            </div>
                            <p className="font-poppins text-base font-extrabold text-opacity-90 text-white">
                                . . .
                            </p>
                        </div>
                        <div className="flex gap-2 pt-3">
                            <button className="font-poppins text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
                                Meme
                            </button>
                            <button className="font-poppins text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
                                Image
                            </button>
                        </div>
                        <div className="pt-3">
                            <p className="font-poppins text-[14px] font-normal text-opacity-[78%] text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eos cupiditate amet non, laboriosam molestiae quisquam tenetur, laudantium id corporis ut quibusdam incidunt. Molestias repellat perferendis animi nobis corporis id
                            </p>
                        </div>
                        <div className="rounded-[10px] pt-3">
                            <img src="./assets/images/postImage.png" alt="" />
                        </div>
                        <div className="flex gap-8 font-poppins text-[14px] font-medium text-opacity-90 text-white mt-3">
                            <button>
                                Like
                            </button>
                            <button>
                                Comment
                            </button>
                            <button>
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="bg-primary rounded-[10px] px-5 py-4">
                        <div className="flex justify-between">
                            <div className="flex flex-row flex-1 items-center gap-2">
                                <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-7"/>
                                <div className="flex flex-row gap-2 max-lg:flex-col max-lg:gap-0 ">
                                    <p className="font-poppins font-normal text-[13px]  text-opacity-90 text-white">
                                        English/Hololive/Myth/Gawr_Gura
                                    </p>
                                    <p className="font-poppins font-normal text-[12px] text-opacity-60 text-white">
                                        Posted by {username} - 1 hour ago
                                    </p>
                                </div>
                            </div>
                            <p className="font-poppins text-base font-extrabold text-opacity-90 text-white">
                                . . .
                            </p>
                        </div>
                        <div className="flex gap-2 pt-3">
                            <button className="font-poppins text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
                                Meme
                            </button>
                            <button className="font-poppins text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
                                Image
                            </button>
                        </div>
                        <div className="pt-3">
                            <p className="font-poppins text-[14px] font-normal text-opacity-[78%] text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eos cupiditate amet non, laboriosam molestiae quisquam tenetur, laudantium id corporis ut quibusdam incidunt. Molestias repellat perferendis animi nobis corporis id
                            </p>
                        </div>
                        <div className="rounded-[10px] pt-3">
                            <img src="./assets/images/postImage.png" alt="" />
                        </div>
                        <div className="flex gap-8 font-poppins text-[14px] font-medium text-opacity-90 text-white mt-3">
                            <button>
                                Like
                            </button>
                            <button>
                                Comment
                            </button>
                            <button>
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="bg-primary rounded-[10px] px-5 py-4">
                        <div className="flex justify-between">
                            <div className="flex flex-row flex-1 items-center gap-2">
                                <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-7"/>
                                <div className="flex flex-row gap-2 max-lg:flex-col max-lg:gap-0 ">
                                    <p className="font-poppins font-normal text-[13px]  text-opacity-90 text-white">
                                        English/Hololive/Myth/Gawr_Gura
                                    </p>
                                    <p className="font-poppins font-normal text-[12px] text-opacity-60 text-white">
                                        Posted by {username} - 1 hour ago
                                    </p>
                                </div>
                            </div>
                            <p className="font-poppins text-base font-extrabold text-opacity-90 text-white">
                                . . .
                            </p>
                        </div>
                        <div className="flex gap-2 pt-3">
                            <button className="font-poppins text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
                                Meme
                            </button>
                            <button className="font-poppins text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
                                Image
                            </button>
                        </div>
                        <div className="pt-3">
                            <p className="font-poppins text-[14px] font-normal text-opacity-[78%] text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eos cupiditate amet non, laboriosam molestiae quisquam tenetur, laudantium id corporis ut quibusdam incidunt. Molestias repellat perferendis animi nobis corporis id
                            </p>
                        </div>
                        <div className="rounded-[10px] pt-3">
                            <img src="./assets/images/postImage.png" alt="" />
                        </div>
                        <div className="flex gap-8 font-poppins text-[14px] font-medium text-opacity-90 text-white mt-3">
                            <button>
                                Like
                            </button>
                            <button>
                                Comment
                            </button>
                            <button>
                                Save
                            </button>
                        </div>
                    </div>
                </section>
                <section className="bg-dark-background px-[2.5rem] max-xl:hidden border-l border-primary w-[300px]">
                    <div className="flex flex-col sticky top-[6.25rem] w-full">
                        <button className="font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] bg-transparent text-white text-opacity-90 hover:bg-primary active:text-emerald-green active:bg-lighter-primary">
                            Like
                        </button>
                        <button className="font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] bg-transparent text-white text-opacity-90 hover:bg-primary active:text-emerald-green active:bg-lighter-primary">
                            Save
                        </button>
                    </div>
                </section>
            </div>
            { popup &&
                <div className="fixed overflow-y-scroll inset-0 h-full backdrop-brightness-50 backdrop-blur-0 flex flex-col justify-center items-center max-lg:px-[2rem] px-[10rem] xl:px-[4rem]">
                    <div className="bg-primary rounded-[10px] flex flex-col min-w-[700px] max-xl:min-w-full max-w-[60vh]" ref={createPostPopupRef}>
                        <div className="flex flex-row-reverse px-6 py-4 border-b border-white border-opacity-10">
                            <button onClick={() => setPopup(false)}>
                                <img src="./assets/images/cross.png" alt="cross" className="w-5 h-5" />
                            </button>
                        </div>
                        {/* yere */}
                        <div className="mx-6 mt-2 mb-4"> 
                            <div className="flex items-center">
                                <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-[2rem]"/>
                                <p id="username" className="font-poppins font-normal text-opacity-90 text-base text-white ml-2 w-full h-fit">
                                    {username}
                                </p>
                            </div>
                            <div className="mt-2">
                                <textarea className="bg-dark-background p-3 font-poppins font-light text-white text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]" rows="5" placeholder="Write Something..." onChange={(e) => setCreatePostContent(e.target.value)}></textarea>
                            </div>
                            <div className="mt-4">
                                <h1 className="font-poppins text-white font-normal text-lg">
                                    Tag
                                </h1>
                                <div className="bg-dark-background min-h-[3rem] rounded-[10px] mt-4 flex flex-wrap gap-2 items-center p-2">
                                    {/* added tag */}
                                    { 
                                        createPostTag.map((tag, index) => (
                                            <div key={index} className="bg-emerald-green rounded-[4px] flex p-[0.4rem]">
                                                <p className="font-poppins text-black opacity-90 text-base font-normal">{tag}</p>
                                                <button onClick={() => removeTag(tag)} className="ml-1">
                                                    <img src="./assets/images/tagCross.png" alt="cross" className="h-4"/>
                                                </button>
                                            </div>
                                        ))
                                    }
                                    <div className="justify-center items-center h-full w-[25%]">
                                        <input type="text" placeholder="Add Tag..." className="block bg-transparent resize-none font-poppins font-light text-base text-white placeholder-white text-opacity-90 placeholder-opacity-60 focus:outline-none mx-2 caret-[#8c8c8c] h-full w-full" value={tagVal} onKeyDown={handleKeyDown} onChange={(e) => setTagVal(e.target.value)} ></input>
                                    </div>
                                </div>
                                <div className="bg-[#202020] h-auto rounded-[10px] max-h-[9rem] mt-2 flex flex-wrap gap-2 p-2 overflow-y-scroll">
                                    { 
                                        tagData.map((tag, index) => (
                                            <button className={`font-poppins font-normal text-${createPostTag.includes(tag) ? 'black' : 'white'} text-opacity-90 bg-${createPostTag.includes(tag) ? 'emerald-green' : 'dark-background'} rounded-[20px] py-[0.6rem] px-[0.8rem] flex items-center`} onClick={() => createPostTag.includes(tag) ? removeTag(tag) : addTag(tag)}>
                                                <img src={createPostTag.includes(tag) ? './assets/images/minus.png' : './assets/images/plus.png'} alt="" className="w-[0.9rem] mr-2"/>
                                                {tag}
                                            </button>
                                        ))
                                    }
                                </div>
                                {/* can't preview image yet */}
                                <div className="flex justify-between mt-2 mx-4 items-center">
                                    <div className="flex gap-5">
                                        <div>
                                            <input 
                                                id="imageInput"
                                                type="file" 
                                                accept="image/*" 
                                                className="hidden" 
                                                // onChange={handleFileSelect} 
                                            />
                                            <label htmlFor="imageInput" className="cursor-pointer">
                                                <img src="./assets/images/photo.png" alt="photo" className="w-8 h-8" />
                                            </label>                                            
                                        </div>
                                        <div>
                                            <input 
                                                id="videoInput"
                                                type="file" 
                                                accept="video/*" 
                                                className="hidden" 
                                                // onChange={handleFileSelect} 
                                            />
                                            <label htmlFor="videoInput" className="cursor-pointer">
                                                <img src="./assets/images/video.png" alt="video" className="w-8 h-8" />
                                            </label>                                            
                                        </div>
                                    </div>
                                    <button className="bg-emerald-green rounded-[20px] font-poppins font-medium text-black text-opacity-[78%] text-lg py-4 px-16">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

