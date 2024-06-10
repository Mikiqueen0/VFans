import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	NavBar,
	LeftSideBar,
	RightSideBar,
	Post,
	CreatePostPopup,
	Filter,
    CommentSection
} from "../components/index";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import useUser from "../hooks/useUser";
import useStatus from "../hooks/useStatus";


export default function FullPost() {
	const { user, setUser } = useUser();
	const { hamburger, setHamburger } = useStatus();
	const [popup, setPopup] = useState(false);
	const [cookies, removeCookie] = useCookies([]);
	const [loading, setLoading] = useState(true);
	const hamburgerPopupRef = useRef(null);
	const navigate = useNavigate();
    const { postID } = useParams();
	const [post, setPost] = useState({});
    

	useEffect(() => {
		window.onload = () => {
			setLoading(false);
		};
	}, []);

	const fetchPostByID = async () => {
		setLoading(true);
		try {
			const { data: fetchPostData } = await axios.get(`/post/${postID}`);
			if(fetchPostData.success){
				setPost(fetchPostData.posts);
			}
		} catch (err) {
			console.error("Error fetching post data", err);
		} finally {
			setLoading(false);
		}
	};

    useEffect(() => {
        fetchPostByID();
    }, []);

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
			{loading ? (
				<div className="flex h-[calc(100vh-6.25rem)] items-center justify-center gap-3 max-sm:px-[1rem] px-[1rem] w-[800px] text-white">
					<FaSpinner className="animate-spin text-4xl text-emerald-green" />
				</div>
			) :
			(<section className="flex flex-col gap-3 max-sm:px-[1rem] px-[4rem] w-[800px]">
                {/* Back button */}
                <div className="box-border flex flex-row items-center bg-primary rounded-[10px] font-medium px-4 py-2">
                    <button className="mr-8 flex items-center" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6 text-white opacity-90">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
                {/* display post */}
                <Post post={post} userData={user}/>
            </section>)}
			<RightSideBar />
		</div>
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
