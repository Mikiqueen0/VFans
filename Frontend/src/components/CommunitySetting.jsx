import { useRef, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import communityTestIcon from '../assets/images/test-profile.jpg';
import communityBackground from '../assets/images/profileBackground.png';

export default function CommunitySetting({ setCommunityData, communityData, setPopup, popup }) {
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

    const [updatedImage, setUpdatedImage] = useState("");
    const [updatedBackground, setUpdatedBackground] = useState("");
    const [updatedCommunityDescription, setUpdatedCommunityDescription] = useState("");
    const maxCommunityDescription = 250;

    useEffect(() => {
        setUpdatedCommunityDescription(communityData.description);
        setUpdatedImage(communityData.image);
        setUpdatedBackground(communityData.background);
    }, [popup]);

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxCommunityDescription) {
            setUpdatedCommunityDescription(value);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    // When update community
    const handleUpdate = (e) => {
        e.preventDefault();
        setCommunityData({
            ...communityData,
            image: updatedImage,
            background: updatedBackground,
            description: updatedCommunityDescription
        })
        console.log(communityData);
        setPopup(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedImage(URL.createObjectURL(file));
        } else {
            console.log("No file selected");
        }
    };

    const handleBackgroundChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedBackground(URL.createObjectURL(file));
        } else {
            console.log("No file selected");
        }
    };

    return (
        <form onSubmit={handleUpdate} onKeyDown={handleKeyPress} className={`fixed overflow-y-scroll inset-0 h-full flex flex-col justify-center items-center max-lg:px-[2rem] px-[10rem] xl:px-[4rem] z-50 overflow-x-hidden duration-[200ms] ${popup ? "scale-100 opacity-100": "scale-0 opacity-0"}`}>
            <div className={`bg-primary rounded-[10px] flex flex-col max-md:w-full w-[700px] transform`} ref={createPostPopupRef}>
                <div className="flex items-center justify-end px-6 py-4 border-b border-white border-opacity-10">
                    <p className="absolute left-1/2 transform -translate-x-1/2 text-white text-opacity-90 flex justify-center">Edit Community</p>
                    <XMarkIcon className="size-8 text-white hover:cursor-pointer" onClick={() => setPopup(false)} />
                </div>
                <div className="mx-6 mt-2 text-white flex flex-col">
                    {/* image */}
                    <label htmlFor="image-input" className="relative cursor-pointer">
                        <input
                            id="image-input"
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/jpeg, image/png, image/jpg"
                        />
                        <div className="w-full inline-flex justify-center my-2">
                            <div className="w-[7rem] h-[7rem] relative">
                                <img
                                    src={updatedImage || communityTestIcon} // Use a default image or the updated image
                                    alt="image"
                                    className="w-full h-full object-cover rounded-full"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                                    <PencilIcon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    </label>
                    {/* background */}
                    <label htmlFor="background-input" className="relative cursor-pointer">
                        <input
                            id="background-input"
                            type="file"
                            className="hidden"
                            onChange={handleBackgroundChange}
                            accept="image/jpeg, image/png, image/jpg"
                        />
                        <div className="w-full inline-flex justify-center my-2">
                            <div className="max-w-[24rem] w-[24rem] h-[10rem] relative">
                                <img
                                    src={updatedBackground || communityBackground} // Use a default image or the updated image
                                    alt="background"
                                    className="w-full h-full object-cover rounded-[10px]"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[10px]">
                                    <PencilIcon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    </label>
                    <div>
                        <img src="" alt="" className="" />
                    </div>
                    {/* name */}
                    <div className="flex flex-col gap-1">
                        <label className="mx-1 opacity-80">
                            Community name
                        </label>
                        <input type="text" className="bg-lighter-primary mt-1 p-3 font-light text-gray-200 text-base text-opacity-60 focus:outline-none w-full rounded-[10px]" value={communityData.name} readOnly></input>
                    </div>
                    {/* description */}
                    <div className="flex flex-col gap-1 mt-4">
                        <label className="mx-1 opacity-80">
                            Description <span></span>
                        </label>
                        <textarea type="text" className="bg-dark-background mt-1 p-3 font-light text-white text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]" rows="5" placeholder="Description..." onChange={e => handleDescriptionChange(e)} value={updatedCommunityDescription} required></textarea>
                        <p className="text-end font-light opacity-70 text-[14px]">{updatedCommunityDescription?.length || 0}/{maxCommunityDescription}</p>
                    </div>
                </div>
                <button type="submit" className="bg-emerald-green rounded-[20px] text-[16px] font-medium text-black text-opacity-[78%] text-lg py-4 px-6 mt-4 mx-6 mb-6 flex justify-center self-end max-w-[14rem] w-full">Save</button>
            </div>
        </form>
    );
}