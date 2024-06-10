import { useEffect, useState, useRef, useContext } from "react";
import { NavBar, LeftSideBar, RightSideBar, Post } from "../components/index";
import { useParams, useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/solid";
import { FaSpinner } from "react-icons/fa";
import useUser from "../hooks/useUser"; 
import useStatus from "../hooks/useStatus";
import useCommunity from "../hooks/useCommunity"; 
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabase";
import usePost from "../hooks/usePost";
import { 
	useFetchUserPosts, 
	useFetchAllPosts, 
	useFetchJoinedCommunityPosts, 
	useFetchCommunityPosts 
} from '../hooks/useFetchPost';

export default function Profile() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const { communityList } = useCommunity();
    const { setPosts, filteredPosts } = usePost();
    const { profileUsername } = useParams();
    const [profile, setProfile] = useState({});
    const [profileDataCopy, setProfileDataCopy] = useState({});
    const { hamburger, setHamburger } = useStatus();
    const [tab, setTab] = useState("post");
    const [editBio, setEditBio] = useState(false);
    const hamburgerPopupRef = useRef(null);
    const [canEdit, setCanEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [communityJoined, setCommunityJoined] = useState([]);
    // useFetchUserPosts(profileUsername);

    useEffect(() => {
        document.body.style.overflow = hamburger ? "hidden" : "auto";
        document.body.style.paddingRight = hamburger ? "15px" : "0";
        
    }, [hamburger]);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const fetchProfile = await axios.get(`/user/profile/${profileUsername}`, { withCredentials: true });
            if(fetchProfile.status){
                setProfile(fetchProfile.data.user);
                setProfileDataCopy(fetchProfile.data.user);
                setCanEdit(user._id === fetchProfile.data.user._id);
                const userCommunities = communityList.filter(community => {
                    return community.members.includes(fetchProfile.data.user._id);
                });
                setCommunityJoined(userCommunities);
            }else{
                console.error('Failed to fetch user profile');
            }
        } catch (err) {
            console.error("Error fetching profile", err);
        } finally {
        }
    };

    const fetchPosts = async () => {
        try {
            const fetchPosts = await axios.get(`/post/user/${profileUsername}`);
            if(fetchPosts.status){
                setPosts(fetchPosts.data.posts);
            }else{
                console.error('Failed to fetch user posts');
            }
        } catch (err) {
            console.error("Error fetching posts", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, [user, profileUsername]);
    
    const[changeProfile, setChangeProfile] = useState(false);

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        setProfileDataCopy({ ...profileDataCopy, profileImage: URL.createObjectURL(e.target.files[0])});
        setChangeProfile(true);
        setProfileFile(file);
        e.target.value = null;
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        setProfileDataCopy({ ...profileDataCopy, profileBanner: URL.createObjectURL(e.target.files[0])});
        setChangeProfile(true);
        setBannerFile(file);
        e.target.value = null;
    };

    const handleBioChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxProfileBio) {
            setProfileDataCopy({ ...profileDataCopy, bio: value});
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

    
    const handleSave = async () => {
        setLoading(true);
        try {
            let updatedProfile = { ...profileDataCopy };
            if (bannerFile) {
                const updatedProfileBanner = await uploadFile(bannerFile);
                setBannerFile(null);
                updatedProfile = { ...updatedProfile, profileBanner: updatedProfileBanner };
            }

            if(profileFile) {
                const updatedProfileImage = await uploadFile(profileFile);
                setProfileFile(null);
                updatedProfile = { ...updatedProfile, profileImage: updatedProfileImage };
            }

            setUser(updatedProfile);
        } catch (error) {
            console.log("Error saving profile changes:", error);
        } finally {
            setProfileDataCopy(user);
            setLoading(false);
            setChangeProfile(false);
            setEditBio(false);
        }
    };

    const handleCancel = () => {
        setProfileDataCopy(user);
        setChangeProfile(false);
        setEditBio(false);
        console.log("Cancelled");
    };

    const maxProfileBio = 250;

    return (
        <div className="bg-dark-background scrollbar-thin">
            <NavBar setHamburger={setHamburger} hamburger={hamburger} hamburgerPopupRef={hamburgerPopupRef} />
            <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
                <LeftSideBar name="large" />
                {/* middle section */}
                {loading && 
                    <div className="flex h-[calc(100vh-6.25rem)] items-center justify-center gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
                        <FaSpinner className="animate-spin text-4xl text-emerald-green" />
                    </div>
                }
                {!loading && <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
                    {/* user info */}
                    <div className={`w-full h-[24rem] rounded-[10px] flex flex-col justify-end relative cursor-pointer`}>
                        {!canEdit ? (
                            <div className="w-full h-full relative border border-red-500">
                                <img
                                    src={profileDataCopy.profileBanner}
                                    alt="background"
                                    className="w-full h-full object-cover rounded-[10px]"
                                />
                            </div>
                        ) 
                        : 
                        (
                            <label htmlFor="banner-input" className="absolute inset-0 w-full h-[85%] pb-20 cursor-pointer">
                                <input
                                    id="banner-input"
                                    type="file"
                                    className="hidden"
                                    onChange={handleBannerChange}
                                    accept="image/jpeg, image/png, image/jpg"
                                />
                                <div className="w-full h-full relative">
                                    <img
                                        src={profileDataCopy.profileBanner}
                                        alt="background"
                                        className="w-full h-full object-cover rounded-[10px]"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[10px]">
                                        <PencilIcon className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </label>
                        )}
                        {/* <div className="h-12 w-full backdrop-blur-sm flex items-center">
                            <p className="text-[26px] font-bold ml-[10rem] tracking-wide">
                                {profile.username}
                            </p>
                        </div> */}
                        <div className="relative w-full min-h-[38%] rounded-b-[10px] bg-primary flex flex-col justify-center px-6">
                            <p className="text-[26px] font-bold ml-[8.5rem] mt-2 tracking-wide">
                                {profile.username}
                            </p>
                            {!canEdit ? (
                                <div className="size-[8rem] rounded-full border-[0.4rem] border-primary absolute -top-[3.5rem] hover:cursor-pointer">
                                    <img
                                        src={profileDataCopy.profileImage}
                                        alt="profile"
                                        className="absolute inset-0 w-full h-full object-cover z-0 rounded-full"
                                    />
                                </div>
                            )
                            :
                            (
                                <label htmlFor="file-input" className="relative -top-[6rem]">
                                    <input
                                        id="file-input"
                                        type="file"
                                        className="hidden"
                                        onChange={handleProfileChange}
                                        accept="image/jpeg, image/png, image/jpg"
                                    />
                                    <div className="size-[8rem] rounded-full border-[0.4rem] border-primary absolute hover:cursor-pointer">
                                        <img
                                            src={profileDataCopy.profileImage}
                                            alt="profile"
                                            className="absolute inset-0 w-full h-full object-cover z-0 rounded-full"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                                            <PencilIcon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </label>
                            )}
                            <p className="ml-[8.5rem] mt-1 font-light text-[13px] group cursor-pointer" onClick={() => navigate(`/${profile.username}/joinedCommunities`)}>
                                <span className="font-semibold opacity-100 mr-1">{communityJoined.length || 0}</span>
                                <span className="font-normal opacity-80 tracking-wide group-hover:underline">Communities joined</span>
                            </p>
                            <div className="mx-[1rem] mt-4 flex-grow flex flex-col gap-1">
                                {editBio ? 
                                    <div className="flex flex-col w-full">
                                        <textarea type="text" className="bg-dark-background p-3 font-light text-white text-[14px] text-opacity-90 focus:outline-none caret-[#8c8c8c] placeholder-[#8c8c8c] h-[5.5rem] resize-none overscroll-none w-full rounded-[10px]" placeholder="Description..." onChange={e => handleBioChange(e)} value={profileDataCopy.bio}></textarea>
                                        <p className="text-end font-light opacity-70 text-[13px] mt-1">{profileDataCopy.bio?.length}/{maxProfileBio}</p>
                                    </div>
                                    : <p className="font-normal opacity-80 tracking-wide text-[13px]">
                                        {profile?.bio || profileDataCopy.bio || "No description yet"}
                                    </p>
                                }
                                {!editBio && canEdit && 
                                    (<p className="text-emerald-green underline text-[14px] text-end cursor-pointer" onClick={() => {setEditBio(true); setChangeProfile(true);}}>Edit Bio</p>)
                                }
                            </div>
                            {changeProfile && 
                                <div className="flex gap-2 mt-3 justify-end px-[1.5rem]">
                                    <button className="border border-emerald-green rounded-[10px] w-[4.4rem] py-[0.35rem] px-2 text-emerald-green text-[14px] hover:bg-emerald-green hover:text-black transition-all duration-200" onClick={handleSave}>Save</button>
                                    <button className="border border-red-500 rounded-[10px] w-[4.4rem] py-[0.35rem] px-2 text-red-500 text-[14px] hover:bg-red-500 hover:text-black transition-all duration-200" onClick={handleCancel}>Cancel</button>
                                </div>
                            }
                            <div className="flex ml-[1.5rem] mt-1">
                                <button name="post" onClick={(e) => setTab(e.target.name)} className={`py-2 px-6 hover:bg-lighter-primary transition-all duration-200 ${tab === "post" ? 
                                "border-b-2 border-emerald-green" : "border-b-2 border-primary"} `}>Post</button>
                                <button name="like" onClick={(e) => setTab(e.target.name)} className={`py-2 px-6 hover:bg-lighter-primary transition-all duration-200 ${tab === "like" ? 
                                "border-b-2 border-emerald-green" : "border-b-2 border-primary"}`}>Like</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 max-md:px-[1.5rem] px-[4rem] text-white">
                        {filteredPosts?.length === 0 ? 
                            (<div className="text-white text-center opacity-70 mt-4">No post found . . .</div>)
                            : 
                            (filteredPosts?.map((post, key) => {
                                return <Post key={key} post={post}/>;
                            }))
                        }
                    </div>
                </section>}
                <RightSideBar />
            </div>
            {hamburger && (
            <div className="fixed overflow-y-scroll inset-0 h-full backdrop-brightness-50 backdrop-blur-[1px] flex flex-col items-start z-40 xl:hidden">
                <div
                    className="bg-dark-background h-full w-[400px] flex flex-col mt-[5rem]"
                    ref={hamburgerPopupRef}
                >
                    <LeftSideBar name="small" />
                </div>
                </div>
            )};
        </div>
        
    );
}
