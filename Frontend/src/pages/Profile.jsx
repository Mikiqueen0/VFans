import { useEffect, useState, useRef, useContext } from "react";
import { NavBar, LeftSideBar, RightSideBar, Post } from "../components/index";
import useStatus from "../hooks/useStatus";
import { useParams, useNavigate } from "react-router-dom";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { FaSpinner } from "react-icons/fa";
import useUser from "../hooks/useUser";
import axios from "axios";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabase";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { profileUsername } = useParams();
  const [profile, setProfile] = useState({});
  const [profileDataCopy, setProfileDataCopy] = useState({});
  const { hamburger, setHamburger } = useStatus();
  const [tab, setTab] = useState("post");
  const [editBio, setEditBio] = useState(false);
  const hamburgerPopupRef = useRef(null);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const fetchProfile = await axios.get(
          `/user/profile/${profileUsername}`,
          { withCredentials: true }
        );
        if (fetchProfile.status) {
          setProfile(fetchProfile.data.user);
          setProfileDataCopy(fetchProfile.data.user);
          setCanEdit(user?._id === fetchProfile.data.user._id);
          console.log(fetchProfile.data.user);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false); // Set loading state to false after fetching profile data
      }
    };
    fetchProfile();
  }, [user]);

  const [changeProfile, setChangeProfile] = useState(false);

  const handleProfileChange = (e) => {
    console.log(e.target.files[0]);
    setProfileDataCopy({
      ...profileDataCopy,
      profileImage: URL.createObjectURL(e.target.files[0]),
    });
    setChangeProfile(true);
    e.target.value = null;
  };

  const handleBannerChange = (e) => {
    console.log(e.target.files[0]);
    setProfileDataCopy({
      ...profileDataCopy,
      profileBanner: URL.createObjectURL(e.target.files[0]),
    });
    setChangeProfile(true);
    e.target.value = null;
  };

  const handleBioChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxProfileBio) {
      setProfileDataCopy({ ...profileDataCopy, bio: value });
    }
  };

  const handleSave = () => {
    setUser(profileDataCopy);
    setChangeProfile(false);
    setEditBio(false);
    console.log("Saved");
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
      <NavBar
        setHamburger={setHamburger}
        hamburger={hamburger}
        hamburgerPopupRef={hamburgerPopupRef}
      />
      <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
        <LeftSideBar name="large" />
        {/* middle section */}
        {loading && (
          <div className="flex h-[calc(100vh-6.25rem)] items-center justify-center gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
            <FaSpinner className="animate-spin text-4xl text-emerald-green" />
          </div>
        )}
        {!loading && (
          <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
            {/* user info */}
            <div
              className={`w-full h-[26rem] min-h-[26rem] rounded-[10px] flex flex-col justify-end relative`}
            >
              <label
                htmlFor="banner-input"
                className="absolute inset-0 w-full h-[85%] pb-20 cursor-pointer"
              >
                <input
                  id="banner-input"
                  type="file"
                  className="hidden"
                  onChange={handleBannerChange}
                  accept="image/jpeg, image/png, image/jpg"
                />
                <div className="w-full h-full relative">
                  <img
                    src={profileDataCopy.profileBanner} // Use a default image or the updated image
                    alt="background"
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[10px]">
                    <PencilIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </label>
              <div className="h-12 w-full backdrop-blur-sm flex items-center">
                <p className="text-[26px] font-bold ml-[10rem] tracking-wide">
                  {profile.username}
                </p>
              </div>
              <div className="relative w-full min-h-[38%] rounded-b-[10px] bg-primary flex flex-col justify-center px-6">
                <div className="size-[8rem] rounded-full border-[0.4rem] border-primary absolute -top-[5.5rem] hover:cursor-pointer">
                  <img
                    src={profileDataCopy.profileImage}
                    alt="profile"
                    className="absolute inset-0 w-full h-full object-cover z-0 rounded-full"
                  />
                </div>
                {/* <PencilIcon className="absolute bg-dark-background ml-[7.2rem] mt-2"/> */}
                {canEdit && (
                  <label htmlFor="file-input" className="relative">
                    <input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={handleProfileChange}
                      accept="image/jpeg, image/png, image/jpg"
                    />
                    <div className="size-8 bg-dark-background p-2 rounded-full ml-[5.7rem] mt-1 absolute cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-full h-full"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                      </svg>
                    </div>
                  </label>
                )}
                <p
                  className="ml-[8.5rem] mt-3 font-light text-[13px] group cursor-pointer"
                  onClick={() =>
                    navigate(`/${profile.username}/joinedCommunity`)
                  }
                >
                  <span className="font-semibold opacity-100 mr-1">279</span>
                  <span className="font-normal opacity-80 tracking-wide group-hover:underline">
                    Communities joined
                  </span>
                </p>
                <div className="mx-[1rem] mt-5 flex-grow flex flex-col gap-1">
                  {editBio ? (
                    // <textarea value={profileDataCopy.userDescription} placeHolder="Description..."></textarea>
                    <div className="flex flex-col w-full">
                      <textarea
                        type="text"
                        className="bg-dark-background p-3 font-light text-white text-[14px] text-opacity-90 focus:outline-none caret-[#8c8c8c] h-[5.5rem] resize-none overscroll-none w-full rounded-[10px]"
                        placeholder="Description..."
                        onChange={(e) => handleBioChange(e)}
                        value={profileDataCopy.bio}
                      ></textarea>
                      <p className="text-end font-light opacity-70 text-[13px] mt-1">
                        {profileDataCopy.bio?.length}/{maxProfileBio}
                      </p>
                    </div>
                  ) : (
                    <p className="font-normal opacity-80 tracking-wide text-[13px]">
                      {profile?.bio ||
                        profileDataCopy.bio ||
                        "No description yet"}
                    </p>
                  )}
                  {!editBio && canEdit && (
                    <p
                      className="text-emerald-green underline text-[14px] text-end cursor-pointer"
                      onClick={() => {
                        setEditBio(true);
                        setChangeProfile(true);
                      }}
                    >
                      Edit Bio
                    </p>
                  )}
                </div>
                {changeProfile && (
                  <div className="flex gap-2 mt-3 justify-end px-[1.5rem]">
                    <button
                      className="border border-emerald-green rounded-[10px] w-[4.4rem] py-[0.35rem] px-2 text-emerald-green text-[14px] hover:bg-emerald-green hover:text-black transition-all duration-200"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="border border-red-500 rounded-[10px] w-[4.4rem] py-[0.35rem] px-2 text-red-500 text-[14px] hover:bg-red-500 hover:text-black transition-all duration-200"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div className="flex ml-[1.5rem] mt-1">
                  <button
                    name="post"
                    onClick={(e) => setTab(e.target.name)}
                    className={`py-2 px-6 hover:bg-lighter-primary transition-all duration-200 ${
                      tab === "post"
                        ? "border-b-2 border-emerald-green"
                        : "border-b-2 border-primary"
                    } `}
                  >
                    Post
                  </button>
                  <button
                    name="like"
                    onClick={(e) => setTab(e.target.name)}
                    className={`py-2 px-6 hover:bg-lighter-primary transition-all duration-200 ${
                      tab === "like"
                        ? "border-b-2 border-emerald-green"
                        : "border-b-2 border-primary"
                    }`}
                  >
                    Like
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 max-md:px-[1.5rem] px-[4rem] text-white">
              <Post username={"test"} />
              <Post username={"test"} />
            </div>
          </section>
        )}
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
      )}
      ;
    </div>
  );
}
