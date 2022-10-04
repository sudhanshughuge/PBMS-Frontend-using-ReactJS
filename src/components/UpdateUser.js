import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import { getToken } from "../auth";

function UpdateUser() {
    const [user, setUser] = useState({})
    const [oldUser, setOldUser] = useState({})

    const handleForm = (e) => {
        e.preventDefault();
        putDatatoServer(user);
    }

    const {updateUserid} = useParams();

    const putDatatoServer = (user) => {
        axios.put(`${base_url}/api/users/${updateUserid}`, user, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.success("User Details Updated Successfully", {
                    toastId: "propaddedtoast"
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getOldUserData = () => {

        axios.get(`${base_url}/api/users/${updateUserid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                console.log(response.data)
                setOldUser(response.data)
                setUser(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    useEffect(() => {
        getOldUserData();
        // eslint-disable-next-line
    },[])

    return (
        <div>
            <div className="container-fluid ">
                <div className="row col-12">

                    <div className="w-100">
                        <form className="justify-content-center text-center" onSubmit={handleForm} action=" " method="post" id="signup">

                            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                                <h2>Update User Details</h2>
                            </div>
                            <input id="Name" placeholder="Enter Your Name" className="form-control m-3" defaultValue={oldUser.name}  type="text" onChange={(e) => {
                                setUser({ ...user, name: e.target.value })
                            }} />
                            <input id="Username" placeholder="Enter UserName" className="form-control m-3" defaultValue={oldUser.username} type="text" onChange={(e) => {
                                setUser({ ...user, username: e.target.value })
                            }} />
                            <input id="email" placeholder="Enter Your E-Mail Address" className="form-control m-3" defaultValue={oldUser.email} type="email" onChange={(e) => {
                                setUser({ ...user, email: e.target.value })
                            }} />
                            <div className="form-group ">
                                <select className="form-control m-3" id="roles" defaultValue={oldUser.role} value={oldUser.role} onChange={(e) => {
                                    setUser({ ...user, role: e.target.value })
                                }}>
                                    <option value={''}>Select Role</option>
                                    <option key={1} value={'ROLE_NORMAL'}>Normal</option>
                                    <option key={2} value={'ROLE_ADMIN'}>Admin</option>

                                </select>
                            </div>
                            <input id="Password" placeholder="Enter Password" className="form-control m-3" type="password" onChange={(e) => {
                                setUser({ ...user, password: e.target.value })
                            }} />
                            <input id="ConfirmPassword" placeholder="Confirm Password" className="form-control m-3" type="password" onChange={(e) => {
                                setUser({ ...user, password: e.target.value })
                            }} />

                            <button type="submit" className="btn btn-outline-success">Sign Up</button>
                            <Link to="/dashboard/admin"><button className="btn btn-outline-warning mx-3">Back</button></Link>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default UpdateUser