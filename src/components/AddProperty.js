import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import base_url from "../api/Service";
import { getToken } from "../auth";

function AddProperty() {

    useEffect(() => {
        document.title = "Add Property || Property Booking Management System"
    }, [])

    const [property, setProperty] = useState({
        propName:'',
        propAddress:'',
        propCity:'',
        state:'',
        pincode:'',
        rate:''
    })
    const [propid, setPropId] = useState({})
    const [cityList, setCityList] = useState({})

    const getPropID = () => {

        axios.get(`${base_url}/property/maxid`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setPropId(response.data + 1)
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

        axios.get(`${base_url}/cities/`, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                setCityList(response.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const init=()=>{
        getPropID();
        getCityList();
        setProperty({
            propName:'',
            propAddress:'',
            propCity:'',
            state:'',
            pincode:'',
            rate:''
        });
    }
    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, [])

    const handleForm = (e) => {
        e.preventDefault();
        console.log(property)
        if(property.propName === "" || property.propAddress === "" || property.propCity === "" || property.rate === "" || property.state === "" || property.pincode === ""){
            toast.error("No field can be Blank !")
            return;
        } else if (property.pincode.length !== 6){
            toast.error("Invalid PinCode !")
            return;
        } else {
            postDatatoServer(property);
            init();
        }
    }


    const postDatatoServer = (data) => {
        axios.post(`${base_url}/property/`, data, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then(
            (response) => {
                toast.success("Property Added Successfully", {
                    toastId: "propaddedtoast"
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <div>
            <div className="container-fluid ">
                <div className="row col-12">

                    <div className="w-100">

                        <form className="justify-content-center text-center" onSubmit={handleForm} action="/" method="post" id="property_form">

                            <div className="alert alert-info text-center w-100 p-3 ml-3" role="alert">
                                <h2>Property Details</h2>
                            </div>
                            <input id="PropID" placeholder="Property ID" className="form-control m-3" type="text" disabled value={propid} />
                            <input name="PropName" placeholder="Enter Property Name" value={property.propName} className="form-control m-3" type="text" onChange={(e) => {
                                setProperty({ ...property, propName: e.target.value })
                            }} />
                            <input name="PropAddress" placeholder="Property Address" value={property.propAddress} className="form-control m-3" type="text" onChange={(e) => {
                                setProperty({ ...property, propAddress: e.target.value })
                            }} />
                            <div className="form-inline row ">
                                <div className="col-6">
                                    <select className="form-control w-100 ml-3" value={property.propCity} id="city" onChange={(e) => {
                                        setProperty({ ...property, propCity: e.target.value })
                                    }}>
                                        <option value={''}>Select City</option>

                                        {
                                            cityList.length > 0 ? cityList.map((city, i) => (

                                                <option key={i}>{city.city}</option>


                                            )) : <option>Server Down or No City Found</option>
                                        }

                                    </select>
                                </div>
                                <div className="col-6">
                                    <select className="form-control w-100 ml-3" value={property.state} id="state" onChange={(e) => {
                                        setProperty({ ...property, state: e.target.value })
                                    }}>
                                        <option value={''}>Select State</option>
                                        <option value={'Maharashtra'}>Maharashtra</option>
                                    </select>

                                </div>

                            </div>
                            <input name="Pincode" placeholder="Pin Code" value={property.pincode} className="form-control m-3" type="text" onChange={(e) => {
                                setProperty({ ...property, pincode: e.target.value })
                            }} />
                            <input name="PropRate" placeholder="Enter Property Rate" value={property.rate} className="form-control m-3" type="text" onChange={(e) => {
                                setProperty({ ...property, rate: e.target.value })
                            }} />
                            <button type="submit" className="btn btn-outline-success mx-3">Add Property</button>
                            <button type="reset" className="btn btn-outline-danger mx-3">Clear</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default AddProperty