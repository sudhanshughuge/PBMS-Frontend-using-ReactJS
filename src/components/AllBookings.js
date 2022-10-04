import axios from "axios";
import jsPDF from "jspdf";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Table } from "reactstrap";
import base_url from "../api/Service";
import { getToken } from "../auth";

function AllBookings() {

    useEffect(()=> {
        document.title="Booking Report || Property Booking Management System"
    },[])

    const [bookings, setBookings] = useState([])

    const getAllBookingFromServer = () => {
        axios.get(`${base_url}/bookings/`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.success("Booking List has been Updated", {
                    toastId: "loadedtoast"
                });
                setBookings(response.data)
            },
            (error) => {
                console.log(error);
                toast.error("Server Down", {
                    toastId: "errortoast"
                });
            }
        );
    };

    useEffect(() => {
        getAllBookingFromServer();
    }, [])

    const printfunction = () => {
        const doc = new jsPDF()
        doc.text("Booking Details", 20, 10)
        doc.autoTable({ html: '#BookingTable' })
        doc.save('bookingdetails.pdf')
        toast.info("Booking Report Downloaded Successfully", {
            toastId: "downloadtoast"
        })
    }

    const [deleteBook, setDeleteBook] = useState({})

    const deleteBooking = (e) => {
        deleteDatafromServer(deleteBook);
        e.preventDefault();
    }

    const deleteDatafromServer = (data) => {
        axios.delete(`${base_url}/bookings/${data.deletebookid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.error("Booking Deleted", {
                    toastId: "deletetoast"
                })
                window.location.reload(false);
            },
            (error) => {
                console.log(error);
                toast.info("You are not an Admin or Booking Not Found", {
                    toastId: "deleteinfotoast"
                })
            }
        )
    }

    return (
        <div className="ml-3">
            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                <h2>Bookings Reports</h2>
            </div>
            <div className="my-custom-scrollbar table-wrapper-scroll-y ml-3">
            <Table className="table table-bordered table-striped mb-0 w-100" id="BookingTable" striped >
                    <thead>
                        <tr>
                            <th className="col-1" scope="row">Booking Id</th>
                            <th className="col-3">Customer</th>
                            <th className="col-3">Property</th>
                            <th className="col-1">Rate</th>
                            <th className="col-1">Booking Amount</th>
                            <th className="col-2">Booking Date</th>
                            <th className="col-1">Update</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.length > 0 ? bookings.map((booking, i) => (
                                <tr key={i}>
                                    <th className="text-center" scope="row">{booking.bookID}</th>
                                    <td>{booking.cname}</td>
                                    <td>{booking.pname}</td>
                                    <td>{booking.rate}</td>
                                    <td>{booking.bookingAmount}</td>
                                    <td>{booking.bookDate}</td>
                                    <td><Link to={`/dashboard/updatebookings/${booking.bookID}`}><button className="btn btn-outline-dark  ml-2">Update</button></Link></td>
                                </tr>
                            )) : <tr><td className="text-center" colSpan={7}>No Bookings Found or Server Down</td></tr>
                        }
                    </tbody>
                </Table>
                </div>

                <div className="container text-center mt-3 p-3">
                <form className="form-inline justify-content-center" onSubmit={deleteBooking} action="" method="post" id="delete_booking_form">
                    <div className="form-group">
                        <input type="text" className="form-control mx-3" id="deletebookid" placeholder="Enter Booking Id" onChange={(e) => {
                            setDeleteBook({ ...deleteBook, deletebookid: e.target.value })
                        }} />
                        <button type="submit" className="btn btn-outline-danger mx-3">Delete Booking</button>
                    </div>
                </form>
            </div>

            <div className="container text-center p-3">
                <Button color="info" outline onClick={printfunction}>Download Booking Report</Button>
            </div>

        </div>
    )
}

export default AllBookings