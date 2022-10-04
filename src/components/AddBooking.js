import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import { getToken } from "../auth";

function AddBooking() {

    useEffect(() => {
        document.title = "Booking || Property Booking Management System"
    }, [])

    const [customers, setCustomer] = useState([])
    const [bookid, setBookId] = useState({})
    const [booking, setBooking] = useState({
        cid:'',
        pid:'',
        bookingAmount:''
    })
    const [selectedcustomer, setSelectedCustomer] = useState([])
    const [properties, setProperties] = useState([])
    const [selectedproperty, setSelectedProperty] = useState([])

    const getAllCustomerFromServer = () => {
        axios.get(`${base_url}/customers/`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setCustomer(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const getAvailablePropertiesFromServer = () => {
        axios.get(`${base_url}/property/available`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setProperties(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const getSelectedCustomerFromServer = (cid) => {
        axios.get(`${base_url}/customers/${cid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setSelectedCustomer(response.data)
                
            },
            (error) => {
                console.log(error);
            }
        );
    }
    
    const getSelectedPropertyFromServer = (pid) => {
        axios.get(`${base_url}/property/${pid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setSelectedProperty(response.data)
                
            },
            (error) => {
                console.log(error);
            }
        );
    }


    const getBookID = () => {

        axios.get(`${base_url}/bookings/maxid`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setBookId(response.data + 1)
            },
            (error) => {
                console.log(error);
                toast.error("Server Down", {
                    toastId: "errortoast"
                });
            }
        );
    }

    const postDatatoServer = () => {
        axios.post(`${base_url}/bookings/`, booking, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                console.log(response);
                toast.success("Property Successfully Booked", {
                    toastId: "propbookedtoast"
                })
            },
            (error) => {
                console.log(error);
                toast.error("Server Down",{
                    toastId: "serverdowntoast"
                })
            }
        )
    }

    useEffect(() => {
        getBookID();
        getAllCustomerFromServer();
        getAvailablePropertiesFromServer();
    }, [])

    const handleSelect = () => {
        getSelectedCustomerFromServer(booking.cid);
    }

    const handleSelectForProperty = () => {
        getSelectedPropertyFromServer(booking.pid);
    }

    const handleForm = (e) => {
        e.preventDefault();
        if(booking.cid === "" || booking.pid === "" || booking.bookingAmount === ""){
            toast.error("No field can be Blank !")
            return;
        } else {
            postDatatoServer(booking);
            window.location.reload(false);
        }
    }
    return (
        <div>
            <div className="container-fluid ">
                <div className="row col-12">

                    <div className="w-100">
                        <form className="justify-content-center text-center" onSubmit={handleForm} action=" " method="post" id="booking_form">

                            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                                <h2>Booking Details</h2>
                            </div>
                            <input name="BookID" placeholder="Booking ID" className="form-control m-3" disabled type="text" value={bookid} />

                            <div className="form-group ">
                                <select className="form-control m-3" id="customerlist" onClick={handleSelect} onChange={(e) => {
                                    setBooking({ ...booking, cid: e.target.value})
                                }}>
                                    <option value={''}>Select Customer ID</option>

                                    {
                                        customers.length > 0 ? customers.map((customer, i) => (

                                            <option key={i} value={customer.custID}>{customer.custName}</option>

                                        )) : <option>Server Down or No Customer Found</option>
                                    }

                                </select>
                            </div>
                            <input id="custMobNo" placeholder="Enter Phone Number" className="form-control m-3" disabled defaultValue={selectedcustomer.custMobNo} type="tel" />
                            <input id="email" placeholder="Enter E-Mail Address" className="form-control m-3" disabled defaultValue={selectedcustomer.email} type="email" />
                            <input id="custAddress" placeholder="Customer's Address" className="form-control m-3" disabled defaultValue={selectedcustomer.custAddress} type="text" />

                            <div className="form-group ">
                                <select className="form-control m-3" id="propertylist" onClick={handleSelectForProperty} onChange={(e) => {
                                    setBooking({ ...booking, pid: e.target.value})
                                }}>
                                    <option value={''}>Select Property</option>
                                    {
                                        properties.length > 0 ? properties.map((property, i) => (

                                            <option key={i} value={property.propID}>{property.propName}</option>

                                        )) : <option>Server Down or No Property Found</option>
                                    }
                                </select>
                            </div>

                            <input name="PropRate" placeholder="Rate" className="form-control m-3" disabled type="text" defaultValue={selectedproperty.rate} onChange={(e) => {
                                setBooking({ ...booking, rate: e.target.value })
                            }} />
                            <input name="BookingAmount" placeholder="Booking Amount" className="form-control m-3" type="text" onChange={(e) => {
                                setBooking({ ...booking, bookingAmount: e.target.value, pname: selectedproperty.propName, cname: selectedcustomer.custName, rate: selectedproperty.rate })
                            }} />
                            <button type="submit" className="btn btn-outline-success">Book</button>
                            <button type="reset" className="btn btn-outline-danger mx-3">Clear</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default AddBooking