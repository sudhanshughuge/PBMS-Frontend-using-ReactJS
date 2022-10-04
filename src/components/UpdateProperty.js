import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import { getToken } from "../auth";

function UpdateProperty() {

    useEffect(() => {
        document.title = "Update Property || Property Booking Management System"
    }, [])

    const [property, setProperty] = useState({})
    const [oldproperty, setOldProperty] = useState({})
    const [cityList, setCityList] = useState({})

    const handleForm = (e) => {
        putDatatoServer(property);
        e.preventDefault();
    }

    const {updatePropid} = useParams();

    const putDatatoServer = (property) => {
        axios.put(`${base_url}/property/${updatePropid}`, property, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.success("Property Updated Successfully", {
                    toastId: "propaddedtoast"
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getOldPropertyData = () => {

        axios.get(`${base_url}/property/${updatePropid}`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setOldProperty(response.data)
                setProperty(response.data)
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
        getOldPropertyData();
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
                                <h2>Update Property Details</h2>
                            </div>
                            <input id="PropID" placeholder="Property ID" className="form-control m-3" type="text" disabled defaultValue={updatePropid} />
                            <input name="PropName" placeholder="Enter Property Name" className="form-control m-3" type="text" defaultValue={oldproperty.propName} onChange={(e) => {
                                setProperty({ ...property, propName: e.target.value })
                            }} />
                            <input name="PropAddress" placeholder="Property Address" className="form-control m-3" type="text" defaultValue={oldproperty.propAddress} onChange={(e) => {
                                setProperty({ ...property, propAddress: e.target.value })
                            }} />

                            <div className="form-inline row ">
                                <div className="col-6">
                                    <select className="form-control w-100 ml-3" id="propCity" defaultValue={oldproperty.propCity} value={oldproperty.propCity} onChange={(e) => {
                                        setProperty({ ...property, propCity: e.target.value })
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
                                    <select className="form-control w-100 ml-3" id="state" defaultValue={oldproperty.state} value={oldproperty.state} onChange={(e) => {
                                        setProperty({ ...property, state: e.target.value })
                                    }}>
                                        <option>Select State</option>
                                        <option>Maharashtra</option>
                                    </select>

                                </div>

                            </div>
                            <input id="Pincode" placeholder="Pin Code" className="form-control m-3" type="text" defaultValue={oldproperty.pincode} onChange={(e) => {
                                setProperty({ ...property, pincode: e.target.value })
                            }} />
                            <input name="PropRate" placeholder="Enter Property Rate" className="form-control m-3" disabled type="text" defaultValue={oldproperty.rate} onChange={(e) => {
                                setProperty({ ...property, rate: e.target.value })
                            }} />

                            <button type="submit" className="btn btn-outline-success mx-3">Update Property</button>
                            <Link to="/dashboard/viewproperties"><button className="btn btn-outline-warning mx-3">Back</button></Link>
                            
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default UpdateProperty