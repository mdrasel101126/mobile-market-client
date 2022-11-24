import React from "react";
import { Link } from "react-router-dom";
import homePageBanner from "../../../assets/Images/homepageBanner.png";

const HomePageBanner = () => {
  return (
    <div className="mt-8">
      <div className="relative  w-full">
        <img src={homePageBanner} className="w-full h-96" alt="" />
        <div className="absolute transform -translate-y-1/2 left-5  top-1/2">
          <h1 className="text-2xl font-bold">Welcome To Mobile Market</h1>
          <p className="font-bold">You can buy and sell used mobile here.</p>
          <br />
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

export default HomePageBanner;
