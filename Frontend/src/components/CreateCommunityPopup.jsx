import { useRef, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function CreateCommunityPopup({ setPopup, popup }) {
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

    const [createCommunityName, setCreateCommunityName] = useState("");
    const [createCommunityDescription, setCreateCommunityDescription] = useState("");
    const maxCommunityName = 30;
    const maxCommunityDescription = 250;

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxCommunityName) {
            setCreateCommunityName(value);
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxCommunityDescription) {
            setCreateCommunityDescription(value);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    // When submit Post 
    const handleCreate = (e) => {
        e.preventDefault();
        console.log("Community Name: " + createCommunityName);
        console.log("Community Description: " + createCommunityDescription);
        setPopup(false);
    }

    return (
        <form onSubmit={handleCreate} onKeyDown={handleKeyPress} className={`fixed overflow-y-scroll inset-0 h-full flex flex-col justify-center items-center max-lg:px-[2rem] px-[10rem] xl:px-[4rem] z-50 overflow-x-hidden duration-[200ms] ${popup ? "scale-100 opacity-100": "scale-0 opacity-0"}`}>
            <div className={`bg-primary rounded-[10px] flex flex-col max-md:w-full w-[700px] transform`} ref={createPostPopupRef}>
                <div className="flex items-center justify-end px-6 py-4 border-b border-white border-opacity-10">
                    <p className="absolute left-1/2 transform -translate-x-1/2 text-white text-opacity-90 flex justify-center">Create Community</p>
                    <XMarkIcon className="size-8 text-white hover:cursor-pointer" onClick={() => setPopup(false)} />
                </div>
                <div className="mx-6 mt-2 text-white">
                    <div className="flex flex-col gap-1">
                        <label className="mx-1 opacity-80">
                            Community name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" className="bg-dark-background mt-1 p-3 font-light text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] w-full rounded-[10px]" rows="5" placeholder="Community name..." onChange={e => handleNameChange(e)} value={createCommunityName} required></input>
                        <p className="text-end font-light opacity-70 text-[14px]">{createCommunityName.length}/{maxCommunityName}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="mx-1 opacity-80">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea type="text" className="bg-dark-background mt-1 p-3 font-light text-white text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]" rows="5" placeholder="Description..." onChange={e => handleDescriptionChange(e)} value={createCommunityDescription} required></textarea>
                        <p className="text-end font-light opacity-70 text-[14px]">{createCommunityDescription.length}/{maxCommunityDescription}</p>
                    </div>
                </div>
                <button type="submit" className="bg-emerald-green rounded-[20px] text-[16px] font-medium text-black text-opacity-[78%] text-lg py-4 px-6 mt-4 mx-6 mb-6 flex justify-center self-end max-w-[14rem] w-full">Create Community</button>
            </div>
        </form>
    );
}