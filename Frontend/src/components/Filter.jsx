import React from 'react'
import topIcon from "../assets/images/top.png";
import newIcon from "../assets/images/new.png";

export default function Filter() {
    return (
        <div className="box-border flex flex-row items-center bg-primary rounded-[10px] font-medium px-4 py-2">
            <button className="mr-8 flex items-center gap-1 text-white font-normal text-base text-opacity-[78%] hover:text-opacity-90">
                <img src={topIcon} alt="top" className="h-[1.5rem]" />
                Top
            </button>
            <button className="mr-8 flex items-center gap-1 text-white font-normal text-base text-opacity-[78%] hover:text-opacity-90">
                <img src={newIcon} alt="new" className="h-[1.5rem]" />
                New
            </button>
        </div>
    )
}
