import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import { getToken } from "../auth";

function AddCustomer() {

    useEffect(() => {
        document.title = "Add Customer || Property Booking Management System"
    }, [])

    const [customer, setCustomer] = useState({
        custName: '',
        custMobNo: '',
        custCity: '',
        email: '',
        custAddress: '',
        state: '',
        pincode: ''
    })
    const [custid, setCustId] = useState({})
    const [cityList, setCityList] = useState({})

    const handleForm = (e) => {
        e.preventDefault();
        if (customer.custName === "" || customer.custMobNo === "" || customer.custAddress === "" || customer.custCity === "" || customer.state === "" || customer.pincode === "") {
            toast.error("No field can be Blank !")
            return;
        } else if (customer.custMobNo.length !== 10) {
            toast.error("Invalid Phone Number !")
            return;
        } else if (customer.pincode.length !== 6) {
            toast.error("Invalid PinCode !")
            return;
        } else {
            postDatatoServer(customer);
            
        }
    }


    const postDatatoServer = (customer) => {
        axios.post(`${base_url}/customers/`, customer, { headers: { "Authorization": `Bearer ${getToken()}` } }).then(
            (response) => {
                toast.success("Customer Added Successfully", {
                    toastId: "custaddedtoast"
                })
                init();
            },
            (error) => {
                console.log(error);
                toast.error("Server Down", {
                    toastId: "serverdowntoast"
                })
            }
        )
    }

    const getCustID = () => {

        axios.get(`${base_url}/customers/maxid`, { headers: { "Authorization": `Bearer ${getToken()}` } }).then(
            (response) => {
                setCustId(response.data + 1)
            },
            (error) => {
                console.log(error);
                toast.error("Server Down", {
                    toastId: "errortoast"
                });
            }
        );

    }

    const getCityList = () => {

        axios.get(`${base_url}/cities/`, { headers: { "Authorization": `Bearer ${getToken()}` } }).then(
            (response) => {
                setCityList(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const init = () => {
        getCustID();
        getCityList();
        setCustomer({
            custName: '',
            custMobNo: '',
            custCity: '',
            email: '',
            custAddress: '',
            state: '',
            pincode: ''
        })
    }
    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="container-fluid ">
                <div className="row col-12">

                    <div className="w-100">
                        <form className="justify-content-center text-center" onSubmit={handleForm} action="/" method="post" id="customer_form">

                            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                                <h2>Customer Details</h2>
                            </div>
                            <input id="custID" placeholder="Customer ID" className="form-control m-3" type="text" disabled value={custid} />
                            <input id="custName" placeholder="Customer's Name" className="form-control m-3" value={customer.custName} type="text" onChange={(e) => {
                                setCustomer({ ...customer, custName: e.target.value })
                            }} />
                            <input id="custMobNo" placeholder="Enter Phone Number" className="form-control m-3" value={customer.custMobNo} type="tel" onChange={(e) => {
                                setCustomer({ ...customer, custMobNo: e.target.value })
                            }} />
                            <input id="email" placeholder="Enter E-Mail Address" className="form-control m-3" value={customer.email} type="email" onChange={(e) => {
                                setCustomer({ ...customer, email: e.target.value })
                            }} />
                            <input id="custAddress" placeholder="Customer's Address" className="form-control m-3" value={customer.custAddress} type="text" onChange={(e) => {
                                setCustomer({ ...customer, custAddress: e.target.value })
                            }} />

                            <div className="form-inline row ">
                                <div className="col-6">
                                    <select className="form-control w-100 ml-3" value={customer.custCity} id="custCity" onChange={(e) => {
                                        setCustomer({ ...customer, custCity: e.target.value })
                                    }}>
                                        <option value={''}>Select City</option>

                                        {
                                            cityList.length > 0 ? cityList.map((city, i) => (

                                                <option key={i} value={city.city}>{city.city}</option>


                                            )) : <option>Server Down or No City Found</option>
                                        }

                                    </select>
                                </div>
                                <div className="col-6">
                                    <select className="form-control w-100 ml-3" id="state" value={customer.state} onChange={(e) => {
                                        setCustomer({ ...customer, state: e.target.value })
                                    }}>
                                        <option value={''}>Select State</option>
                                        <option value={'Maharashtra'}>Maharashtra</option>
                                    </select>

                                </div>

                            </div>
                            <input id="pincode" placeholder="Pin Code" className="form-control m-3" value={customer.pincode} type="text" onChange={(e) => {
                                setCustomer({ ...customer, pincode: e.target.value })
                            }} />

                            <button type="submit" className="btn btn-outline-success mx-3">Add Customer</button>
                            <button type="reset" className="btn btn-outline-danger mx-3">Clear</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default AddCustomer