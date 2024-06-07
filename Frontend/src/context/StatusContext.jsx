import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const StatusContext = createContext({});

export function StatusContextProvider({ children }) {
    const [hamburger, setHamburger] = useState(false);
    const [sidebarCommunity, setSidebarCommunity] = useState(false);

    return (
        <StatusContext.Provider value={{ hamburger, setHamburger,sidebarCommunity, setSidebarCommunity }}>
            {children}
        </StatusContext.Provider>
    );
}

StatusContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};