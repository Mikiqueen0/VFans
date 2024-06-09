import profileTestIcon from "../assets/images/test-profile.jpg";
import postTestImage from "../assets/images/postImage.png";
import useUser from "../hooks/useUser";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  // const { user, setUser } = useUser();
  const navigate = useNavigate();
  const postCreator = post.userID;
  const postCommunity = post.communityID;

  return (
    <div className="bg-primary rounded-[10px] px-5 py-4">
      <div className="flex justify-between">
        <div className="flex flex-row flex-1 items-center gap-2">
          <img
            src={postCreator.profileImage}
            alt="profile"
            className="rounded-full object-cover size-[1.75rem]"
          />
          <div className="flex flex-row gap-2 max-sm:flex-col max-sm:gap-0 ">
            <p className="font-normal text-[13px]  text-opacity-90 text-white">
              {postCommunity.name}
            </p>
            <p className="font-normal text-[12px] text-opacity-60 text-white">
              Posted by <span className="hover:underline cursor-pointer" onClick={() => navigate(`/profile/${postCreator.username}`)}>{postCreator.username}</span> - {post.createAt}
            </p>
          </div>
        </div>
        <EllipsisHorizontalIcon className="text-white size-6"/>
      </div>
      <div className="flex gap-2 pt-3">
        {post.tag.map((tag, key) => {
          return (
            <button
              key={key}
              className="text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
              {tag}
            </button>
          );
        })}
        {/* <button className="text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
          Meme
        </button>
        <button className="text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
          Image
        </button> */}
      </div>
      <div className="pt-3">
        <p className="text-[14px] font-normal text-opacity-[78%] text-white">
          {post.desc}
        </p>
      </div>
      <div className="rounded-[10px] pt-3">
        <img src={post.image[0]} alt="" />
      </div>
      <div className="flex gap-8 text-[14px] font-medium text-opacity-90 text-white mt-3">
        <button>Like</button>
        <button>Comment</button>
        <button>Save</button>
      </div>
    </div>
  );
}
