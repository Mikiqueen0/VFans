import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";

export default function PageButton({ name, pathName }) {
    const location = useLocation();
    const navigate = useNavigate(); 
    const routeChange = (e) =>{ 
        let path = e.target.name; 
        navigate(path);
    }

    const activeButton = "font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] text-opacity-90 text-emerald-green bg-lighter-primary"
    const inactiveButton = "font-poppins font-medium text-base py-[1.25rem] px-[1.2rem] w-full h-full text-start rounded-[10px] bg-transparent text-white text-opacity-90 hover:bg-primary active:text-emerald-green active:bg-lighter-primary"
    return (
        <button name={pathName} onClick={location.pathname !== pathName ? routeChange : null} className={`${location.pathname === pathName ? activeButton : inactiveButton} capitalize`}>
            {name}
        </button>
    )
}