// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";

// const StatusContext = createContext({});

// export function StatusContextProvider({ children }) {
//     const [hamburger, setHamburger] = useState(false);
//     const [sidebarCommunity, setSidebarCommunity] = useState(false);
//     const [loading, setLoading] = useState(true);

//     return (
//         <StatusContext.Provider value={{ hamburger, setHamburger, sidebarCommunity, setSidebarCommunity, loading, setLoading }}>
//             {children}
//         </StatusContext.Provider>
//     );
// }

// StatusContextProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default StatusContext;

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const StatusContext = createContext({});
export function StatusContextProvider({ children }) {
    const [hamburger, setHamburger] = useState(false);
    const [sidebarCommunity, setSidebarCommunity] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, []);
    
    const saveUser = async (userData) => {
        try {
        const { data: saveUserData } = await axios.put(`/user/profile/${userData._id}`, userData, { withCredentials: true });
        setUser(saveUserData.user);
        } catch (err) {
        console.error("Error saving user profile", err);
        };
    };

    return (
        <StatusContext.Provider value={{ hamburger, setHamburger, sidebarCommunity, setSidebarCommunity, loading, setLoading }}>
        {children}
        </StatusContext.Provider>
    );
    }
    StatusContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    };

export default StatusContext;
