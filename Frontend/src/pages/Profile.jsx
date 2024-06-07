import { useEffect, useState, useRef, useContext } from "react";
import { NavBar, LeftSideBar, RightSideBar, Post } from "../components/index";
import { StatusContext } from "../context/StatusContext";
import { useParams, useNavigate } from "react-router-dom";
import profileBackground from "../assets/images/profileBackground.png";
import profileTestIcon from "../assets/images/test-profile.jpg";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import useUser from "../hooks/useUser";

export default function Profile() {
  const navigate = useNavigate();
  const username = "Mikiqueen";
  const { profileUsername } = useParams();
  const { hamburger, setHamburger } = useContext(StatusContext);
  const [tab, setTab] = useState("post");
  const [editDescription, setEditDescription] = useState(false);
  const hamburgerPopupRef = useRef(null);
  const [profileData, setProfileData] = useState({
    profileBackground: "",
    profileImage: "",
    userDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aperiam neque minima autem et deserunt alias voluptates earum, ullam corporis temporibus repudiandae",
  });

  const [profileDataCopy, setProfileDataCopy] = useState(profileData);
  const [changeProfile, setChangeProfile] = useState(false);
  const maxProfileDescription = 250;

  const { user, updateUser } = useUser();

  useEffect(() => {
    document.body.style.overflow = hamburger ? "hidden" : "auto";
    document.body.style.paddingRight = hamburger ? "15px" : "0";
  }, [hamburger]);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
    setProfileDataCopy({
      ...profileDataCopy,
      profileImage: URL.createObjectURL(e.target.files[0]),
    });
    setChangeProfile(true);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxProfileDescription) {
      setProfileDataCopy({ ...profileDataCopy, userDescription: value });
    }
  };

  const handleSave = (e) => {
    setProfileData(profileDataCopy);
    console.log(profileDataCopy);
    setChangeProfile(false);
    setEditDescription(false);
    console.log("Saved");
  };

  const handleCancel = (e) => {
    setProfileDataCopy(profileData);
    setChangeProfile(false);
    setEditDescription(false);
    console.log("Cancelled");
  };

  return (
    <div className="bg-dark-background scrollbar-thin">
      <NavBar
        setHamburger={setHamburger}
        hamburger={hamburger}
        hamburgerPopupRef={hamburgerPopupRef}
        username={username}
      />
      <div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
        <LeftSideBar name="large" />
        {/* middle section */}
        <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[4rem] w-[800px] text-white">
          {/* user info */}
          <div
            className={`w-full h-[26rem] min-h-[26rem] rounded-[10px] flex flex-col justify-end relative`}
          >
            <img
              src={profileBackground}
              alt="Profile Background"
              className="absolute inset-0 w-full h-full object-cover pb-20 z-0 rounded-[10px]"
            />
            <div className="h-12 w-full backdrop-blur-sm flex items-center">
              <p className="text-[26px] font-bold ml-[10rem] tracking-wide">
                {profileUsername}
              </p>
            </div>
            <div className="relative w-full min-h-[34%] rounded-b-[10px] bg-primary flex flex-col">
              <div className="size-[8rem] rounded-full border-[0.4rem] border-primary absolute -top-[5.5rem] ml-[1.5rem] hover:cursor-pointer">
                <img
                  src={profileTestIcon}
                  alt="profile"
                  className="absolute inset-0 w-full h-full object-cover z-0 rounded-full"
                />
              </div>
              {/* <PencilIcon className="absolute bg-dark-background ml-[7.2rem] mt-2"/> */}
              <label htmlFor="file-input" className="relative">
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e)}
                  accept="image/jpeg, image/png, image/jpg"
                />
                <div className="size-8 bg-dark-background p-2 rounded-full ml-[7.2rem] mt-1 absolute cursor-pointer">
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
              <p
                className="ml-[10rem] mt-3 font-light text-[13px] group cursor-pointer"
                onClick={() => navigate(`/${profileUsername}/joinedCommunity`)}
              >
                <span className="font-semibold opacity-100 mr-1">279</span>
                <span className="font-normal opacity-80 tracking-wide group-hover:underline">
                  Communities joined
                </span>
              </p>
              <div className="ml-[1.5rem] mr-[2.5rem] mt-4 flex-grow flex items-center justify-between gap-2">
                {editDescription ? (
                  // <textarea value={profileDataCopy.userDescription} placeHolder="Description..."></textarea>
                  <div className="flex flex-col w-full">
                    <textarea
                      type="text"
                      className="bg-dark-background p-3 font-light text-white text-[14px] text-opacity-90 focus:outline-none caret-[#8c8c8c] resize-none overscroll-none w-full rounded-[10px]"
                      rows="3"
                      placeholder="Description..."
                      onChange={(e) => handleDescriptionChange(e)}
                      value={profileDataCopy.userDescription}
                    ></textarea>
                    <p className="text-end font-light opacity-70 text-[13px] mt-1">
                      {profileDataCopy.userDescription.length}/
                      {maxProfileDescription}
                    </p>
                  </div>
                ) : (
                  <p className="font-normal opacity-80 tracking-wide text-[13px]">
                    {profileData.userDescription ||
                      profileDataCopy.userDescription ||
                      "No description yet"}
                  </p>
                )}
                {!editDescription && (
                  <p
                    className="text-emerald-green underline text-[14px] text-end cursor-pointer"
                    onClick={() => {
                      setEditDescription(true);
                      setChangeProfile(true);
                    }}
                  >
                    edit
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
          <div className="flex flex-col gap-3 max-md:px-[1.5rem] px-[1rem] text-white">
            <Post username={profileUsername} />
            <Post username={profileUsername} />
          </div>
        </section>
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
    </div>
  );
}
