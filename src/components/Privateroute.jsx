import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth";

const Privateroute =() =>{

    if (isLoggedIn()){
        return <Outlet/>
    } else{
        return <Navigate to={"/login"} />
    }
}

export default Privateroute