import React, { useEffect } from "react";
import { useState } from "react";
import { getCurrentUserDetails, isLoggedIn } from "../auth";

function Home() {
    useEffect(() => {
        document.title = "Property Booking Management System"
    }, [])

    const [login, setLogin]= useState(false)
    const [user, setUser]= useState({
        name:''
    })

    useEffect(()=>{
        setLogin(isLoggedIn())
        setUser(getCurrentUserDetails())
    },[login])

    return (
        <div className="ml-3">
            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                <h2>Hello {user.name}, Welcome to PBMS</h2>
            </div>
            <div className="text-center">
                <img src="https://i.postimg.cc/hPnqXfNJ/draw2.webp" className="img-fluid" alt="Sketch Logo"></img>
            </div>
        </div>
    )
}

export default Home;