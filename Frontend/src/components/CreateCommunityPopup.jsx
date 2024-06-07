import { useRef, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function CreateCommunityPopup({ handleCreate, setPopup }) {
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
    const maxCommunityDescription = 500;

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

    return (
        <form onSubmit={handleCreate} className="fixed inset-0 h-full backdrop-brightness-50 backdrop-blur-[1px] flex flex-col justify-center items-center max-lg:px-[2rem] px-[10rem] xl:px-[4rem] z-50 overflow-x-hidden">
            <div className="bg-primary rounded-[10px] flex flex-col max-md:w-full w-[700px]" ref={createPostPopupRef}>
                <div className="grid grid-cols-[1/3_1/3_1/3] items-center px-6 py-4 border-b border-white border-opacity-10">
                    <p className="col-start-2 text-white text-opacity-90 flex justify-center">Create Community</p>
                    <div className="col-start-3 flex justify-end">
                        {/* <img src="./assets/images/cross.png" alt="cross" onClick={() => setPopup(false)} className="w-5 h-5 hover:cursor-pointer" /> */}
                        <XMarkIcon className="size-8 text-white hover:cursor-pointer" onClick={() => setPopup(false)} />
                    </div>
                </div>
                <div className="mx-6 mt-2 text-white">
                    <div className="flex flex-col gap-1">
                        <label className="mx-1 opacity-80">
                            Community name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" className="bg-dark-background mt-2 p-3 font-light text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] w-full rounded-[10px]" rows="5" placeholder="Community name..." onChange={e => handleNameChange(e)} value={createCommunityName} required></input>
                        <p className="text-end font-light opacity-70 text-[14px]">{createCommunityName.length}/{maxCommunityName}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="mx-1 opacity-80">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea type="text" className="bg-dark-background p-3 font-light text-white text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]" rows="5" placeholder="Description..." onChange={e => handleDescriptionChange(e)} value={createCommunityDescription} required></textarea>
                        <p className="text-end font-light opacity-70 text-[14px]">{createCommunityDescription.length}/{maxCommunityDescription}</p>
                    </div>
                </div>
                <button type="submit" className="bg-emerald-green rounded-[20px] text-[16px] font-medium text-black text-opacity-[78%] text-lg py-4 px-6 mt-4 mx-6 mb-6 flex justify-center self-end max-w-[14rem] w-full">Create Community</button>
            </div>
        </form>
    );
}