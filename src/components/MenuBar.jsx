import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListGroup } from "reactstrap";
import { checkAdmin, doLogout, isLoggedIn } from "../auth";

function MenuBar() {

    let navigate = useNavigate()
    const [login, setLogin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        setLogin(isLoggedIn())
        setIsAdmin(checkAdmin())
    }, [login])

    const logout = () => {
        doLogout(() => {
            setLogin(false)
            navigate("/")
        })
    }

    return (
        <div>
            <ListGroup>

                {
                    isAdmin && (
                        <Link className="list-group-item list-group-item-action" tag="a" to="admin" >Manage Users</Link>
                    )
                }

                <Link className="list-group-item list-group-item-action" tag="a" to="" >Home</Link>
                <br />
                <Link className="list-group-item list-group-item-action" tag="a" to="addcustomer" >Add Customer</Link>
                <Link className="list-group-item list-group-item-action" tag="a" to="viewcustomers" >View Customers</Link>

                <Link className="list-group-item list-group-item-action" tag="a" to="addproperty" >Add Property</Link>
                <Link className="list-group-item list-group-item-action" tag="a" to="viewproperties" >View Properties</Link>

                <Link className="list-group-item list-group-item-action" tag="a" to="addbooking" >Book Property</Link>
                <Link className="list-group-item list-group-item-action" tag="a" to="viewbookings" >View Bookings</Link>

                <Link className="list-group-item list-group-item-action" tag="a" to="addpayment" >Payment</Link>
                <Link className="list-group-item list-group-item-action" tag="a" to="viewpayments" >View Payments</Link>
                <br />
                <Link className="list-group-item list-group-item-action" onClick={logout} tag="a" to="/" >Logout</Link>
            </ListGroup>
        </div>
    )
}

export default MenuBar;