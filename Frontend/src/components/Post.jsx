import profileTestIcon from "../assets/images/test-profile.jpg";
import postTestImage from "../assets/images/postImage.png";
import useUser from "../hooks/useUser";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { CommentSection } from "./index";
import FormatTime from "../utils/FormatTime";

export default function Post({ post }) {
  const navigate = useNavigate();
  const postCreator = post.userID;
  const postCommunity = post.communityID;
  const { postID } = useParams();
  
  const handleClickPost = (navigateToPostDetail) => {
    if (navigateToPostDetail) {
      navigate(`/post/${post._id}`);
    } else {
      // Navigate to post detail page with comments focused
      navigate(`/post/${post._id}/comments`);
    }
  };

  return (
    <div>
    <div className={`bg-primary rounded-[10px] px-5 py-4 max-h-[800px] ${postID ? "cursor-default" : "cursor-pointer"}`} onClick={() => handleClickPost(true)}>
      <div className="flex justify-between max-h-[500px]">
        <div className="flex flex-row items-center gap-2">
          <img
            src={postCommunity?.image}
            alt="profile"
            className="rounded-full object-cover size-[1.75rem]"
          />
          <p
            className="font-normal text-[15px] text-opacity-90 text-white hover:underline cursor-pointer"
            onClick={() => navigate(`/community/${postCommunity?._id}`)}
          >
            {postCommunity?.name}
          </p>
          <p className="font-normal text-[12px] text-opacity-60 text-white">
            Posted by{" "}
            <span
              className="hover:underline cursor-pointer"
              onClick={() => navigate(`/profile/${postCreator?.username}`)}
            >
              {postCreator?.username}
            </span>
            <span> - </span>
            <span className="text-opacity-60 text-xs">
              {FormatTime(post?.createdAt)}
            </span>
          </p>
        </div>

        <EllipsisHorizontalIcon className="text-white size-6" />
      </div>
      <div className="flex gap-2 pt-3">
        {Array.isArray(post.tag) && post.tag.map((tag, key) => {
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
      <div className="pt-3">
        <p className="text-[14px] font-normal text-opacity-[78%] text-white">
          {post?.desc}
        </p>
      </div>
      <div
        className={`gap-4 rounded-[10px] pt-3 grid ${
          post.image?.length > 1 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {post.image?.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt=""
            className="rounded-[10px] object-cover w-full h-full cursor-pointer] max-h-[500px]"
          />
        ))}
      </div>
      <div className="flex gap-8 text-[14px] font-medium text-opacity-90 text-white mt-3">
        <button>Like</button>
        <button onClick={(e) => {e.stopPropagation(); handleClickPost(false);}}>Comment</button>
        <button>Save</button>
      </div>
    </div>
    {postID && <CommentSection postID={post._id}/>}
    </div>
  );
}
