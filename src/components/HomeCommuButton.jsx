import React from 'react'

function HomeCommuButton({ location, routeChange }) {

    const activeButton = "font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] text-opacity-90 text-emerald-green bg-lighter-primary"
    const inactiveButton = "font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] bg-transparent text-white text-opacity-90 hover:bg-primary active:text-emerald-green active:bg-lighter-primary"

    return (
        <div>
            <button name="/" onClick={location.pathname !== "/" ? routeChange : ""} className={`${location.pathname === "/" ? activeButton : inactiveButton}`}>
                Home
            </button>
            <button name="/joinedCommunities" onClick={location.pathname !== "/joinedCommunities" ? routeChange : ""} className={`${location.pathname === "/joinedCommunities" ? activeButton : inactiveButton}`}>
                Joined Communities
            </button>
        </div>
    )
}

export default HomeCommuButton




