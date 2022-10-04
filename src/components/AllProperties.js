import axios from "axios";
import jsPDF from "jspdf";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Table } from "reactstrap";
import base_url from "../api/Service";
import { getToken } from "../auth";

function AllProperties() {

    useEffect(() => {
        document.title = "Property Report || Property Booking Management System"
    }, [])


    const [properties, setProperties] = useState([])

    const getAllPropertiesFromServer = () => {
        axios.get(`${base_url}/property/`, { headers: { "Authorization": `Bearer ${getToken()}` } }).then(
            (response) => {
                toast.success("Property List has been Updated", {
                    toastId: "loadedtoast"
                });
                setProperties(response.data)
            },
            (error) => {
                console.log(error);
                toast.error("Server Down", {
                    toastId: "errortoast"
                });
            }
        );
    };

    const init = () => {
        getAllPropertiesFromServer();

    }
    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, [])

    const printfunction = () => {
        const doc = new jsPDF()
        doc.text("Property Details", 20, 10)
        doc.autoTable({ html: '#PropertyTable' })
        doc.save('propertydetails.pdf')
        toast.info("Property Report Downloaded Successfully", {
            toastId: "downloadtoast"
        })
    }

    const [deleteProp, setDeleteProp] = useState({})

    const deleteProperty = (e) => {
        deleteDatafromServer(deleteProp);
        e.preventDefault();
    }

    const deleteDatafromServer = (data) => {
        axios.delete(`${base_url}/property/${data.deletepropid}`, { headers: { "Authorization": `Bearer ${getToken()}` } }).then(
            (response) => {
                toast.error("Property Deleted", {
                    toastId: "deletetoast"
                })
                init();
            },
            (error) => {
                console.log(error);
                toast.info("You are not an Admin or Property Not Found", {
                    toastId: "deleteinfotoast"
                })
            }
        )
    }

    return (
        <div className="ml-3">
            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                <h2>Properties Reports</h2>
            </div>
            <div className="my-custom-scrollbar table-wrapper-scroll-y ml-3">
                <Table className="table table-bordered table-striped mb-0 w-100" id="PropertyTable" striped >
                    <thead>
                        <tr>
                            <th className="col-2" scope="row">Property Id</th>
                            <th className="col-3">Property Name</th>
                            <th className="col-1">City</th>
                            <th className="col-2">Rate</th>
                            <th className="col-2">Booking Status</th>
                            <th className="col-2">Update</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            properties.length > 0 ? properties.map((property, i) => (
                                <tr key={i}>
                                    <th className="text-center" scope="row">{property.propID}</th>
                                    <td>{property.propName}</td>
                                    <td>{property.propCity}</td>
                                    <td>{property.rate}</td>
                                    <td>{property.bookStatus}</td>
                                    <td><Link to={`/dashboard/updateproperty/${property.propID}`}><button className="btn btn-outline-dark  ml-2">Update</button></Link></td>
                                </tr>
                            )) : <tr><td className="text-center" colSpan={6}>No Properties Found or Server Down</td></tr>
                        }
                    </tbody>
                </Table>
            </div>
            <div className="container text-center mt-3 p-3">
                <form className="form-inline justify-content-center" onSubmit={deleteProperty} action="" method="post" id="delete_property_form">
                    <div className="form-group">
                        <input type="text" className="form-control mx-3" id="deletepropid" placeholder="Enter Property Id" onChange={(e) => {
                            setDeleteProp({ ...deleteProp, deletepropid: e.target.value })
                        }} />
                        <button type="submit" className="btn btn-outline-danger mx-3">Delete Customer</button>
                    </div>
                </form>
            </div>

            <div className="container text-center p-3">
                <Button color="info" outline onClick={printfunction}>Download Property Report</Button>
            </div>
        </div>
    )
}

export default AllProperties