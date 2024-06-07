import React from "react";
import { PageButton } from "./index";

export default function CommunitySideBar({ communityId }) {
    const communityName = "Community 1";
    return (
        <section className="bg-dark-background px-[2.5rem] max-xl:hidden border-l border-primary w-[300px]">
            <div className="flex flex-col sticky top-[6.25rem] w-full text-white">
                <div className="flex flex-col gap-1">
                    <h1 className="font-medium py-3">{communityName} (description)</h1>
                    <p className="text-[14px] opacity-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi iusto perspiciatis quod aliquid, ipsam pariatur libero aliquam beatae consequuntur corrupti! Ut, minus laudantium? Fugiat eius ab cupiditate dolor optio assumenda?</p>
                </div>
                {/* <PageButton name="Like" pathName="/like"/>
                <PageButton name="Save" pathName="/save"/> */}
            </div>
        </section>
    );
}
