import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CommunityContext = createContext({});
export function CommunityContextProvider({ children }) {
    const [communityList, setCommunityList] = useState([]);

    useEffect(() => {
        const fetchAllCommunity = async () => {
            try {
                const fetchCommunity = await axios.get("/community/all");
                if(fetchCommunity.data.success){
                    setCommunityList(fetchCommunity.data.community);
                }
            } catch (err) {
                console.error("Error fetching community data", err);
            }
        };
        fetchAllCommunity();
    }, []);

    return (
        <CommunityContext.Provider value={{ communityList, setCommunityList }}>
        {children}
        </CommunityContext.Provider>
    );
    }
    CommunityContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

export default CommunityContext;
