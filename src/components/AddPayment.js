import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import { getToken } from "../auth";

function AddPayment() {

    useEffect(() => {
        document.title = "Add Payment || Property Booking Management System"
    }, [])

    const [payid, setPayId] = useState({})
    const [bookings, setBookings] = useState([])
    const [selectedbooking, setSelectedBooking] = useState([])
    const [payment, setPayment] = useState([])
    const [amountpaid, setAmountPaid] = useState([])

    const getAmountPaid = (bid) => {
        axios.get(`${base_url}/payments/getamountpaid/${bid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setAmountPaid(response.data)

            },
            (error) => {
                console.log(error);
            }
        );
    }

    const getAllBookingsFromServer = () => {
        axios.get(`${base_url}/bookings/`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setBookings(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const postDatatoServer = (payment) => {
        axios.post(`${base_url}/payments/`, payment, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.success("Payment Saved Successfully", {
                    toastId: "paymentsavedtoast"
                })
            },
            (error) => {
                console.log(error);
                toast.error("Server Down", {
                    toastId: "serverdowntoast"
                })
            }
        )
    }

    const getPayID = () => {

        axios.get(`${base_url}/payments/maxid`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setPayId(response.data + 1)
            },
            (error) => {
                console.log(error);
                toast.error("Server Down", {
                    toastId: "errortoast"
                });
            }
        );
    }

    const getSelectedBookingFromServer = (bid) => {
        axios.get(`${base_url}/bookings/${bid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setSelectedBooking(response.data)

            },
            (error) => {
                console.log(error);
            }
        );
    }

    const handleSelect = () => {
        getSelectedBookingFromServer(payment.bookID);
        getAmountPaid(payment.bookID);
    }

    useEffect(() => {
        getPayID();
        getAllBookingsFromServer();
    }, [])

    const handleForm = (e) => {
        postDatatoServer(payment);
        e.preventDefault();
        window.location.reload(false);
    }

    return (
        <div>
            <div className="container-fluid ">
                <div className="row col-12">

                    <div className="w-100">
                        <form className="justify-content-center text-center" onSubmit={handleForm} action=" " method="post" id="payment_form">

                            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                                <h2>Payment Details</h2>
                            </div>
                            <input name="PayID" placeholder="Payment ID" className="form-control m-3" disabled type="text" value={payid} />

                            <div className="form-group ">
                                <select className="form-control m-3" id="bookinglist" onClick={handleSelect} onChange={(e) => {
                                    setPayment({ ...payment, bookID: e.target.value })
                                }}>
                                    <option>Select Booking ID</option>
                                    {
                                        bookings.length > 0 ? bookings.map((booking, i) => (

                                            <option key={i} value={booking.bookID}>{booking.bookID}. {booking.cname}</option>

                                        )) : <option>Server Down or No Booking Found</option>
                                    }
                                </select>
                            </div>

                            <input name="cName" disabled placeholder="Customer's Name" className="form-control m-3" defaultValue={selectedbooking.cname} type="text" />
                            <div className="form-inline row m-3">
                                <div className="text-left col-4">Rate :</div>
                                <div className="col-6">
                                    <input name="rate" disabled placeholder="Rate" className="form-control w-100" type="text" defaultValue={selectedbooking.rate} />
                                </div>
                            </div>
                            <div className="form-inline row m-3">
                                <div className="text-left col-4">Amount Paid :</div>
                                <div className="col-6">
                                <input name="AmountPaid" disabled placeholder="Amount Paid" className="form-control w-100" type="text" defaultValue={amountpaid} />
                                </div>
                            </div>
                            <div className="form-inline row m-3">
                                <div className="text-left col-4">Amount Remaining :</div>
                                <div className="col-6">
                                <input name="amountRem" disabled placeholder="Remaining Amount" className="form-control w-100" type="text" value={(parseInt(selectedbooking.rate) - parseInt(amountpaid)).toString()} />
                                </div>
                            </div>
                            
                            
                            <input name="AmountPaying" placeholder="Amount Paying Now" className="form-control m-3" type="text" onChange={(e) => {
                                setPayment({ ...payment, amountPaying: e.target.value, cname: selectedbooking.cname, rate: selectedbooking.rate, amountPaid: (parseInt(amountpaid) + parseInt(e.target.value)), amountRem: (parseInt(selectedbooking.rate) - parseInt(amountpaid) - parseInt(e.target.value)) })
                            }} />

                            <button type="submit" className="btn btn-outline-success">Add Payment</button>
                            <button type="reset" className="btn btn-outline-danger mx-3">Clear</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default AddPayment