import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import Base from "./Base";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Property Booking Management System"
    }, [])


    const [login, setLogin] = useState({
        username:'',
        password:''
    })

    const checkLogin = (login) => {
        axios.post(`${base_url}/api/v1/auth/login`, login).then(
            (response) => {
                console.log(response.data)
                doLogin(response.data,()=>{
                    console.log("Login details saved to local storage")
                    navigate("/dashboard")
                })

                toast.success("Login Successfull", {
                    toastId: "loginsuccesstoast"
                })
            },
            (error) => {
                console.log(error);
                toast.error("Invalid Username or Password",{
                    toastId: "loginerrortoast"
                })
            }
        )
    }

    const handleForm = (e) => {
        e.preventDefault();
        
        if(login.username.trim() === "" || login.password.trim() === ''){
            toast.error("Username or Password can not be Blank !")
            return;
        }

        checkLogin(login)
    }


    return (
        <div>
            <Base>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center h-90 my-5">
                        <div className="col-8">
                            <img src="https://i.postimg.cc/wxXq8DsB/Sketch.png" height={500} width={650} alt="" />
                        </div>
                        <div className="col-4 ">
                            <form className="justify-content-center text-center" onSubmit={handleForm} action="/" method="post" id="login_form">
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <h4 className="mb-4">Login Here</h4>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="username" className="form-control form-control-lg"
                                        placeholder="Enter User Name" onChange={(e) => {
                                            setLogin({ ...login, username: e.target.value })
                                        }} />
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" id="password" className="form-control form-control-lg"
                                        placeholder="Enter password" onChange={(e) => {
                                            setLogin({ ...login, password: e.target.value })
                                        }} />
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">   
                                <button type="submit" className="btn btn-outline-success">Login</button>
                                <button type="reset" className="btn btn-outline-danger mx-3">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Base>
        </div>
    )
}

export default Login;