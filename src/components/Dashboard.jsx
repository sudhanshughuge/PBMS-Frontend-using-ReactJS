import React from "react";
import { Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import AddBooking from "./AddBooking";
import AddCustomer from "./AddCustomer";
import AddPayment from "./AddPayment";
import AddProperty from "./AddProperty";
import AllBookings from "./AllBookings";
import AllCustomers from "./AllCustomers";
import AllPayments from "./AllPayments";
import AllProperties from "./AllProperties";
import AllUsers from "./AllUsers";
import Base from "./Base";
import Home from "./Home";
import MenuBar from "./MenuBar";
import SignUpForm from "./SignUpForm";
import UpdateBooking from "./UpdateBooking";
import UpdateCustomer from "./UpdateCustomer";
import UpdateProperty from "./UpdateProperty";
import UpdateUser from "./UpdateUser";

const Dashboard = () => {
    return (
        <div>
            <Base>
            <Container>
          <Row>
            <Col md={3}>  <MenuBar />  </Col>

            <Col md={9}>

              <Routes>
              
                <Route path="/admin" element={<AllUsers />} exact />
                <Route path="/adduser" element={<SignUpForm />} exact />
                <Route path="/updateuser/:updateUserid" element={<UpdateUser />} exact />

                <Route path="/" element={<Home />} exact />
                <Route path="/addcustomer" element={<AddCustomer />} exact />
                <Route path="/viewcustomers" element={<AllCustomers />} exact />
                <Route path="/updatecustomers/:updateCustid" element={<UpdateCustomer />} exact />

                <Route path="/addproperty" element={<AddProperty />} exact />
                <Route path="/viewproperties" element={<AllProperties />} exact />
                <Route path="/updateproperty/:updatePropid" element={<UpdateProperty />} exact />

                <Route path="/addbooking" element={<AddBooking />} exact />
                <Route path="/viewbookings" element={<AllBookings />} exact />
                <Route path="/updatebookings/:updateBookid" element={<UpdateBooking />} exact />

                <Route path="/addpayment" element={<AddPayment />} exact/>
                <Route path="/viewpayments" element={<AllPayments />} exact />
                
              </Routes>

            </Col>
          </Row>
        </Container>
        </Base>
        </div>
    )
}

export default Dashboard