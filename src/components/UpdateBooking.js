import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import { getToken } from "../auth";

function UpdateBooking() {

    useEffect(() => {
        document.title = "Update Property || Property Booking Management System"
    }, [])

    const [booking, setBooking] = useState({})
    const [oldbooking, setOldBooking] = useState({})

    const handleForm = (e) => {
        putDatatoServer(booking);
        e.preventDefault();
    }

    const {updateBookid} = useParams();

    const putDatatoServer = (booking) => {
        axios.put(`${base_url}/bookings/${updateBookid}`, booking, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.success("Booking Updated Successfully", {
                    toastId: "propaddedtoast"
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getOldBookingData = () => {

        axios.get(`${base_url}/bookings/${updateBookid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setOldBooking(response.data)
                setBooking(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    useEffect(() => {
        getOldBookingData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="container-fluid ">
                <div className="row col-12">

                    <div className="w-100">
                        <form className="justify-content-center text-center" onSubmit={handleForm} action="/" method="post" id="customer_update_form">

                            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                                <h2>Update Booking Details</h2>
                            </div>
                            <input id="BookID" placeholder="Booking ID" className="form-control m-3" type="text" disabled defaultValue={updateBookid} />
                            <input name="CustName" placeholder="Enter Customer Name" className="form-control m-3" type="text" disabled defaultValue={oldbooking.cname}/>
                            <input name="PropName" placeholder="Enter Property Name" className="form-control m-3" type="text" disabled defaultValue={oldbooking.pname}/>
                            <input name="PropRate" placeholder="Enter Property Rate" className="form-control m-3" disabled type="text" defaultValue={oldbooking.rate}/>
                            <input name="BookingAmount" placeholder="Enter Booking Amount" className="form-control m-3" type="text" defaultValue={oldbooking.bookingAmount} onChange={(e) => {
                                setBooking({ ...booking, bookingAmount: e.target.value })
                            }} />
                            <button type="submit" className="btn btn-outline-success mx-3">Update Booking</button>
                            <Link to="/dashboard/viewbookings"><button className="btn btn-outline-warning mx-3">Back</button></Link>
                            
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default UpdateBooking