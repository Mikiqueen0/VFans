import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
	NavBar,
	LeftSideBar,
	RightSideBar,
	Post,
	CreatePostPopup,
	Filter,
} from "../components/index";
import profileTestIcon from "../assets/images/dummyProfile.png";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import useUser from "../hooks/useUser";
import useStatus from "../hooks/useStatus";
import usePost from "../hooks/usePost";
import { 
	useFetchUserPosts, 
	useFetchAllPosts, 
	useFetchJoinedCommunityPosts, 
	useFetchCommunityPosts 
} from '../hooks/useFetchPost';

export default function JoinedCommunities() {
	const { user, setUser } = useUser();
	const { loading, setLoading, hamburger, setHamburger } = useStatus();
	const [popup, setPopup] = useState(false);
	const [cookies, removeCookie] = useCookies([]);
	const [smallLoading, setSmallLoading] = useState(true);
	const hamburgerPopupRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();
    const { userID } = useParams();
	const { setPosts, filteredPosts } = usePost();
	const [refresh, setRefresh] = useState(false);
    // const { fetchJoinedCommunityPosts } = useFetchJoinedCommunityPosts(userID);
	// useFetchJoinedCommunityPosts(user?._id, refresh);
	// const [posts, setPosts] = useState([]);

	useEffect(() => {
		setSmallLoading(false);
		window.onload = () => {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		};
	}, []);

    // useEffect(() => {
    //     fetchJoinedCommunityPosts();
    // }, [popup]);

	// useEffect(() => {
	// 	setRefresh((prev) => !prev);
    //     // console.log(filteredPosts.map((post) => post.communityID.name));
    //     const cleanCommunity = new Set(filteredPosts.map((post) => post.communityID.name));
    //     const arrayClean = Array.from(cleanCommunity);
    //     console.log(arrayClean);
	// }, [popup, location.pathname]);

	const fetchJoinedCommunity = async () => {
		setSmallLoading(true);
		try {
			const { data: fetchJoinedCommunityData } = await axios.get(`/post/user/community/${userID}`);
			if(fetchJoinedCommunityData.success){
				setPosts(fetchJoinedCommunityData.posts);
			}
		} catch (err) {
			console.error("Error fetching community data", err);
		} finally {
			setSmallLoading(false);
		}
	};

	useEffect(() => {
		fetchJoinedCommunity();
	}, [popup, location.pathname]);

	useEffect(() => {
		document.body.style.overflow = popup ? "hidden" : "auto";
		document.body.style.paddingRight = popup ? "15px" : "0";
	}, [popup]);

	useEffect(() => {
		document.body.style.overflow = hamburger ? "hidden" : "auto";
		document.body.style.paddingRight = hamburger ? "15px" : "0";
	}, [hamburger]);

	return (
		<div className="bg-dark-background scrollbar-thin">
		<NavBar
			setHamburger={setHamburger}
			hamburger={hamburger}
			hamburgerPopupRef={hamburgerPopupRef}
		/>
		<div className="flex flex-row justify-center min-h-[100vh] pt-[1.25rem] pb-[1.25rem] z-40">
			<LeftSideBar name="large" />
			{/* middle section */}
			{smallLoading && 
				<div className="flex h-[calc(100vh-6.25rem)] items-center justify-center gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
					<FaSpinner className="animate-spin text-4xl text-emerald-green" />
				</div>
			}
			{!smallLoading && <section className="flex flex-col gap-3 max-sm:px-[1rem] px-[4rem] w-[800px]">
			{/* filter */}
			<Filter />
			{/* Create Post */}
			{user && 
				<div className="bg-primary rounded-[10px] px-5 py-2">
					<div className="flex items-center">
					<img
						src={user?.profileImage}
						alt="profile"
						className="rounded-full object-cover size-[2.5rem] max-lg:h-[2.5rem]"
					/>
					<textarea
						readOnly
						placeholder="Create Post"
						className="font-normal text-white text-base text-opacity-90 bg-transparent focus:outline-none caret-[#8c8c8c] border-b border-white border-opacity-10 pt-4 ml-3 w-full h-[3.2rem] box-border resize-none overflow-hidden cursor-text"
						onClick={() => setPopup(true)}
					/>
					</div>
				</div>
			}
			{/* display post */}
			{filteredPosts?.length === 0 ? 
				(<div className="text-white text-center opacity-70 mt-4">No post found . . .</div>)
				: 
				(Array.isArray(filteredPosts) && filteredPosts.map((post, key) => {
					return <Post key={key} post={post}/>;
				}))
			}
			</section>}
			<RightSideBar />
		</div>
		{/* popup when click create post */}
		{popup && <div className={`fixed inset-0 backdrop-brightness-50 backdrop-blur-[1px] z-50`}></div>}
		{user && 
		<CreatePostPopup
			setPopup={setPopup}
			popup={popup}
		/>
		}
		{hamburger && (
			<div className="fixed overflow-y-scroll inset-0 h-full backdrop-brightness-50 backdrop-blur-[1px] flex flex-col items-start z-40 xl:hidden">
				<div
					className="bg-dark-background h-full w-[400px] flex flex-col mt-[5rem]"
					ref={hamburgerPopupRef}
				>
					<LeftSideBar name="small" />
				</div>
			</div>
		)}

		<ToastContainer />
		</div>
	);
}
