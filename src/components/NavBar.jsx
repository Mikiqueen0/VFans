import { useRef, useEffect } from "react";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function NavBar({ setHamburgerIsOpen, hamburgerIsOpen, hamburgerPopupRef, username }) {
    const hamburgerButtonRef = useRef(null);
    const genericHamburgerLine = `h-[0.14rem] w-8 my-1 rounded-full bg-white transition ease transform duration-300`;
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (hamburgerPopupRef.current && !hamburgerPopupRef.current.contains(e.target) && !hamburgerButtonRef.current.contains(e.target)) {
                setHamburgerIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [hamburgerPopupRef]);

    return (
        <nav className="sticky top-0 bg-primary grid grid-cols-[30%_40%_30%] max-sm:grid-cols-[20%_60%_20%] justify-between items-center h-[5rem] z-50">
            <div className="ml-[5rem] max-xl:ml-[1.5rem] flex items-center gap-10 max-sm:gap-3">
                <button className="xl:hidden flex flex-col justify-center items-center group z-50" ref={hamburgerButtonRef} onClick={() => setHamburgerIsOpen(!hamburgerIsOpen)}>
                    <div className={`${genericHamburgerLine} ${hamburgerIsOpen ? "rotate-45 translate-y-[0.64rem] group-hover:opacity-100" : "group-hover:opacity-100"}`} />
                    <div className={`${genericHamburgerLine} ${hamburgerIsOpen ? "opacity-0" : "group-hover:opacity-100"}`} />
                    <div className={`${genericHamburgerLine} ${hamburgerIsOpen ? "-rotate-45 -translate-y-[0.64rem] group-hover:opacity-100" : "group-hover:opacity-100"}`} />
                </button>
                <a href="/home">
                    <img src="./assets/images/white-vfans.png" alt="vfans" className="h-[1.8rem]" />
                </a>
            </div>
            <div className="bg-white h-[2.8rem] rounded-[20px] flex items-center p-2">
                <img src="./assets/images/search.png" alt="search" className="opacity-90 h-[1.3rem] ml-2" />
                {/* {path !== "" && 
                <div className={`ml-1 bg-[#BABABA] rounded-[12px] flex items-center px-2 py-1 min-w-[3rem]`} style={{ maxWidth: "calc(100% - 120px)" }}>
                    <p className="text-xs xl:hidden">...</p>
                    <p dir='rtl' className="font-poppins font-normal text-[14px] overflow-hidden whitespace-nowrap">{path}</p>
                    <button onClick={() => setPath("")} className="h-4 w-4 ml-1">
                        <img src="./assets/images/pathCross.png" alt="cross" className="w-[0.85rem] min-w-[0.85rem]" />
                    </button>
                </div>} */}
                <input type="text" placeholder="Search" className="font-poppins font-normal text-[14px] text-black text-opacity-[78%] bg-white ml-[0.4rem] mr-[1rem] h-full flex-1 focus:outline-none min-w-[6rem]" />
            </div>

                
            <div className="flex flex-row-reverse mr-[5rem] max-xl:mr-[1.5rem]">
                <div className="flex flex-row items-center justify-end">
                    <img src="./assets/images/test-profile.jpg" alt="profile" className="rounded-full h-[2.5rem] max-lg:hidden" />
                    <p id="username" className="font-poppins font-medium text-opacity-90 text-[14px] text-white ml-2 flex-1 max-sm:hidden">
                        {username}
                    </p>
                    <Menu as="div" className="relative inline-block text-left">
                        <div className="flex justify-center ml-2">
                            <Menu.Button className="w-8 h-8 inline-flex">
                                <ChevronDownIcon className="-mr-1 h-full w-full text-white" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                            <Menu.Items className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-white border-opacity-30">
                            <div className="py-1">
                                <Menu.Item>
                                {({ active }) => <a href="#" className={classNames(active ? 'bg-dark-background text-opacity-90' : 'text-opacity-[78%]', 'block px-4 py-2 text-sm font-poppins text-white')}>
                                    <img src="./assets/images/profile.png" alt="profile" className="inline-flex h-5 mr-2" />
                                    Profile
                                    </a>}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => <a href="#" className={classNames(active ? 'bg-dark-background text-opacity-90' : 'text-opacity-[78%]', 'block px-4 py-2 text-sm font-poppins text-white')}>
                                        <img src="./assets/images/setting.png" alt="setting" className="inline-flex h-5 mr-2" />
                                    Setting
                                    </a>}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => <a href="/login" className={classNames(active ? 'bg-dark-background text-opacity-90' : 'text-opacity-[78%]', 'block px-4 py-2 text-sm font-poppins text-white')}>
                                        <img src="" alt="login" className="inline-flex h-5 mr-2" />
                                    Login
                                    </a>}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => <a href="/signup" className={classNames(active ? 'bg-dark-background text-opacity-90' : 'text-opacity-[78%]', 'block px-4 py-2 text-sm font-poppins text-white')}>
                                        <img src="" alt="signup" className="inline-flex h-5 mr-2" />
                                    Sign up 
                                    </a>}
                                </Menu.Item>
                                <form method="POST" action="#">
                                    <Menu.Item>
                                        {({ active }) => <button type="submit" className={classNames(active ? 'bg-dark-background text-white text-opacity-90' : 'text-opacity-[78%]', 'block w-full px-4 py-2 font-poppins text-left text-sm text-white')}>
                                            <img src="./assets/images/logout.png" alt="logout" className="inline-flex w-5 mr-2" />
                                            Sign out
                                        </button>}
                                    </Menu.Item>
                                </form>
                            </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </nav>
    );
}