import profileTestIcon from "../assets/images/test-profile.jpg";
import postTestImage from "../assets/images/postImage.png";
import {
  EllipsisHorizontalIcon,
  BookmarkIcon,
  XMarkIcon,
  HeartIcon,
  ChatBubbleBottomCenterIcon
} from "@heroicons/react/20/solid";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CommentSection } from "./index";
import FormatTime from "../utils/FormatTime";
import useUser from "../hooks/useUser";
import useSavedPost from "../hooks/useSavedPost";
import axios from "axios";
import { useState, useEffect } from "react";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { IoMdHeart } from "react-icons/io";
export default function Post({ post }) {
  const location = useLocation();
  const navigate = useNavigate();
  const postCreator = post?.userID;
  const postCommunity = post?.communityID;
  const { postID } = useParams();
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    // Fetch the initial like count
    fetchLikeCount();
    fetchSaveCount();
    fetchCommentCount();
  });

  const fetchLikeCount = async () => {
    try {
      const res = await axios.get(`/like/likeCount/${post?._id}`);
      if (res.data.success) {
        const isPostLiked = res.data.allLike.some((like) => like.userID === user?._id);
        setIsLiked(isPostLiked);
        setLikeCount(res.data.allLike.length);
      }
    } catch (err) {
      console.error("Error fetching save count", err);
    }
  };

  const fetchSaveCount = async () => {
    try {
      const res = await axios.get(`/save/save/${post?._id}`);
      if (res.data.success) {
        const isPostSaved = res.data.allSave.some((save) => save.userID === user?._id);
        setIsSaved(isPostSaved);
        setSaveCount(res.data.allSave.length);
      }
    } catch (err) {
      console.error("Error fetching save count", err);
    }
  };

  const fetchCommentCount = async () => {
    try {
      const res = await axios.get(`/post/commentCount/${post?._id}`);
      if (res.data.success) {
        setCommentCount(res.data.comments);
      }
    } catch (err) {
      console.error("Error fetching comment count", err);
    }
  };

  const handleClickPost = (navigateToPostDetail) => {
    if (navigateToPostDetail) {
      navigate(`/post/${post._id}`);
    } else {
      // Navigate to post detail page with comments focused
      navigate(`/post/${post._id}/comments`);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(`/save/${post._id}`, {
        userID: user._id,
        postID: post._id,
      });
      if (res.data.success) {
        fetchSaveCount();
      }
    } catch (err) {
      console.error("Error saving post", err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(`/like/${post._id}`, {
        userID: user._id,
        postID: post._id,
      });
      if (res.data.success) {
        fetchLikeCount();
      }
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

  const test = () => {
    console.log(post?.userID, user?._id);
  };

  return (
    <div>
      <div
        className={`bg-primary rounded-[10px] px-5 py-4 max-h-[1000px] ${
          postID ? "cursor-default" : "cursor-pointer"
        } relative`}
        onClick={() => handleClickPost(true)}
      >
        <div className="flex justify-between max-h-[500px]">
          <div className="flex flex-row items-center gap-2">
            <img
              src={postCommunity?.image}
              alt="profile"
              className="rounded-full object-cover size-[1.75rem]"
            />
            <p
              className="font-normal text-[15px] text-opacity-90 text-white hover:underline cursor-pointer"
              onClick={(e) => {e.stopPropagation(); navigate(`/community/${postCommunity?._id}`);}}
            >
              {postCommunity?.name}
            </p>
            <p className="font-normal text-[12px] text-opacity-60 text-white">
              Posted by{" "}
              <span
                className="hover:underline cursor-pointer"
                onClick={(e) => {e.stopPropagation(); navigate(`/profile/${postCreator?.username}`);}}
              >
                {postCreator?.username}
              </span>
              <span> - </span>
              <span className="text-opacity-60 text-xs">
                {FormatTime(post?.createdAt)}
              </span>
            </p>
          </div>
          <p>{test}</p>
          {post?.userID === user?._id && <XMarkIcon className="text-white size-6 hover:text-red-500 duration-100" />}
        </div>
        <div className="flex gap-2 pt-3">
          {Array.isArray(post?.tag) &&
            post.tag.map((tag, key) => {
              return (
                <button
                  key={key}
                  className="text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2"
                >
                  {tag}
                </button>
              );
            })}
        </div>
        <div className="py-5">
          <p className="text-[14px] font-normal text-opacity-[78%] text-white">
            {post?.desc}
          </p>
        </div>
        <div
          className={`grid grid-rows-1 ${
            post.image.length > 1 ? "grid-cols-2" : "grid-cols-1"
          } grid-flow-row`}
        >
          {post.image.map((mediaUrl, index) => (
            <div
              key={index}
              className={`${
                index === 2 && post.image.length !== 4 ? "col-span-2" : ""
              }`}
            >
              {typeof mediaUrl === "string" ? (
                mediaUrl.includes("/Image") ? (
                  <img
                    src={mediaUrl}
                    alt="image"
                    className={`h-full w-full object-cover ${
                      post.image.length > 1 ? "max-h-[300px]" : "max-h-[700px]"
                    }`}
                  />
                ) : mediaUrl.includes("/Video") ? (
                  <video
                    src={mediaUrl}
                    controls
                    className="h-full w-full object-contain max-h-[500px]"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white text-opacity-60 text-xl font-normal">
                    Unsupported Media
                  </div>
                )
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white text-opacity-60 text-xl font-normal">
                  No Media Source
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-around gap-8 text-[14px] font-medium text-opacity-90 text-white mt-5">
          <div className="flex items-center">
            <HeartIcon
              className={`size-6 opacity-90 stroke-white stroke-2 cursor-pointer ${
                isLiked ? "fill-emerald-green stroke-emerald-green" : "fill-none"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            />
            <p className="w-6 text-center">{likeCount}</p>
          </div>
          <div className="flex items-center">
            <ChatBubbleBottomCenterIcon
              className={`size-6 opacity-90 stroke-white stroke-2 fill-none cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                handleClickPost(false);
              }}
            />
            <p className="w-6 text-center">{commentCount}</p>
          </div>
          <div className="flex items-center">
            <BookmarkIcon
              className={`size-6 opacity-90 stroke-white stroke-2 cursor-pointer ${
                isSaved ? "fill-white" : "fill-none"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            />
            <p className="w-6 text-center">{saveCount}</p>
          </div>
        </div>
      </div>
      {postID && <CommentSection postID={post._id} />}
    </div>
  );
}
