import { useState } from "react";
import React from "react";
import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext();


export const UserProvider = ({children}) => {

    const [usertype, setUsertype] = useState(null)



return (
    <UserContext.Provider value = {{usertype,setUsertype}}>
        {children}
        </UserContext.Provider>
)
}



