import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Table } from "reactstrap";
import base_url from "../api/Service";
import { getToken } from "../auth";

function AllUsers() {

    useEffect(() => {
        document.title = "Admin Dashboard || Property Booking Management System"
    }, [])

    const [users, setUsers] = useState([])

    const getAllUsersFromServer = () => {
        axios.get(`${base_url}/api/users/`, { headers: { "Authorization": `Bearer ${getToken()}` } }).then(
            (response) => {
                toast.success("Users List has been Updated", {
                    toastId: "loadedtoast"
                });
                setUsers(response.data)
            },
            (error) => {
                console.log(error);
                toast.error("Server Down", {
                    toastId: "errortoast"
                });
            }
        );
    };

    const checkNormalUser = (userid) => {
        if (userid === 1) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        getAllUsersFromServer();
    }, [])

    const deleteDatafromServer = (data) => {
        axios.delete(`${base_url}/api/users/${data}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.error("User Deleted", {
                    toastId: "deletetoast"
                })
                window.location.reload(false);
            },
            (error) => {
                console.log(error);
                toast.info("You are not an Admin or Customer Not Found", {
                    toastId: "deleteinfotoast"
                })
            }
        )
    }


    return (
        <div className="ml-3">
            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                <h2>Users</h2>
            </div>
            <div className="my-custom-scrollbar table-wrapper-scroll-y ml-3">
                <Table className="table table-bordered table-striped mb-0 w-100" id="UsersTable" striped >
                    <thead>
                        <tr>
                            <th className="col-2" scope="row">User Id</th>
                            <th className="col-2">Username</th>
                            <th className="col-2">Name</th>
                            <th className="col-2">Email ID</th>
                            <th className="col-2">Role</th>
                            <th className="col-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 ? users.map((user, i) => (
                                <tr key={i}>
                                    <th className="text-center" scope="row">{user.userID}</th>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {
                                            checkNormalUser(user.userID) && (
                                                <button className="btn btn-outline-dark ml-2" onClick={()=>deleteDatafromServer(user.userID)}>Delete</button>
                                            )
                                        }
                                    </td>
                                </tr>
                            )) : <tr><td className="text-center" colSpan={6}>No Properties Found or Server Down</td></tr>
                        }
                    </tbody>
                </Table>
            </div>
            <div className="container text-center p-1 my-5">
                <Link to={`/dashboard/adduser`}><button className="btn btn-outline-primary  ml-2">Click here to Add New User</button></Link>
            </div>
        </div>
    )
}

export default AllUsers