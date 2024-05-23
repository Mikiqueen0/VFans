import React from "react";
import { PageButton } from "./index";

export default function LeftSideBar({ name }) {
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
                            <img src="./assets/images/plus.png" alt="" className="h-[0.8rem] mr-2" />
                            News
                        </button>
                        <button className="font-poppins text-white text-sm  text-opacity-[78%] bg-primary rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center">
                        <img src="./assets/images/plus.png" alt="" className="h-[0.8rem] mr-2" />
                            Debut
                        </button>
                        <button className="font-poppins text-black text-sm  text-opacity-[78%] bg-emerald-green rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center ">
                            <img src="./assets/images/minus.png" alt="" className="w-[0.8rem] mr-2" />
                            Meme
                        </button>
                        <button className="font-poppins text-white text-sm  text-opacity-[78%] bg-primary rounded-[20px] py-[0.8rem] px-[0.8rem] flex items-center">
                            <img src="./assets/images/plus.png" alt="" className="w-[0.8rem] mr-2" />
                            Image
                        </button>
                    </div>
                    <button className="font-poppins text-white text-opacity-[78%] rounded-[20px] border-[0.5px] border-emerald-green py-[0.8rem] px-[1.2rem] w-full font-medium text-[14px]">
                        Show more
                    </button>
                </div>
                {/* show community list here */}
                <div className="text-white mb-5 w-full">
                    <div className="flex justify-between mt-[1.25rem] px-[1.2rem] my-2">
                        <p className="font-poppins font-medium text-base text-white text-opacity-90">
                            Community
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}