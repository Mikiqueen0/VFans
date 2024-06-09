import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmModule } from "./index";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabase";

export default function CommunitySetting({ communityData, setPopup, popup }) {
    const navigate = useNavigate();
    const createPostPopupRef = useRef(null);
    const [confirm, setConfirm] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [updateCommunityData, setUpdateCommunityData] = useState({});
    const maxCommunityDescription = 250;

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
        setUpdateCommunityData(communityData);
    }, [popup]);

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxCommunityDescription) {
            setUpdateCommunityData({ ...updateCommunityData, desc: value });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const [bannerFile, setBannerFile] = useState(null);
    const [profileFile, setProfileFile] = useState(null);

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
        } finally {
            setBannerFile(null);
        };
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let updatedCommunityFile = { ...updateCommunityData };
            if (bannerFile) {
                const updatedBanner = await uploadFile(bannerFile);
                setBannerFile(null);
                updatedCommunityFile = { ...updatedCommunityFile, banner: updatedBanner };
            }

            if(profileFile) {
                const updatedImage = await uploadFile(profileFile);
                setProfileFile(null);
                updatedCommunityFile = { ...updatedCommunityFile, image: updatedImage };
            }

            const { data: updateCommunity } = await axios.put(`/community/${communityData?._id}`, updatedCommunityFile);

            if (updateCommunity.success) {
                console.log("Updated! ", updateCommunity.community);
            } else {
                console.error("Failed to update community");
            }
        } catch (err) {
            console.error("Error updating community", err);
        } finally {
            setPopup(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUpdateCommunityData({ ...updateCommunityData, image: URL.createObjectURL(file) });
        setProfileFile(file);
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        setUpdateCommunityData({ ...updateCommunityData, banner: URL.createObjectURL(file) });
        setBannerFile(file);
    };

    const handleDelete = async () => {
        try {
            const deleteCommunity = await axios.delete(`/community/${communityData?._id}`);
            if (deleteCommunity.data.success) {
                console.log("Deleted! ", deleteCommunity.data.message);
                navigate("/community");
            } else {
                console.error("Failed to delete community");
            }
        } catch (err) {
            console.error("Error deleting community", err);
        } finally {
            setPopup(false);
        }
    };

    // const confirmDelete = async () => {
    //     try {
    //         const deleteCommunity = await axios.delete(`/community/${communityData?._id}`);
    //         if (deleteCommunity.data.success) {
    //             console.log("Deleted! ", deleteCommunity.data.message);
    //             navigate("/community");
    //         } else {
    //             console.error("Failed to delete community");
    //         }
    //     } catch (err) {
    //         console.error("Error deleting community", err);
    //     } finally {
    //         setPopup(false);
    //     }
    // };

    // useEffect(() => {
    //     if (confirm) {
    //         confirmDelete();
    //     }
    //     setConfirmPopup(false);
    //     setConfirm(false);
    // }, [confirm]);

    return (
        <>
            
            <form onSubmit={handleUpdate} onKeyDown={handleKeyPress} className={`fixed overflow-y-scroll inset-0 h-full flex flex-col justify-center items-center max-lg:px-[2rem] px-[10rem] xl:px-[4rem] z-50 overflow-x-hidden duration-[200ms] ${popup ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
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
                                        src={updateCommunityData?.image}
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
                                onChange={handleBannerChange}
                                accept="image/jpeg, image/png, image/jpg"
                            />
                            <div className="w-full inline-flex justify-center my-2">
                                <div className="max-w-[24rem] w-[24rem] h-[10rem] relative">
                                    <img
                                        src={updateCommunityData?.banner}
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
                            <input type="text" className="bg-lighter-primary mt-1 p-3 font-light text-gray-200 text-base text-opacity-60 focus:outline-none w-full rounded-[10px]" value={updateCommunityData?.name} readOnly></input>
                        </div>
                        {/* description */}
                        <div className="flex flex-col gap-1 mt-4">
                            <label className="mx-1 opacity-80">
                                Description <span></span>
                            </label>
                            <textarea type="text" className="bg-dark-background mt-1 p-3 font-light text-white text-base text-opacity-90 focus:outline-none caret-[#8c8c8c] placeholder-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]" rows="5" placeholder="Description..." onChange={e => handleDescriptionChange(e)} value={updateCommunityData?.desc} required></textarea>
                            <p className="text-end font-light opacity-70 text-[14px]">{updateCommunityData.desc?.length || 0}/{maxCommunityDescription}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" className="border border-red-600 rounded-[20px] text-[16px] font-medium text-red-600 hover:bg-red-600 hover:opacity-80 hover:text-black duration-200 text-opacity-[78%] text-lg py-4 px-6 mt-4 mx-6 mb-6 flex justify-center self-start max-w-[14rem] w-full" onClick={handleDelete}>Delete Community</button>
                        <button type="submit" className="bg-emerald-green rounded-[20px] text-[16px] font-medium text-black text-opacity-[78%] text-lg py-4 px-6 mt-4 mx-6 mb-6 flex justify-center self-end max-w-[10rem] w-full hover:bg-emerald-600 duration-200">Save</button>
                    </div>
                </div>
            </form>
            {confirmPopup && <ConfirmModule setConfirm={setConfirm} name={communityData.name} />}
        </>
    );
}
