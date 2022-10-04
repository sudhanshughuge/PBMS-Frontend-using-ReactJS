import React, { useEffect } from "react";
import { Button, Table } from "reactstrap";


import base_url from "../api/Service";
import axios from 'axios';
import { toast } from "react-toastify";
import { useState } from "react";

import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { Link } from "react-router-dom";
import { getToken } from "../auth";


function AllCustomers() {


    const [customers, setCustomer] = useState([])

    useEffect(() => {
        document.title = "Customer Report || Property Booking Management System"
    }, [])

    const getAllCustomerFromServer = () => {
        axios.get(`${base_url}/customers/`, { headers: { "Authorization": `Bearer ${getToken()}` } }).then(
            (response) => {
                toast.success("Customers List has been Updated", {
                    toastId: "loadedtoast"
                });
                setCustomer(response.data)
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
        init();
        // eslint-disable-next-line
    }, [])

    const init = () => {
        getAllCustomerFromServer();
    }

    const printfunction = () => {
        const doc = new jsPDF()
        doc.text("Customer Details", 20, 10)
        doc.autoTable({ html: '#CustomerTable' })
        doc.save('customerdetails.pdf')
        toast.info("Customer Report Downloaded Successfully", {
            toastId: "downloadtoast"
        })
    }

    const [deleteCust, setDeleteCust] = useState({})

    const deleteCustomer = (e) => {
        e.preventDefault();
        deleteDatafromServer(deleteCust);
    }

    const deleteDatafromServer = (data) => {
        axios.delete(`${base_url}/customers/${data.deletecustid}`, { headers: { "Authorization": `Bearer ${getToken()}` } }).then(
            (response) => {
                toast.error("Customer Deleted", {
                    toastId: "deletetoast"
                })
                init();
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
                <h2>Customers Reports</h2>
            </div>
            <div className="my-custom-scrollbar table-wrapper-scroll-y ml-3">
                <Table className="table table-bordered table-striped mb-0 w-100" id="CustomerTable" striped >
                    <thead>
                        <tr>
                            <th className="col-2" scope="row">Customer Id</th>
                            <th className="col-4">Customer Name</th>
                            <th className="col-3">Mobile Number</th>
                            <th className="col-1">City</th>
                            <th className="col-2">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.length > 0 ? customers.map((customer, i) => (
                                <tr key={i}>
                                    <th className="text-center" scope="row">{customer.custID}</th>
                                    <td>{customer.custName}</td>
                                    <td>{customer.custMobNo}</td>
                                    <td>{customer.custCity}</td>
                                    <td><Link to={`/dashboard/updatecustomers/${customer.custID}`}><button className="btn btn-outline-dark  ml-2">Update</button></Link></td>
                                </tr>
                            )) : <tr><td className="text-center" colSpan={5}>No Customers Found or Server Down</td></tr>
                        }
                    </tbody>
                </Table>
            </div>


            <div className="container text-center mt-3 p-3">
                <form className="form-inline justify-content-center" onSubmit={deleteCustomer} action="" method="post" id="delete_customer_form">
                    <div className="form-group">
                        <input type="text" className="form-control mx-3" id="deletecustid" placeholder="Enter Customer Id" onChange={(e) => {
                            setDeleteCust({ ...deleteCust, deletecustid: e.target.value })
                        }} />
                        <button type="submit" className="btn btn-outline-danger mx-3">Delete Customer</button>
                    </div>
                </form>
            </div>

            <div className="container text-center p-3">
                <Button color="info" outline onClick={printfunction}>Download Customer Report</Button>
            </div>

        </div>
    )
}

export default AllCustomers