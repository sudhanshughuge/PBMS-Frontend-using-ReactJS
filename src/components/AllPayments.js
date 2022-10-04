import axios from "axios";
import jsPDF from "jspdf";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Table } from "reactstrap";
import base_url from "../api/Service";
import { getToken } from "../auth";

function AllPayments() {

    useEffect(()=> {
        document.title="Payment Report || Property Booking Management System"
    },[])

    const [payments, setPayments] = useState([])

    const getAllPaymentsFromServer = () => {
        axios.get(`${base_url}/payments/`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.success("Payment List has been Updated", {
                    toastId: "loadedtoast"
                });
                setPayments(response.data)
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
        getAllPaymentsFromServer();
    }, [])

    const printfunction = () => {
        const doc = new jsPDF()
        doc.text("Booking Details", 20, 10)
        doc.autoTable({ html: '#PaymentTable' })
        doc.save('Paymentdetails.pdf')
        toast.info("Payments Report Downloaded Successfully", {
            toastId: "downloadtoast"
        })
    }

    return (
        <div className="ml-3">
            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                <h2>Payments Reports</h2>
            </div>
            <div className="my-custom-scrollbar table-wrapper-scroll-y ml-3">
                <Table className="table table-bordered table-striped mb-0 w-100" id="PaymentTable" striped >
                    <thead>
                        <tr>
                            <th className="col-2" scope="row">Payment Id</th>
                            <th className="col-4">Customer Name</th>
                            <th className="col-2">Payment Date</th>
                            <th className="col-2">Rate</th>
                            <th className="col-2">Amount Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.length > 0 ? payments.map((payment, i) => (
                                <tr key={i}>
                                    <th className="text-center" scope="row">{payment.payID}</th>
                                    <td>{payment.cname}</td>
                                    <td>{payment.payDate}</td>
                                    <td>{payment.rate}</td>
                                    <td>{payment.amountRem}</td>
                                </tr>
                            )) : <tr><td className="text-center" colSpan={6}>No Properties Found or Server Down</td></tr>
                        }
                    </tbody>
                </Table>
            </div>

            <div className="container text-center p-3">
                <Button color="info" outline onClick={printfunction}>Download Payments Report</Button>
            </div>

        </div>
    )
}

export default AllPayments