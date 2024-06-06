import React from "react";
import { PageButton } from "./index";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { StatusContext } from "../context/StatusContext";

export default function LeftSideBar({ name }) {
    const { sidebarCommunity, setSidebarCommunity } = useContext(StatusContext);
    // const [showCommunityList, setShowCommunityList] = useState(false);
    const [communityList, setCommunityList] = useState([
        {
            communityId: 1,
            communityName: "Community 1",
            communityImage: ""
        },
        {
            communityId: 2,
            communityName: "Community 2",
            communityImage: ""
        },
        {
            communityId: 3,
            communityName: "Community 3",
            communityImage: ""
        },
        {
            communityId: 4,
            communityName: "Community 4",
            communityImage: ""
        },
        {
            communityId: 5,
            communityName: "Community 5",
            communityImage: ""
        }
    ]);

    return (
        <section className={`${name === "large" ? "px-[2.5rem] border-r border-primary bg-dark-background max-xl:hidden w-[300px] h-full sticky top-[6.25rem] z-40" : "px-[2.5rem] bg-dark-background pt-[1.25rem]"}`}>
            <div className="flex flex-col items-start divide-solid divide-y-[1px] divide-primary">
                <div className="flex flex-col items-center w-full">
                    <PageButton name="Home" pathName="/home" />
                    <PageButton name="Joined Communities" pathName="/joinedCommunities" />
                </div>
                <div className="my-5">
                    <h1 className="font-poppins font-medium text-base text-white text-opacity-90 mt-[1.25rem] px-[1.2rem]">
                        Tag
                    </h1>
                    <div className="flex flex-wrap gap-2 my-[1.5rem]">
                        <button className="font-poppins text-white text-sm text-opacity-[78%] bg-primary rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center">
                            {/* <img src="./assets/images/plus.png" alt="" className="h-[0.8rem] mr-2" /> */}
                            <PlusIcon className="h-5 mr-1 text-white" />
                            News
                        </button>
                        <button className="font-poppins text-white text-sm  text-opacity-[78%] bg-primary rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center">
                            <PlusIcon className="h-5 mr-1 text-white" />
                            Debut
                        </button>
                        <button className="font-poppins text-black text-sm  text-opacity-[78%] bg-emerald-green rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center ">
                            <MinusIcon className="h-5 mr-1 text-black" />
                            Meme
                        </button>
                        <button className="font-poppins text-white text-sm  text-opacity-[78%] bg-primary rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center">
                            <PlusIcon className="h-5 mr-1 text-white" />
                            Image
                        </button>
                    </div>
                    <button className="font-poppins text-white text-opacity-[78%] rounded-[20px] border-[0.5px] border-emerald-green py-[0.8rem] px-[1.2rem] w-full font-medium text-[14px]">
                        Show more
                    </button>
                </div>
                {/* show community list here */}
                <div className="text-white w-full">
                    <div className="flex justify-between mt-[1.25rem] px-[1.2rem] my-2">
                        <Link to={`/community`} className="font-poppins font-medium text-base text-white text-opacity-90 hover:underline">
                            Community
                        </Link>
                        {sidebarCommunity ? 
                            <ChevronUpIcon className="h-5 text-white hover:cursor-pointer" onClick={() => setSidebarCommunity(!sidebarCommunity)} /> 
                            : <ChevronDownIcon className="h-5 text-white hover:cursor-pointer" onClick={() => setSidebarCommunity(!sidebarCommunity)} />}
                    </div>
                    {sidebarCommunity && <div className="w-full">
                        {communityList.map((community, key) => {
                            return (
                                <div key={key} className="w-full h-[3.2rem] px-[1.2rem] text-white text-[13px] flex items-center justify-center gap-2">
                                    <img src="" alt="" className="rounded-full size-6 bg-emerald-green" />
                                    <Link to={`/community/${community.communityId}?showCommunityList=${sidebarCommunity}`} className="hover:underline">{community.communityName}</Link>
                                </div>
                            );
                        })}
                    </div>}
                </div>
            </div>
        </section>
    );
}