import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import { getToken } from "../auth";

function UpdateCustomer() {

    useEffect(() => {
        document.title = "Update Customer || Property Booking Management System"
    }, [])

    const [customer, setCustomer] = useState({})
    const [oldCustomer, setOldCustomer] = useState({})
    const [cityList, setCityList] = useState({})

    const handleForm = (e) => {
        putDatatoServer(customer);
        e.preventDefault();
    }

    const {updateCustid} = useParams();

    const putDatatoServer = (customer) => {
        axios.put(`${base_url}/customers/${updateCustid}`, customer, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.success("Customer Updated Successfully", {
                    toastId: "custaddedtoast"
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getOldCustomerData = () => {

        axios.get(`${base_url}/customers/${updateCustid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setOldCustomer(response.data)
                setCustomer(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const getCityList = () => {

        axios.get(`${base_url}/cities/`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setCityList(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    useEffect(() => {
        getOldCustomerData();
        getCityList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="container-fluid ">
                <div className="row col-12">

                    <div className="w-100">
                        <form className="justify-content-center text-center" onSubmit={handleForm} action="/" method="post" id="customer_update_form">

                            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                                <h2>Update Customer Details</h2>
                            </div>
                            <input id="custID" placeholder="Customer ID" className="form-control m-3" type="text" disabled defaultValue={updateCustid} />
                            <input id="custName" placeholder="Customer's Name" className="form-control m-3" type="text" defaultValue={oldCustomer.custName} onChange={(e) => {
                                setCustomer({ ...customer, custName: e.target.value })
                            }} />
                            <input id="custMobNo" placeholder="Enter Phone Number" className="form-control m-3" type="tel" defaultValue={oldCustomer.custMobNo} onChange={(e) => {
                                setCustomer({ ...customer, custMobNo: e.target.value })
                            }} />
                            <input id="email" placeholder="Enter E-Mail Address" className="form-control m-3" type="email" defaultValue={oldCustomer.email} onChange={(e) => {
                                setCustomer({ ...customer, email: e.target.value })
                            }} />
                            <input id="custAddress" placeholder="Customer's Address" className="form-control m-3" type="text" defaultValue={oldCustomer.custAddress} onChange={(e) => {
                                setCustomer({ ...customer, custAddress: e.target.value })
                            }} />

                            <div className="form-inline row ">
                                <div className="col-6">
                                    <select className="form-control w-100 ml-3" id="custCity" defaultValue={oldCustomer.custCity} value={oldCustomer.custCity} onChange={(e) => {
                                        setCustomer({ ...customer, custCity: e.target.value })
                                    }}>
                                        <option>Select City</option>

                                        {
                                            cityList.length > 0 ? cityList.map((city, i) => (

                                                <option key={i} value={city.city}>{city.city}</option>


                                            )) : <option>Server Down or No City Found</option>
                                        }

                                    </select>
                                </div>
                                <div className="col-6">
                                    <select className="form-control w-100 ml-3" id="state" defaultValue={oldCustomer.state} value={oldCustomer.state} onChange={(e) => {
                                        setCustomer({ ...customer, state: e.target.value })
                                    }}>
                                        <option>Select State</option>
                                        <option value={oldCustomer.state}>Maharashtra</option>
                                    </select>

                                </div>

                            </div>
                            <input id="pincode" placeholder="Pin Code" className="form-control m-3" type="text" defaultValue={oldCustomer.pincode} onChange={(e) => {
                                setCustomer({ ...customer, pincode: e.target.value })
                            }} />

                            <button type="submit" className="btn btn-outline-success mx-3">Update Customer</button>
                            <Link to="/dashboard/viewcustomers"><button className="btn btn-outline-warning mx-3">Back</button></Link>
                            
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default UpdateCustomer