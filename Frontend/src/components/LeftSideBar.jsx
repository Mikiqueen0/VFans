import React from "react";
import { PageButton } from "./index";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { StatusContext } from "../context/StatusContext";


export default function LeftSideBar({ name }) {
    const { sidebarCommunity, setSidebarCommunity } = useContext(StatusContext);
    const navigate = useNavigate();
    const [communityList, setCommunityList] = useState([
        {
            communityId: 1,
            communityName: "Hahahehehe",
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
        },
        {
            communityId: 6,
            communityName: "Community 6",
            communityImage: ""
        },
        {
            communityId: 7,
            communityName: "Community 7",
            communityImage: ""
        },
        {
            communityId: 8,
            communityName: "Community 8",
            communityImage: ""
        },
        {
            communityId: 9,
            communityName: "Community 9",
            communityImage: ""
        },
        {
            communityId: 10,
            communityName: "Community 10",
            communityImage: ""
        }
    ]);

    return (
        <section className={`${name === "large" ? "px-[2.5rem] border-r border-primary bg-dark-background max-xl:hidden w-[310px] h-[750px] overflow-scroll scrollbar-none sticky top-[6.25rem] z-40" : "px-[2.5rem] bg-dark-background pt-[1.25rem]"} `}>
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
                        <p onClick={() => navigate('/community')} className="font-poppins font-medium text-base text-white text-opacity-90 hover:underline hover:cursor-pointer">
                            Community
                        </p>
                        {sidebarCommunity ? 
                            <div className="flex-grow hover:cursor-pointer" onClick={() => setSidebarCommunity(!sidebarCommunity)} >
                                <ChevronUpIcon className="h-5 text-white ml-auto"/> 
                            </div>
                            : 
                            <div className="flex-grow hover:cursor-pointer " onClick={() => setSidebarCommunity(!sidebarCommunity)} >
                                <ChevronDownIcon className="h-5 text-white ml-auto"/>
                            </div>
                        }
                    </div>
                    {sidebarCommunity && <div className="w-full">
                        {communityList.map((community, key) => {
                            return (
                                <div key={key} onClick={() => {
                                    const formattedCommunityName = community.communityName.replace(/\s+/g, '_'); // Replace spaces with underscores
                                    navigate(`/community/${encodeURIComponent(formattedCommunityName)}`, { state: { communityId: community.communityId } });
                                    }}  className="w-full h-[3.2rem] px-[1.2rem] text-white text-[13px] flex items-center justify-start gap-2 hover:underline hover:cursor-pointer">
                                    <img src="" alt="" className="rounded-full size-6 bg-emerald-green" />
                                    {/* <p onClick={() => navigate.push(`/community/${community.communityId}?showCommunityList=${sidebarCommunity}`)} className="hover:underline">{community.communityName}</p> */}
                                    {/* <p onClick={() => navigate(`/community/${community.communityName}`, { state: { communityId: community.communityId } })} className="hover:underline hover:cursor-pointer">{community.communityName}</p> */}
                                    <p>{community.communityName}</p>
                                </div>
                            );
                        })}
                    </div>}
                </div>
            </div>
        </section>
    );
}