import { useRef, useState, useEffect, Fragment } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, BookmarkIcon, ArrowLeftEndOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid";
import logo from "../assets/images/white-vfans.png";
import searchIcon from "../assets/images/search.png";
import profileTestIcon from "../assets/images/test-profile.jpg";
import profileIcon from "../assets/images/profile.png";
import settingIcon from "../assets/images/setting.png";
import logoutIcon from "../assets/images/logout.png";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser"; 
import useStatus from "../hooks/useStatus"; 
import usePost from "../hooks/usePost"; 
import { LoadingScreen } from "./index";

export default function NavBar({
	setHamburger,
	hamburger,
	hamburgerPopupRef
	}) {
	const navigate = useNavigate();
	const location = useLocation();
	const hamburgerButtonRef = useRef(null);
	const genericHamburgerLine = `h-[0.14rem] w-8 my-1 rounded-full bg-white transition ease transform duration-300`;
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const { user, setUser } = useUser();
	const { loading, setLoading } = useStatus();
	const { logout } = useAuth();
	const [searchField, setSearchField] = useState("");
	const { searchKeyword, setSearchKeyword } = usePost();

	const handleSearch = (e) => {
        if(e.key === 'Enter') {
			setSearchKeyword(searchField);
			setSearchField('');
		}
    };

	useEffect(() => {
		setSearchKeyword('');
	}, [location.pathname]);

	useEffect(() => {
		if (user) {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		const handleClickOutside = (e) => {
		if (
			hamburgerPopupRef.current &&
			!hamburgerPopupRef.current.contains(e.target) &&
			!hamburgerButtonRef.current.contains(e.target)
		) {
			setHamburger(false);
		}
		};

		const handleResize = () => {
		if (window.innerWidth >= 1280) {
			setHamburger(false);
		}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("resize", handleResize);

		return () => {
		document.removeEventListener("mousedown", handleClickOutside);
		window.removeEventListener("resize", handleResize);
		};
	}, [hamburgerPopupRef, setHamburger]);

	const printUser = () => {
		console.log(user);
	};

	useEffect(() => {
		document.body.style.overflow = loading ? "hidden" : "auto";
	}, [loading]);

	return (loading ? <LoadingScreen /> :
		<nav className="sticky top-0 bg-primary grid grid-cols-[30%_40%_30%] max-sm:grid-cols-[20%_60%_20%] justify-between items-center h-[5rem] z-50">
			<div className="ml-[5rem] max-xl:ml-[1.5rem] flex items-center gap-10 max-sm:gap-3">
				<button
				className="xl:hidden flex flex-col justify-center items-center group z-50"
				ref={hamburgerButtonRef}
				onClick={() => setHamburger(!hamburger)}
				>
				<div
					className={`${genericHamburgerLine} ${
					hamburger
						? "rotate-45 translate-y-[0.64rem] group-hover:opacity-100"
						: "group-hover:opacity-100"
					}`}
				/>
				<div
					className={`${genericHamburgerLine} ${
					hamburger ? "opacity-0" : "group-hover:opacity-100"
					}`}
				/>
				<div
					className={`${genericHamburgerLine} ${
					hamburger
						? "-rotate-45 -translate-y-[0.64rem] group-hover:opacity-100"
						: "group-hover:opacity-100"
					}`}
				/>
				</button>
				<Link to={`/home`}>
					<img src={logo} alt="vfans" className="h-[1.8rem]" />
				</Link>
			</div>
			<div className="bg-white h-[2.8rem] rounded-[20px] flex items-center p-2">
				<img
				src={searchIcon}
				alt="search"
				className="opacity-90 h-[1.3rem] ml-2"
				/>
				{/* {path !== "" && 
						<div className={`ml-1 bg-[#BABABA] rounded-[12px] flex items-center px-2 py-1 min-w-[3rem]`} style={{ maxWidth: "calc(100% - 120px)" }}>
							<p className="text-xs xl:hidden">...</p>
							<p dir='rtl' className="font-normal text-[14px] overflow-hidden whitespace-nowrap">{path}</p>
							<button onClick={() => setPath("")} className="h-4 w-4 ml-1">
								<img src="./assets/images/pathCross.png" alt="cross" className="w-[0.85rem] min-w-[0.85rem]" />
							</button>
						</div>} */}
				<input
				type="text"
				placeholder="Search"
				value={searchField}
				onChange={(e) => setSearchField(e.target.value)}
				onKeyDown={handleSearch}
				className="font-normal text-[14px] text-black text-opacity-[78%] bg-white ml-[0.4rem] mr-[1rem] h-full flex-1 focus:outline-none min-w-[6rem]"
				/>
			</div>

			<div className="flex flex-row-reverse mr-[5rem] max-xl:mr-[1.5rem]">
				{user ? (<div className="flex flex-row items-center justify-end">
					<img
						src={user.profileImage}
						alt="profile"
						className="rounded-full object-cover size-[2.5rem] max-lg:hidden"
					/>
					<div
						id="username"
						className="font-medium text-opacity-90 text-[14px] text-white ml-2 flex-1 max-sm:hidden hover:underline hover:cursor-pointer"
						onClick={() => navigate(`/profile/${user.username}`)}
					>
						{user.username}
						{/* {printUser()} */}
					</div>
					<Menu as="div" className="relative inline-block text-left">
						<div className="flex justify-center ml-2">
							<Menu.Button className="w-8 h-8 inline-flex">
								<ChevronDownIcon
								className="-mr-1 h-full w-full text-white"
								aria-hidden="true"
								/>
							</Menu.Button>
						</div>

						<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-white border-opacity-30">
								<div className="py-1">
								<Menu.Item>
									{({ active }) => (
									<Link
										to={`/profile/${user.username}`}
										className={classNames(
										active
											? "bg-dark-background text-opacity-90"
											: "text-opacity-[78%]",
										"block px-4 py-2 text-sm text-white"
										)}
									>
										<UserIcon className="inline-flex size-5 mr-2"/>
										Profile
									</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
									<Link
										to={`/save/${user.username}`}
										className={classNames(
										active
											? "bg-dark-background text-opacity-90"
											: "text-opacity-[78%]",
										"block px-4 py-2 text-sm text-white"
										)}
									>
										<BookmarkIcon className="inline-flex mr-2 size-5"/>
										Save
									</Link>
									)}
								</Menu.Item>
								<form method="POST" action="#">
									<Menu.Item>
									{({ active }) => (
										<button
										type="submit"
										className={classNames(
											active
											? "bg-dark-background text-white text-opacity-90"
											: "text-opacity-[78%]",
											"block w-full px-4 py-2 text-left text-sm text-white"
										)}
										onClick={logout}
										>
										<ArrowLeftEndOnRectangleIcon className="inline-flex size-5 mr-2"/>
										Log out
										</button>
									)}
									</Menu.Item>
								</form>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
				)
				: 
				(
					<div className="py-2 px-5 rounded-[10px] bg-emerald-green text-black font-medium text-opacity-90 text-[14px] hover:bg-emerald-600 duration-100 hover:cursor-pointer" onClick={() => navigate('/login')}>Login</div>
				)}
			</div>
		</nav>
	);
}
