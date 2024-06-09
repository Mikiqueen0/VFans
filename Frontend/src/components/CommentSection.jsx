import React from 'react'
import useUser from '../hooks/useUser'
import { useEffect, useRef, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import FormatTime from "../utils/FormatTime";
import axios from 'axios';

export default function CommentSection({ postID }) {
    const navigate = useNavigate();
    const { user } = useUser();
    const { section } = useParams();
    const inputRef = useRef(null);
    const [commentField, setCommentField] = useState("");
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data: fetchCommentsData } = await axios.get(`/post/comment/${postID}`);
                if(fetchCommentsData.success){
                    setAllComments(fetchCommentsData.comments);
                }
            } catch (err) {
                console.error("Error fetching comments", err);
            }
        };
        fetchComments();
    }, []);

    useEffect(() => {
        if (section === "comments") {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [section]);

    const handleCommentSubmit = async () => {
        try {
            await axios.post(`/post/comment`, {
                userID: user._id,
                postID: postID,
                content: commentField
            });
        } catch (err) {
            console.error("Error submitting comment", err);
        } finally {
            setCommentField("");
        };
    };

    return (
        <div className="text-white text-[14px] font-normal text-opacity-[78%] w-full my-1 bg-primary rounded-b-[10px]">
            {/* user comment field */}
            <div className="h-[4rem] w-full flex items-center px-4">
                <img src={user?.profileImage} alt="" className="size-[2.75rem] rounded-full"/>
                <input
                    type="text"
                    ref={inputRef}
                    value={commentField}
                    onChange={(e) => setCommentField(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full h-[2.75rem] text-white text-opacity-[78%] caret-[#8c8c8c] text-[14px] mx-2 px-3 outline-none bg-dark-field rounded-[10px] placeholder-[#8c8c8c]"
                />
                <PaperAirplaneIcon className="size-[2rem] text-emerald-green hover:text-emerald-500/70 duration-100 cursor-pointer" onClick={handleCommentSubmit}/>
            </div>
            {/* load comments here */}
            {allComments.map((comment, key) => {
                return (
                    <div key={key} className="h-[5rem] w-full flex items-center px-4">
                        <img src={comment.userID?.profileImage} alt="" className="size-[2.75rem] rounded-full"/>
                        <div className="w-full flex flex-col gap-1 items-start text-white text-opacity-[78%] text-[14px] mx-2 px-1 py-2">
                            <div className="flex items-center gap-1 text-white text-opacity-60">
                                <p className="text-white text-opacity-90 hover:underline cursor-pointer" onClick={() => navigate(`/profile/${comment.userID.username}`)}>
                                    {comment.userID.username}
                                </p>
                                <p className="">-</p>
                                <p className="text-xs">
                                    {FormatTime(comment.createdAt)}
                                </p>
                            </div>
                            <p className="">{comment.content}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}