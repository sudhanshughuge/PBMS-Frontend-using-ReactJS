
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AddCustomer from './components/AddCustomer';
import AllCustomers from './components/AllCustomers'

import { Col, Container, Row } from 'reactstrap';
import {ToastContainer} from 'react-toastify';
import MenuBar from './components/MenuBar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProperty from './components/AddProperty';
import AllProperties from './components/AllProperties';
import AddBooking from './components/AddBooking';
import AllBookings from './components/AllBookings';
import AddPayment from './components/AddPayment';
import AllPayments from './components/AllPayments';
import UpdateCustomer from './components/UpdateCustomer';
import UpdateProperty from './components/UpdateProperty';
import UpdateBooking from './components/UpdateBooking';



function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Header />
        <Container>
          <Row>
            <Col md={3}>  <MenuBar />  </Col>

            <Col md={9}>

              <Routes>

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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
