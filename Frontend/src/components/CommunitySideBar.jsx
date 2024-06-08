import React from "react";
import { PageButton } from "./index";

export default function CommunitySideBar({ communityData }) {
    // const communityName = "Community 1";
    return (
        <section className="bg-dark-background px-[2.5rem] max-xl:hidden border-l border-primary w-[300px]">
            <div className="flex flex-col sticky top-[6.25rem] w-full text-white">
                <div className="flex flex-col gap-1">
                    <h1 className="font-medium py-3">Description</h1>
                    <p className="text-[14px] opacity-80">{communityData.desc}</p>
                </div>
            </div>
        </section>
    );
}
