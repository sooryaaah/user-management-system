import { useState } from "react";
import React from "react";
import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext();


export const UserProvider = ({children}) => {

    const [userType, setUserType] = useState(null)



return (
    <UserContext.Provider value = {{userType,setUserType}}>
        {children}
        </UserContext.Provider>
)
}



