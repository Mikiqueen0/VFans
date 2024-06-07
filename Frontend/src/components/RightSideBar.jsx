import React from "react";
import { PageButton } from "./index";

export default function RightSideBar() {
    return (
        <section className="bg-dark-background px-[2.5rem] max-xl:hidden border-l border-primary w-[300px]">
            <div className="flex flex-col sticky top-[6.25rem] w-full">
                {/* <PageButton name="Like" pathName="/like"/>
                <PageButton name="Save" pathName="/save"/> */}
            </div>
        </section>
    );
}
