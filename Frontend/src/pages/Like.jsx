import { useState } from "react"
import { NavBar } from "../components/index"


export default function Like(){
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
    const username = "Mikiqueen";

    return(
        <div className="w-[100%] h-[100vh] bg-dark-background">
            <NavBar setHamburgerIsOpen={setHamburgerIsOpen} hamburgerIsOpen={hamburgerIsOpen} username={username} />
        </div>
    )
}