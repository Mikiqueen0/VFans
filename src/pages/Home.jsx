import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhotoIcon } from '@heroicons/react/20/solid'
import {
    Carousel
} from "@material-tailwind/react";

export default function Home() {
    const username = "Mikiqueen";
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

    const [path, setPath] = useState("");

    const getPath = (val) => {
        let convertedPath = val.replace(/ /g, "_");
        setPath(convertedPath);
    };
    
    
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
    const [createPostContent, setCreatePostContent] = useState(""); // create post content text field
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
        setCreatePostContent("");
        setTagCheckbox(false);
        setCreatePostTag([]);
        setTagVal("");
        setToggleTabState(1);
        setImageFile([]);
    }, [popup]);


    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
    const genericHamburgerLine = `h-[0.14rem] w-8 my-1 rounded-full bg-white transition ease transform duration-300`;
    const hamburgerPopupRef = useRef(null);
    const hamburgerButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (hamburgerPopupRef.current && !hamburgerPopupRef.current.contains(e.target) && !hamburgerButtonRef.current.contains(e.target)) {
                setHamburgerIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [hamburgerPopupRef]);

    useEffect(() => {
        document.body.style.overflow = hamburgerIsOpen ? "hidden" : "auto";
        document.body.style.paddingRight = hamburgerIsOpen ? "15px" : "0";
        
    }, [hamburgerIsOpen]);


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
            e.preventDefault();
            onEnterTag(e);
            setTagVal("");
        }
    }

    const LanguageDropdown = ({ language, isActive }) => {
        return(
            <div>
                <ul className="font-poppins font-normal text-base text-white text-opacity-[78%]">
                    <li className="flex justify-between mt-[1.25rem] px-[1.2rem] pl-[2rem] my-2">
                        <a name={`${language}`} onClick={(e) => getPath(e.target.name)} className="text-start hover:underline hover:cursor-pointer">{language}</a>
                        <button onClick={() => onToggleLanguageDropdown(language)}>
                            <img src="./assets/images/arrow-up.png" alt="up" className="w-4 h-4"/>
                        </button>
                    </li>
                    {isActive && 
                        companyDropdown[language] && (
                        <>
                            {Object.entries(companyDropdown[language]).map(([company, isCompanyActive]) => (
                                <CompanyDropdown
                                    key={company}
                                    language={language}
                                    company={company}
                                    isCompanyActive={isCompanyActive}
                                />
                            ))}
                        </>
                    )}
                </ul>
            </div>
        );
    }

    const CompanyDropdown = ({ language, company, isCompanyActive }) => {
        return(
            <>
                <li className="flex justify-between mt-[1.25rem] px-[1.2rem] pl-[3rem] my-2 text-base font-light">
                    <a name={`${language}/${company}`} onClick={(e) => getPath(e.target.name)} className="text-start hover:underline hover:cursor-pointer">{company}</a>
                    <button onClick={() => onToggleCompanyDropdown(language, company)}>
                        <img src="./assets/images/arrow-up.png" alt="up" className="w-4 h-4"/>
                    </button>
                </li>
                {isCompanyActive && (
                    <>
                        {Object.entries(talentDropdown[language][company]).map(([talent, isTalentActive]) => (
                            <TalentDropdown
                                key={talent}
                                language={language}
                                company={company}
                                talent={talent}
                            />
                        ))}
                    </>
                )}
            </>
        );
    }

    const TalentDropdown = ({ language, company, talent }) => {
        return(
            <li key={talent} className="flex justify-between mt-[1.25rem] px-[1.2rem] pl-[4rem] my-2 text-base font-extralight">
                <a name={`${language}/${company}/${talent}`} onClick={(e) => getPath(e.target.name)} className="text-start hover:underline hover:cursor-pointer">{talent}</a>
            </li>
        );
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [tagCheckbox, setTagCheckbox] = useState(false);

    const [toggleTabState, setToggleTabState] = useState(1);
    const toggleTab = (tab) => {
        setToggleTabState(tab);
    }

    const [imageFile, setImageFile] = useState([]);
    const handleFileSelect = (e) => {
        const fileList = Array.from(e);
        // Create an array to hold promises for each file read operation
        const promises = fileList.map(file => readFileAsDataURL(file));
        // Execute all promises concurrently
        Promise.all(promises)
            .then(results => {
                // Update state with the results of all file reads
                setImageFile(prevImageFile => [...prevImageFile, ...results]);
            })
            .catch(error => {
                console.error('Error reading files:', error);
            });
    }
    
    // Function to read a file as a Data URL using a FileReader
    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Resolve the promise with the result of the file read
                resolve(e.target.result);
            }
            reader.onerror = (error) => {
                // Reject the promise if an error occurs
                reject(error);
            }
            reader.readAsDataURL(file); // Read the file as a Data URL
        });
    }

    function dragEnter(e) {
        // console.log("Drag Enter");
        e.preventDefault();
        // e.target.classList.add('border-blue-500');
    }
    
    function dragOver(e) {
        // console.log("Drag Over");
        e.preventDefault();
        // e.target.classList.add('border-blue-500');
    }
    
    function dragLeave(e) {
        // console.log("Drag Leave");
        e.preventDefault();
        // e.target.classList.remove('border-blue-500');
    }
    
    function drop(e) {
        console.log("Drop");
        e.preventDefault();
        // e.target.classList.remove('border-blue-500');
    
        const files = e.dataTransfer.files;
        handleFileSelect(files);
    }

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
            <nav className="sticky top-0 bg-primary grid grid-cols-[30%_40%_30%] max-sm:grid-cols-[20%_60%_20%] justify-between items-center h-[5rem] z-50">
                <div className="ml-[5rem] max-xl:ml-[1.5rem] flex items-center gap-10 max-sm:gap-3">
                    <button
                        className="xl:hidden flex flex-col justify-center items-center group z-50"
                        ref={hamburgerButtonRef}
                        onClick={() => setHamburgerIsOpen(!hamburgerIsOpen)}
                        >
                        <div
                            className={`${genericHamburgerLine} ${
                                hamburgerIsOpen
                                ? "rotate-45 translate-y-[0.64rem] group-hover:opacity-100"
                                : "group-hover:opacity-100"
                            }`}
                        />
                        <div
                            className={`${genericHamburgerLine} ${
                                hamburgerIsOpen ? "opacity-0" : "group-hover:opacity-100"
                            }`}
                        />
                        <div
                            className={`${genericHamburgerLine} ${
                                hamburgerIsOpen
                                ? "-rotate-45 -translate-y-[0.64rem] group-hover:opacity-100"
                                : "group-hover:opacity-100"
                            }`}
                        />
                    </button>
                    <a href="/" className="">
                        <img src="./assets/images/white-vfans.png" alt="vfans" className="h-[1.8rem]" />
                    </a>
                </div>
                <div className="bg-white h-[2.8rem] rounded-[20px] flex items-center p-2">
                    <img src="./assets/images/search.png" alt="search" className="opacity-90 h-[1.3rem] ml-2" />
                    {path !== "" && 
                    <div className={`ml-1 bg-[#BABABA] rounded-[12px] flex items-center px-2 py-1 min-w-[3rem]`} style={{ maxWidth: "calc(100% - 120px)" }}>
                        <p className="text-xs xl:hidden">...</p>
                        <p dir='rtl' className="font-poppins font-normal text-[14px] overflow-hidden whitespace-nowrap">{path}</p>
                        <button onClick={() => setPath("")} className="h-4 w-4 ml-1">
                            <img src="./assets/images/pathCross.png" alt="cross" className="w-[0.85rem] min-w-[0.85rem]" />
                        </button>
                    </div>
                    }
                    <input type="text" placeholder="Search" className="font-poppins font-normal text-[14px] text-black text-opacity-[78%] bg-white ml-[0.4rem] mr-[1rem] h-full flex-1 focus:outline-none min-w-[6rem]"/>
                </div>

                
                <div className="flex flex-row-reverse mr-[5rem] max-xl:mr-[1.5rem]">
                    <div className="flex flex-row items-center justify-end">
                        <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-[2.5rem] max-lg:hidden"/>
                        <p id="username" className="font-poppins font-medium text-opacity-90 text-[14px] text-white ml-2 flex-1 max-sm:hidden">
                            {username}
                        </p>
                        <Menu as="div" className="relative inline-block text-left">
                            <div className="flex justify-center ml-2">
                                <Menu.Button className="w-8 h-8 inline-flex">
                                    <ChevronDownIcon className="-mr-1 h-full w-full text-white" aria-hidden="true" />
                                    {/* <img src="./assets/images/arrow-down.png" alt="arrow-down" className="w-full h-full"/> */}
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-white border-opacity-30">
                                <div className="py-1">
                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-dark-background text-opacity-90' : 'text-opacity-[78%]',
                                            'block px-4 py-2 text-sm font-poppins text-white'
                                        )}
                                        >
                                        <img src="./assets/images/profile.png" alt="profile" className="inline-flex h-5 mr-2"/>
                                        Profile
                                        </a>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-dark-background text-opacity-90' : 'text-opacity-[78%]',
                                            'block px-4 py-2 text-sm font-poppins text-white'
                                        )}
                                        >
                                            <img src="./assets/images/setting.png" alt="setting" className="inline-flex h-5 mr-2"/>
                                        Setting
                                        </a>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="/login"
                                        className={classNames(
                                            active ? 'bg-dark-background text-opacity-90' : 'text-opacity-[78%]',
                                            'block px-4 py-2 text-sm font-poppins text-white'
                                        )}
                                        >
                                            <img src="" alt="login" className="inline-flex h-5 mr-2"/>
                                        Login
                                        </a>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="/signup"
                                        className={classNames(
                                            active ? 'bg-dark-background text-opacity-90' : 'text-opacity-[78%]',
                                            'block px-4 py-2 text-sm font-poppins text-white'
                                        )}
                                        >
                                            <img src="" alt="signup" className="inline-flex h-5 mr-2"/>
                                        Sign up 
                                        </a>
                                    )}
                                    </Menu.Item>
                                    <form method="POST" action="#">
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                type="submit"
                                                className={classNames(
                                                active ? 'bg-dark-background text-white text-opacity-90' : 'text-opacity-[78%]',
                                                'block w-full px-4 py-2 font-poppins text-left text-sm text-white'
                                                )}
                                            >
                                                <img src="./assets/images/logout.png" alt="logout" className="inline-flex w-5 mr-2"/>
                                                Sign out
                                            </button>
                                            )}
                                        </Menu.Item>
                                    </form>
                                </div>
                                </Menu.Items>
                            </Transition>
                            </Menu>
                    </div>
                </div>
            </nav>
            <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] z-40">
                {/* left section */}
                <section className="px-[2.5rem] border-r border-primary bg-dark-background max-xl:hidden w-[300px] h-full sticky top-[6.25rem] z-40">
                    <div className="flex flex-col items-start divide-solid divide-y-[1px] divide-primary">
                        <div className="flex flex-col items-center w-full">
                            <button className="font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] text-opacity-90 text-emerald-green bg-lighter-primary">
                                Home
                            </button>
                            <button name="/Following" onClick={routeChange} className="font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] bg-transparent text-white text-opacity-90 hover:bg-primary active:text-emerald-green active:bg-lighter-primary">
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
                                    <LanguageDropdown 
                                        key={language}
                                        language={language}
                                        isActive={isActive}
                                    />
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
                {/* right section */}
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
            {/* popup when click create post */}
            { popup &&
                <form onSubmit={handleSubmitPost} className="fixed overflow-y-scroll inset-0 h-full backdrop-brightness-50 backdrop-blur-[1px] flex flex-col justify-center items-center max-lg:px-[2rem] px-[10rem] xl:px-[4rem] z-50 overflow-x-hidden">
                    <div className="bg-primary rounded-[10px] flex flex-col max-md:w-full w-[700px]" ref={createPostPopupRef}>
                        <div className="grid grid-cols-[1/3_1/3_1/3] items-center px-6 py-4 border-b border-white border-opacity-10">
                            <p className="col-start-2 font-poppins text-white text-opacity-90 flex justify-center">Create Post</p>
                            <button type="button" onClick={() => setPopup(false)} className="col-start-3 flex justify-end">
                                <img src="./assets/images/cross.png" alt="cross" className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mx-6 mt-2">
                            <div className="font-poppins mb-4 grid grid-cols-[5rem_5rem]">
                                <div onClick={() => toggleTab(1)} className={`p-2 px-4 cursor-pointer text-white text-center transition-colors duration-100 hover:bg-dark-background active:bg-darkest-black ${toggleTabState === 1 ? "bg-transparent border-b-[3px] border-emerald-green" : "border-transparent bg-transparent"}`}>Text</div>
                                <div onClick={() => toggleTab(2)} className={`p-2 px-4 cursor-pointer text-white text-center transition-colors duration-100 hover:bg-dark-background active:bg-darkest-black ${toggleTabState === 2 ? "bg-transparent border-b-[3px] border-emerald-green" : "border-transparent bg-transparent"}`}>Image</div>
                            </div>
                            <div className={`transition-all duration-[400ms] ${toggleTabState === 1 ? "opacity-100" : "opacity-0"}`}>
                                {toggleTabState === 1 && 
                                <div>
                                    <div className="mt-2 flex gap-2">
                                        <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-[2rem]"/>
                                        <textarea className="bg-dark-background p-3 font-poppins font-light text-white text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]" rows="5" placeholder="Write Something..." onChange={(e) => setCreatePostContent(e.target.value)} value={createPostContent} required></textarea>
                                    </div>
                                    <div className="mt-2">
                                        <section className="bg-primary rounded-[10px] shadow-md shadow-darkest-black">
                                            <label onClick={() => setTagCheckbox(!tagCheckbox)} className="flex justify-between items-center h-10 cursor-pointer font-poppins text-white font-normal text-lg p-3 rounded-[10px] bg-primary">
                                                Tag
                                                <img src={tagCheckbox ? "./assets/images/whiteMinus.png" : "./assets/images/plus.png"} alt="collapse" className="w-4" />
                                            </label>
                                            <div className={`block overflow-hidden py-0 transition-all duration-500 ${tagCheckbox ? "max-h-80" : "max-h-0"}`}>
                                                <div className="bg-dark-background min-h-[2.8rem] rounded-[10px] mt-1 flex flex-wrap gap-2 items-center p-2">
                                                    {/* added tag */}
                                                    { 
                                                        createPostTag.map((tag, index) => (
                                                            <div key={index} className="bg-emerald-green rounded-[4px] flex px-[0.3rem] py-1">
                                                                <p className="font-poppins text-black opacity-90 text-sm font-medium">{tag}</p>
                                                                <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                                                                    <img src="./assets/images/tagCross.png" alt="cross" className="h-3"/>
                                                                </button>
                                                            </div>
                                                        ))
                                                    }
                                                    <input type="text" placeholder="Add Tag..." className="block bg-transparent resize-none font-poppins font-normal text-sm text-white placeholder-white text-opacity-90 placeholder-opacity-60 focus:outline-none caret-[#8c8c8c] h-full min-w-[4rem] flex-1" value={tagVal} onKeyDown={handleKeyDown} onChange={(e) => setTagVal(e.target.value)} />
                                                </div>
                                                <div className="bg-[#202020] h-auto rounded-[10px] max-h-[9rem] mt-1 flex flex-wrap gap-2 p-2 overflow-y-scroll">
                                                    { 
                                                        tagData.map((tag, index) => (
                                                            <button type="button" key={index} className={`font-poppins text-sm font-medium text-${createPostTag.includes(tag) ? 'black' : 'white'} text-opacity-90 bg-${createPostTag.includes(tag) ? 'emerald-green' : 'dark-background'} rounded-[20px] py-[0.6rem] px-[0.8rem] flex items-center`} onClick={() => createPostTag.includes(tag) ? removeTag(tag) : addTag(tag)}>
                                                                <img src={createPostTag.includes(tag) ? './assets/images/minus.png' : './assets/images/plus.png'} alt="" className="w-[0.9rem] mr-2"/>
                                                                {tag}
                                                            </button>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                }
                            </div>
                            <div className={`transition-all duration-[400ms] ${toggleTabState === 2 ? "opacity-100" : "opacity-0"}`}>
                                {toggleTabState === 2 &&
                                <div className="flex flex-col gap-4">
                                    <div className="mt-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="font-poppins flex flex-col items-center justify-center w-full h-40 border-2 border-white border-dashed border-opacity-60 rounded-lg cursor-pointer bg-dark-background dark:hover:border-opacity-40 hover:bg-lighter-primary" 
                                                onDragEnter={(e) => dragEnter(e)}
                                                onDragOver={(e) => dragOver(e)}
                                                onDragLeave={(e) => dragLeave(e)}
                                                onDrop={(e) => drop(e)}>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <PhotoIcon className="size-14 p-2 text-white text-opacity-60" aria-hidden="true"/>
                                                    <p className="mb-2 text-sm text-white text-opacity-60"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-white text-opacity-60">SVG, PNG, JPG or JPEG (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" multiple accept="image/jpeg, image/png" className="hidden" onChange={(e) => handleFileSelect(e.target.files)}/>
                                            </label>
                                        </div> 
                                    </div>
                                    <div className="w-full h-full bg-dark-background rounded-[10px]">
                                        <Carousel transition={{ duration: 0.2 }} className="rounded-xl flex items-center aspect-[2/1]">
                                            {imageFile.length > 0 ? (
                                                imageFile.map((img, index) => (
                                                    <img
                                                        src={img}
                                                        alt="image"
                                                        key={index}
                                                        className="h-full w-full object-contain"
                                                    />
                                                ))
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-white text-opacity-60 text-xl font-poppins font-normal">
                                                    Image Preview
                                                </div>
                                            )}
                                        </Carousel>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                        <button type="submit" className="bg-emerald-green rounded-[20px] font-poppins font-medium text-black text-opacity-[78%] text-lg py-4 px-16 mt-4 mx-10 mb-6 flex justify-center self-end">Post</button>
                    </div>
                </form>
            }
            {hamburgerIsOpen && 
                <div className="fixed overflow-y-scroll inset-0 h-full backdrop-brightness-50 backdrop-blur-[1px] flex flex-col items-start z-40 xl:hidden">
                    <div className="bg-dark-background h-full w-[400px] flex flex-col mt-[5rem]" ref={hamburgerPopupRef}>
                        {/* left section */}
                        <section className="px-[2.5rem] bg-dark-background pt-[1.25rem]">
                            <div className="flex flex-col items-start divide-solid divide-y-[1px] divide-primary">
                                <div className="flex flex-col items-center w-full">
                                    <button className="font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] text-opacity-90 text-emerald-green bg-lighter-primary">
                                        Home
                                    </button>
                                    <button name="/Following" onClick={routeChange} className="font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] bg-transparent text-white text-opacity-90 hover:bg-primary active:text-emerald-green active:bg-lighter-primary">
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
                                            <LanguageDropdown 
                                                key={language}
                                                language={language}
                                                isActive={isActive}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            }
        </div>
    )
}

