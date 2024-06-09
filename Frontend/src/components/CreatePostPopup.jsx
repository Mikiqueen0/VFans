import { useRef, useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	PhotoIcon,
	MinusIcon,
	PlusIcon,
	XMarkIcon,
} from "@heroicons/react/20/solid";
import crossIcon from "../assets/images/tagCross.png";
import useUser from "../hooks/useUser";
import useCommunity from "../hooks/useCommunity";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabase";

export default function CreatePostPopup({ setPopup, popup }) {
	const { user, setUser } = useUser();
	const { communityList, setCommunityList } = useCommunity();
	const { communityID } = useParams();
	const [communityDropdown, setCommunityDropdown] = useState(false); // community dropdown
	const [communitySelect, setCommunitySelect] = useState({}); // selected community
	const [communitySearch, setCommunitySearch] = useState(""); //search community field
	const [filteredCommunityList, setFilteredCommunityList] = useState(communityList); // filtered community list
	const [tagVal, setTagVal] = useState(""); //tag in text field
	const [tagCheckbox, setTagCheckbox] = useState(false); // tag dropdown
	const [postData, setPostData] = useState({
		userID: "",
		communityID: "",
		desc: "",
		image: [],
		video: [],
		tag: []
	});

	//tag user can choose
	const [tagData, setTagData] = useState([
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
		"Review",
	]);

	useEffect(() => {
		if (communityID) {
			const communityFilter = communityList.filter(community => community?._id === communityID);
			handleCommunitySelect(communityFilter[0]);
		}
	}, [popup]);

	const handleCommunitySelect = (selectedCommunity) => {
		setCommunitySelect(selectedCommunity);
		setPostData({ ...postData, communityID: selectedCommunity?._id});
		setCommunityDropdown(false);
	};

	const createPostPopupRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (e) => {
		if (
			createPostPopupRef.current &&
			!createPostPopupRef.current.contains(e.target)
		) {
			setPopup(false);
		}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [createPostPopupRef]);

	const addTag = (tag) => {
		// setCreatePostTag([...createPostTag, tag]);
		setPostData({ ...postData, tag: [...postData.tag, tag] });
	};

	// prevent tag duplicate (but not working with upper/lower case)
	const onEnterTag = (e) => {
		let tagName = e.target.value;
		// let temp = [ ...createPostTag ];
		let temp = [ ...postData.tag ];
		let index = temp.indexOf(tagName);
		if (index !== -1) {
			setTagVal("");
		} else {
			addTag(tagName);
		}
	};

	const removeTag = (tag) => {
		let temp = [ ...postData.tag ];
		let index = temp.indexOf(tag);
		if (index !== -1) {
			temp.splice(index, 1);
			setPostData({ ...postData, tag: temp });
			// setCreatePostTag(temp);
		}
	};

	const handleTagEnter = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			onEnterTag(e);
			setTagVal("");
		}
	};

	const [toggleTabState, setToggleTabState] = useState(1);
	const toggleTab = (tab) => {
		setToggleTabState(tab);
	};

	const dragEnter = (e) => {
		e.preventDefault();
	};
	const dragOver = (e) => {
		e.preventDefault();
	};
	const dragLeave = (e) => {
		e.preventDefault();
	};
	const drop = (e) => {
		console.log("Drop");
		e.preventDefault();
	};

	useEffect(() => {
		if (!popup) {
			setPostData({
				userID: "",
				communityID: "",
				desc: "",
				image: [],
				video: [],
				tag: []
			});
			setTagVal("");
			setImageFile([]);
			setTagCheckbox(false);
			setToggleTabState(1);
			setCommunityDropdown(false);
			setCommunitySelect({});
			setCommunitySearch("");
		}
	}, [popup]);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
		e.preventDefault();
		}
	};

	const handleCommunitySearch = (e) => {
		setCommunitySearch(e.target.value);
		const filtered = communityList.filter(community => 
			community.name.toLowerCase().includes(e.target.value.toLowerCase())
		);
		setFilteredCommunityList(filtered);
	};


	const [imageFile, setImageFile] = useState([]);

	const handleFileChange = (e) => {
		const filesArray = Array.from(e.target.files);
		setImageFile(filesArray);
	};

	const uploadFile = async (file) => {
        try {
            const { data } = await supabase.storage
                .from("VFans")
                .upload("/" + uuidv4(), file);
            const image = await supabase.storage
                .from("VFans")
                .getPublicUrl(data.path);
            return image.data.publicUrl;
        } catch (err) {
            console.error("Error uploading file:", err);
        };
    };

	// When submit Post
	const handleSubmitPost = async (e) => {
		e.preventDefault();
		try {
			const uploadPromises = imageFile.map(file => uploadFile(file));
			const uploadedFilesUrls = await Promise.all(uploadPromises);

			const createPost = await axios.post("/post/create", { ...postData, image: uploadedFilesUrls, userID: user._id });
			createPost.data.success && console.log("Post created successfully");
			// console.log(createPost.data.post);
		} catch (err) {
			console.error("Error creating post", err);
		}
		setPopup(false);
	};

    return ( 
        <form onSubmit={handleSubmitPost} onKeyDown={handleKeyPress} className={`fixed overflow-y-scroll inset-0 h-full flex flex-col justify-center items-center max-lg:px-[2rem] px-[10rem] xl:px-[4rem] z-50 overflow-x-hidden duration-[200ms] ${popup ? "scale-100 opacity-100": "scale-0 opacity-0"}`}>
            {/* <div className={`fixed inset-0 backdrop-brightness-50 backdrop-blur-[1px]`}></div> */}
            <div className={`bg-primary rounded-[10px] flex flex-col max-md:w-full w-[700px] transform`} ref={createPostPopupRef}>
                <div className="grid grid-cols-[1/3_1/3_1/3] items-center px-6 py-4 border-b border-white border-opacity-10">
                    <p className="col-start-2 text-white text-opacity-90 flex justify-center">Create Post</p>
                    <div className="col-start-3 flex justify-end">
                        {/* <img src="./assets/images/cross.png" alt="cross" className="w-5 h-5" /> */}
                        <XMarkIcon className="size-8 text-white hover:cursor-pointer" onClick={() => setPopup(false)} />
                    </div>
                </div>
                <div className="mx-6 mt-2">
					{/* select community before posting */}
					<div className={`h-12 w-[50%] relative my-2`}>
						<div value="Select Community" className={`appearance-none bg-transparent text-base text-white text-opacity-80 h-full w-full inline-flex items-center py-2 px-4 focus:outline-none border justify-between border-emerald-green border-opacity-70 ${communityDropdown ? "rounded-b-[0px] rounded-t-[20px]" : "rounded-[20px]"}`}>
							{communityDropdown ? 
								<input type="text" onChange={handleCommunitySearch} value={communitySearch} className="bg-primary caret-[#8c8c8c] h-full w-full font-light focus:outline-none" placeholder="Search Community..."></input>
								: 
								<p className="flex items-center">
									{communitySelect.name ? (
										<>
										<img src={communitySelect.image} alt="" className="bg-emerald-green rounded-full size-6 mr-2" />
										{communitySelect.name}
										</>
									) : "Select Community"}
									
								</p>
								
							}
							<div onClick={() => setCommunityDropdown(!communityDropdown)} className="cursor-pointer">
								<ChevronDownIcon className="h-8 text-white right-3 top-0 bottom-0 my-auto pointer-events-none opacity-90" />
							</div>
						</div>
						{communityDropdown && 
							<div className="bg-dark-background absolute w-full border border-t-0 border-emerald-green overflow-y-scroll max-h-[200px]">
								{filteredCommunityList.map((community, index) => {
									return (
										<div key={index} className="flex items-center px-4 py-3 gap-3 group cursor-pointer hover:bg-darkest-black" onClick={() => handleCommunitySelect(community)}>
											<img src={community.image} alt="" className="rounded-full size-8 bg-emerald-green object-cover"/>
											<p className="text-white opacity-80 group-hover:text-emerald-green duration-100 flex-grow">{community.name}</p>
										</div>
									);
								})}
							</div>
						}
					</div>
                    <div className="mb-4 grid grid-cols-[5rem_5rem]">
                        <div onClick={() => toggleTab(1)} className={`p-2 px-4 text-opacity-80 cursor-pointer text-white text-center transition-colors duration-100 hover:bg-dark-background active:bg-darkest-black ${toggleTabState === 1 ? "bg-transparent border-b-[3px] border-emerald-green" : "border-transparent bg-transparent"}`}>Text</div>
                        <div onClick={() => toggleTab(2)} className={`p-2 px-4 text-opacity-80 cursor-pointer text-white text-center transition-colors duration-100 hover:bg-dark-background active:bg-darkest-black ${toggleTabState === 2 ? "bg-transparent border-b-[3px] border-emerald-green" : "border-transparent bg-transparent"}`}>Image</div>
                    </div>
                    <div className={`transition-all duration-[400ms] ${toggleTabState === 1 ? "opacity-100" : "opacity-0"}`}>
                        {toggleTabState === 1 && <div>
                            <div className="mt-2 flex gap-2">
                                <img src={user?.profileImage} alt="profile" className="rounded-full size-[2rem] object-cover" />
                                <textarea className="bg-dark-background p-3 font-light text-white text-base text-opacity-80 focus:outline-none caret-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]" rows="5" placeholder="Write Something..." onChange={(e) => setPostData((prev) => ({ ...prev, desc: e.target.value }))} value={postData.desc} required></textarea>
                            </div>
                            <div className="mt-2">
                                <section className="bg-primary rounded-[10px] shadow-md shadow-darkest-black">
                                    <label onClick={() => setTagCheckbox(!tagCheckbox)} className="flex justify-between items-center h-10 cursor-pointer text-white text-opacity-80 font-normal text-lg p-3 rounded-[10px] bg-primary">
                                        Tag
                                        {/* <img src={tagCheckbox ? "./assets/images/whiteMinus.png" : "./assets/images/plus.png"} alt="collapse" className="w-4 opacity-80" /> */}
                                        {tagCheckbox ? <ChevronDownIcon className="size-6"/> : <ChevronUpIcon className="size-6"/>}
                                    </label>
                                    <div className={`block overflow-hidden py-0 transition-all duration-500 ${tagCheckbox ? "max-h-80" : "max-h-0"}`}>
                                        <div className="bg-dark-background min-h-[2.8rem] rounded-[10px] mt-1 flex flex-wrap gap-2 items-center p-2">
                                            {/* added tag */}
                                            {postData.tag.map((tag, index) => 
												<div key={index} className="bg-emerald-green rounded-[4px] flex px-[0.3rem] py-1">
													<p className="text-black opacity-80 text-sm font-medium">{tag}</p>
													<button type="button" onClick={() => removeTag(tag)} className="ml-1">
														<img src={crossIcon} alt="cross" className="h-3 opacity-90" />
													</button>
												</div>)}
                                            <input type="text" placeholder="Add Tag..." className="block bg-transparent resize-none font-normal text-sm text-white placeholder-white text-opacity-80 placeholder-opacity-60 focus:outline-none caret-[#8c8c8c] h-full min-w-[4rem] flex-1" value={tagVal} onKeyDown={handleTagEnter} onChange={e => setTagVal(e.target.value)} />
                                        </div>
                                        <div className="bg-[#202020] h-auto rounded-[10px] max-h-[9rem] mt-1 flex flex-wrap gap-2 p-2 overflow-y-scroll">
                                            {tagData.map((tag, index) => 
                                                <button type="button" key={index} className={`text-sm font-medium text-${postData.tag.includes(tag) ? 'black' : 'white'} text-opacity-80 bg-${postData.tag.includes(tag) ? 'emerald-green' : 'dark-background'} rounded-[20px] py-[0.6rem] px-[0.8rem] flex items-center`} onClick={() => postData.tag.includes(tag) ? removeTag(tag) : addTag(tag)}>
                                                    {/* <img src={createPostTag.includes(tag) ? './assets/images/minus.png' : './assets/images/plus.png'} alt="" className="w-[0.9rem] mr-2 opacity-80" /> */}
                                                    {postData.tag.includes(tag) ? <MinusIcon className="size-6" /> : <PlusIcon className="size-6" />}
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
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-white border-dashed border-opacity-60 rounded-lg cursor-pointer bg-dark-background dark:hover:border-opacity-40 hover:bg-lighter-primary" onDragEnter={e => dragEnter(e)} onDragOver={e => dragOver(e)} onDragLeave={e => dragLeave(e)} onDrop={e => drop(e)}>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <PhotoIcon className="size-14 p-2 text-white text-opacity-60" aria-hidden="true" />
                                            <p className="mb-2 text-sm text-white text-opacity-60"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-white text-opacity-60">SVG, PNG, JPG or JPEG (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" multiple accept="image/jpeg, image/png, video/mp4, video/mov" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div> 
                            </div>
                            <div className="w-full h-full bg-dark-background rounded-[10px]">
                                <Carousel transition={{ duration: 0.2 }} className="rounded-xl flex items-center aspect-[2/1]">
                                    {imageFile.length > 0 ? imageFile.map((img, index) => <img src={URL.createObjectURL(img)} alt="image" key={index} className="h-full w-full object-contain" />) : <div className="h-full w-full flex items-center justify-center text-white text-opacity-60 text-xl font-normal">
                                            Image Preview
                                        </div>}
                                </Carousel>
                            </div>
                        </div>}
                    </div>
                </div>
                <button type="submit" className="bg-emerald-green rounded-[20px] text-[16px] font-medium text-black text-opacity-[78%] text-lg py-4 px-6 mt-4 mx-6 mb-6 flex justify-center self-end max-w-[10rem] w-full">Post</button>
            </div>
        </form>
    );
};

