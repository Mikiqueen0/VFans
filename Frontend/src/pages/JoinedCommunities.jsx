import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	NavBar,
	LeftSideBar,
	RightSideBar,
	Post,
	CreatePostPopup,
	Filter
} from "../components/index";
// import { StatusContext } from "../context/StatusContext";
import profileTestIcon from "../assets/images/dummyProfile.png";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useUser from "../hooks/useUser";
import useStatus from "../hooks/useStatus";

export default function JoinedCommunities() {
	const { user, setUser } = useUser();
	const [popup, setPopup] = useState(false); //popup create post in detail when click create post at home page
	const [cookies, removeCookie] = useCookies([]);
	const hamburgerPopupRef = useRef(null);
	const { hamburger, setHamburger } = useStatus();
	const navigate = useNavigate();

	useEffect(() => {
		const verifyCookie = async () => {
			if (!cookies.token) {
				navigate("/login");
			}
		};
		verifyCookie();
	}, [cookies, navigate, removeCookie]);

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
			<section className="flex flex-col gap-3 max-sm:px-[1rem] px-[4rem] w-[800px]">
			{/* filter */}
			<Filter />
			{/* Create Post */}
			<div className="bg-primary rounded-[10px] px-5 py-2">
				<div className="flex items-center">
				<img
					src={user.image}
					alt="profile"
					className="rounded-full object-cover h-[2.5rem] max-lg:h-[2.5rem]"
				/>
				<textarea
					readOnly
					placeholder="Create Post"
					className="font-normal text-white text-base text-opacity-90 bg-transparent focus:outline-none caret-[#8c8c8c] border-b border-white border-opacity-10 pt-4 ml-3 w-full h-[3.2rem] box-border resize-none overflow-hidden cursor-text"
					onClick={() => setPopup(true)}
				/>
				</div>
			</div>
			{/* display post */}
			<Post username={user.username} />
			<Post username={user.username} />
			<Post username={user.username} />
			</section>
			<RightSideBar />
		</div>
		{/* popup when click create post */}
		{popup && <div className={`fixed inset-0 backdrop-brightness-50 backdrop-blur-[1px] z-50`}></div>}
		<CreatePostPopup
			setPopup={setPopup}
			popup={popup}
		/>
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