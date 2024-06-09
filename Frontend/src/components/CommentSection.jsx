import React from 'react'
import useUser from '../hooks/useUser'
import { useEffect, useRef } from 'react'; 
import { useParams } from 'react-router-dom';

export default function CommentSection({ postID }) {
    const { user } = useUser();
    const { section } = useParams();
    const inputRef = useRef(null);

    useEffect(() => {
        if (section === "comments") {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [section]);

    return (
        <div className="text-white text-[14px] font-normal text-opacity-[78%] w-full my-1 bg-primary rounded-b-[10px]">
            <div className="h-[4rem] w-full flex items-center px-4">
                <img src={user?.profileImage} alt="" className="size-[2.75rem] rounded-full"/>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Write a comment..."
                    className="w-full h-[2.75rem] text-white text-opacity-[78%] caret-[#8c8c8c] text-[14px] mx-2 px-3 outline-none bg-dark-field rounded-[10px] placeholder-[#8c8c8c]"
                />
            </div>
        </div>
    )
}