import React from "react";
import { PageButton } from "./index";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/20/solid";
import useUser from "../hooks/useUser";
import useStatus from "../hooks/useStatus";
import useCommunity from "../hooks/useCommunity";
import usePost from "../hooks/usePost";
import { 
	useFetchUserPosts, 
	useFetchAllPosts, 
	useFetchJoinedCommunityPosts, 
	useFetchCommunityPosts 
} from '../hooks/useFetchPost';


export default function LeftSideBar({ name }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { sidebarCommunity, setSidebarCommunity } = useStatus();
	const { posts, selectedTags, setSelectedTags } = usePost();
  const { communityList, setCommunityList } = useCommunity();
  const [userJoinedCommunity, setUserJoinedCommunity] = useState([]);
  const [tagFilter, setTagFilter] = useState([]); //tag list
  const [showtagAll, setShowtagAll] = useState(false);
  useFetchAllPosts();

  const [tagData, setTagData] = useState([]);

	useEffect(() => {
		setSelectedTags(tagFilter);
	}, [tagFilter]);

  const extractUniqueTags = (posts) => {
		const tagsSet = new Set();
		posts.forEach(post => {
			post.tag.forEach(tag => tagsSet.add(tag));
		});
		return Array.from(tagsSet);
	};

  useEffect(() => {
		setTagData(extractUniqueTags(posts));
	}, [user]);

  const displayedTags = showtagAll ? tagData : tagData.slice(0, 4);

  const toggleShowAll = () => {
    setShowtagAll(!showtagAll);
  };

  useEffect(() => {
    if (user && communityList) {
      const userCreateCommunities = communityList.filter(
        (community) => community.userID === user._id
      );
      const userCommunities = communityList.filter((community) =>
        community.members.includes(user._id)
      );
      const combinedCommunitiesSet = new Set([
        ...userCreateCommunities,
        ...userCommunities,
      ]);
      const combinedCommunitiesArray = [...combinedCommunitiesSet]; // Convert Set back to Array
      setUserJoinedCommunity(combinedCommunitiesArray);
    }
  }, [communityList, user?._id]);

  const addTag = (tag) => {
    setTagFilter([...tagFilter, tag]);
  };

  const removeTag = (tag) => {
    let temp = [...tagFilter];
    let index = temp.indexOf(tag);
    if (index !== -1) {
      temp.splice(index, 1);
      setTagFilter(temp);
    }
  };

  return (
    <section
      className={`${
        name === "large"
          ? "px-[2.5rem] border-r border-primary bg-dark-background max-xl:hidden w-[310px] h-[750px] overflow-scroll scrollbar-none sticky top-[6.25rem] z-40"
          : "px-[2.5rem] bg-dark-background pt-[1.25rem]"
      } `}
    >
      <div className="flex flex-col items-start divide-solid divide-y-[1px] divide-primary">
        <div className="flex flex-col items-center w-full">
          <PageButton name="Home" pathName="/home" />
          <PageButton name="Joined Communities" pathName="/joinedCommunities" />
        </div>
        <div className="my-5">
          <h1 className="font-poppins font-medium text-base text-white text-opacity-90 mt-[1.25rem] px-[1.2rem] pb-[0.75rem]">
            Tag
          </h1>
          <div>
            <div className="flex flex-wrap gap-3 mb-3">
              {displayedTags.map((tag, index) => (
                <button
                  type="button"
                  key={index}
                  className={`text-sm font-medium text-${
                    tagFilter.includes(tag) ? "black" : "white"
                  } text-opacity-80 bg-${
                    tagFilter.includes(tag)
                      ? "emerald-green"
                      : "dark-background"
                  } rounded-[20px] py-[0.6rem] px-[0.8rem] flex items-center`}
                  onClick={() =>
                    tagFilter.includes(tag) ? removeTag(tag) : addTag(tag)
                  }
                >
                  {tagFilter.includes(tag) ? (
                    <MinusIcon className="size-6" />
                  ) : (
                    <PlusIcon className="size-6" />
                  )}
                  {tag}
                </button>
              ))}
            </div>
            {tagData.length > 4 && (
              <button
                type="button"
                className="font-poppins text-white text-opacity-[78%] rounded-[20px] border-[0.5px] border-emerald-green py-[0.8rem] px-[1.2rem] w-full font-medium text-[14px]"
                onClick={toggleShowAll}
              >
                {showtagAll ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
        {/* show community list here */}
        <div className="text-white w-full">
          <div className="flex justify-between mt-[1.25rem] px-[1.2rem] my-2">
            <p
              onClick={() => navigate("/community")}
              className="font-poppins font-medium text-base text-white text-opacity-90 hover:underline hover:cursor-pointer"
            >
              Community
            </p>
            {sidebarCommunity ? (
              <div
                className="flex-grow hover:cursor-pointer"
                onClick={() => setSidebarCommunity(!sidebarCommunity)}
              >
                <ChevronUpIcon className="h-5 text-white ml-auto" />
              </div>
            ) : (
              <div
                className="flex-grow hover:cursor-pointer "
                onClick={() => setSidebarCommunity(!sidebarCommunity)}
              >
                <ChevronDownIcon className="h-5 text-white ml-auto" />
              </div>
            )}
          </div>
          {sidebarCommunity && (
            <div className="w-full">
              {userJoinedCommunity.map((community, key) => {
                return (
                  <div
                    key={key}
                    onClick={() => {
                      navigate(`/community/${community._id}`);
                    }}
                    className="w-full h-[3.2rem] px-[1.2rem] text-white text-[13px] flex items-center justify-start gap-2 hover:underline hover:cursor-pointer"
                  >
                    <img
                      src={community.image}
                      alt=""
                      className="rounded-full size-6 bg-emerald-green"
                    />
                    <p>{community.name}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
