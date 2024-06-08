import profileTestIcon from "../assets/images/test-profile.jpg";
import postTestImage from "../assets/images/postImage.png";
import useUser from "../hooks/useUser";

export default function Post({ username }) {
  const { user, setUser } = useUser();

  return (
    <div className="bg-primary rounded-[10px] px-5 py-4">
      <div className="flex justify-between">
        <div className="flex flex-row flex-1 items-center gap-2">
          <img
            src={profileTestIcon}
            alt="profile"
            className="rounded-full object-cover size-[1.75rem]"
          />
          <div className="flex flex-row gap-2 max-sm:flex-col max-sm:gap-0 ">
            <p className="font-normal text-[13px]  text-opacity-90 text-white">
              English/Hololive/Myth/Gawr_Gura
            </p>
            <p className="font-normal text-[12px] text-opacity-60 text-white">
              Posted by {username} - 1 hour ago
            </p>
          </div>
        </div>
        <p className="text-base font-extrabold text-opacity-90 text-white">
          . . .
        </p>
      </div>
      <div className="flex gap-2 pt-3">
        <button className="text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
          Meme
        </button>
        <button className="text-[12px] font-medium text-opacity-90 text-emerald-green rounded-[10px] border border-emerald-green px-3 py-2">
          Image
        </button>
      </div>
      <div className="pt-3">
        <p className="text-[14px] font-normal text-opacity-[78%] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eos
          cupiditate amet non, laboriosam molestiae quisquam tenetur, laudantium
          id corporis ut quibusdam incidunt. Molestias repellat perferendis
          animi nobis corporis id
        </p>
      </div>
      <div className="rounded-[10px] pt-3">
        <img src={postTestImage} alt="" />
      </div>
      <div className="flex gap-8 text-[14px] font-medium text-opacity-90 text-white mt-3">
        <button>Like</button>
        <button>Comment</button>
        <button>Save</button>
      </div>
    </div>
  );
}
