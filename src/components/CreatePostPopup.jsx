import { useRef, useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { ChevronDownIcon, PhotoIcon } from '@heroicons/react/20/solid'

export default function CreatePostPopup({ handleSubmitPost, setPopup }) {
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
    const [pathSelect, setPathSelect] = useState(null);
    const [createPostContent, setCreatePostContent] = useState(""); // create post content text field
    const [tagVal, setTagVal] = useState(""); //tag in text field
    const [createPostTag, setCreatePostTag] = useState([]); //tag add already added in create post
    const [tagCheckbox, setTagCheckbox] = useState(false);

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

    const removeTag = (tag) => {
        let temp = [ ...createPostTag ];
        let index = temp.indexOf(tag);
        if (index !== -1) {
            temp.splice(index, 1);
            setCreatePostTag(temp);
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            onEnterTag(e);
            setTagVal("");
        }
    }

    const [toggleTabState, setToggleTabState] = useState(1);
    const toggleTab = (tab) => {
        setToggleTabState(tab);
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }
    const dragOver = (e) => {
        e.preventDefault();
    }
    const dragLeave = (e) => {
        e.preventDefault();
    }
    const drop = (e) => {
        console.log("Drop");
        e.preventDefault();
    
        const files = e.dataTransfer.files;
        handleFileSelect(files);
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

    return (
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
                        {toggleTabState === 1 && <div>
                            {/* select community before posting */}
                            <div className={`h-12 w-[50%] relative`}>
                                <div value="Select Community" onClick={() => setPathSelect(!pathSelect)} className={`appearance-none bg-transparent font-poppins font-light text-base text-white text-opacity-80 h-full w-full inline-flex items-center p-2 focus:outline-none border border-emerald-green border-opacity-70 ${pathSelect ? "rounded-b-[0px] rounded-t-[20px]" : "rounded-[20px]"}`}>
                                    Select Community
                                    <span>
                                        <ChevronDownIcon className="h-8 text-white absolute right-3 top-0 bottom-0 my-auto pointer-events-none opacity-90" />
                                    </span>
                                </div>
                                {pathSelect && 
                                    <div className="bg-dark-background absolute w-full border border-t-0 border-emerald-green p-2 overflow-y-scroll max-h-[200px]">
                                        {}
                                    </div>
                                }
                            </div>
                            <div className="mt-2 flex gap-2">
                                <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-[2rem]" />
                                <textarea className="bg-dark-background p-3 font-poppins font-light text-white text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]" rows="5" placeholder="Write Something..." onChange={e => setCreatePostContent(e.target.value)} value={createPostContent} required></textarea>
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
                                            {createPostTag.map((tag, index) => <div key={index} className="bg-emerald-green rounded-[4px] flex px-[0.3rem] py-1">
                                                        <p className="font-poppins text-black opacity-90 text-sm font-medium">{tag}</p>
                                                        <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                                                            <img src="./assets/images/tagCross.png" alt="cross" className="h-3" />
                                                        </button>
                                                    </div>)}
                                            <input type="text" placeholder="Add Tag..." className="block bg-transparent resize-none font-poppins font-normal text-sm text-white placeholder-white text-opacity-90 placeholder-opacity-60 focus:outline-none caret-[#8c8c8c] h-full min-w-[4rem] flex-1" value={tagVal} onKeyDown={handleKeyDown} onChange={e => setTagVal(e.target.value)} />
                                        </div>
                                        <div className="bg-[#202020] h-auto rounded-[10px] max-h-[9rem] mt-1 flex flex-wrap gap-2 p-2 overflow-y-scroll">
                                            {tagData.map((tag, index) => 
                                                <button type="button" key={index} className={`font-poppins text-sm font-medium text-${createPostTag.includes(tag) ? 'black' : 'white'} text-opacity-90 bg-${createPostTag.includes(tag) ? 'emerald-green' : 'dark-background'} rounded-[20px] py-[0.6rem] px-[0.8rem] flex items-center`} onClick={() => createPostTag.includes(tag) ? removeTag(tag) : addTag(tag)}>
                                                    <img src={createPostTag.includes(tag) ? './assets/images/minus.png' : './assets/images/plus.png'} alt="" className="w-[0.9rem] mr-2" />
                                                    {tag}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>}
                    </div>
                    <div className={`transition-all duration-[400ms] ${toggleTabState === 2 ? "opacity-100" : "opacity-0"}`}>
                        {toggleTabState === 2 && <div className="flex flex-col gap-4">
                            <div className="mt-2">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="font-poppins flex flex-col items-center justify-center w-full h-40 border-2 border-white border-dashed border-opacity-60 rounded-lg cursor-pointer bg-dark-background dark:hover:border-opacity-40 hover:bg-lighter-primary" onDragEnter={e => dragEnter(e)} onDragOver={e => dragOver(e)} onDragLeave={e => dragLeave(e)} onDrop={e => drop(e)}>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <PhotoIcon className="size-14 p-2 text-white text-opacity-60" aria-hidden="true" />
                                            <p className="mb-2 text-sm text-white text-opacity-60"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-white text-opacity-60">SVG, PNG, JPG or JPEG (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" multiple accept="image/jpeg, image/png" className="hidden" onChange={e => handleFileSelect(e.target.files)} />
                                    </label>
                                </div> 
                            </div>
                            <div className="w-full h-full bg-dark-background rounded-[10px]">
                                <Carousel transition={{ duration: 0.2 }} className="rounded-xl flex items-center aspect-[2/1]">
                                    {imageFile.length > 0 ? imageFile.map((img, index) => <img src={img} alt="image" key={index} className="h-full w-full object-contain" />) : <div className="h-full w-full flex items-center justify-center text-white text-opacity-60 text-xl font-poppins font-normal">
                                            Image Preview
                                        </div>}
                                </Carousel>
                            </div>
                        </div>}
                    </div>
                </div>
                <button type="submit" className="bg-emerald-green rounded-[20px] font-poppins font-medium text-black text-opacity-[78%] text-lg py-4 px-16 mt-4 mx-10 mb-6 flex justify-center self-end">Post</button>
            </div>
        </form>
    );
}