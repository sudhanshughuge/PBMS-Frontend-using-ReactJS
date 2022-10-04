import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function Base({ title = "Welcome to Property Booking Management System", children }) {

    return (
        <div>
            <Header />

            {children}

            <Footer />
        </div>
    )
}

export default Base;