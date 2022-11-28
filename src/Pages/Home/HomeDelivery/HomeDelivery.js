import React from "react";
import { Link } from "react-router-dom";
import deliveryLogo from "../../../assets/Images/home-delivery-hd-png-download.png";

const HomeDelivery = () => {
  return (
    <div className="hero my-14 w-3/4 md:h-3/5 lg:w-3/5 mx-auto">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={deliveryLogo}
          className=" rounded-xl shadow-2xl w-3/4 lg:w-1/2"
          alt=""
        />
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold ">Home Delivery!</h1>
          <p className="py-6">
            We provide fast home delivery.It will reduce your time and
            exhaustion.Please always stay with us.
          </p>
          <Link to="/register">
            <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeDelivery;
