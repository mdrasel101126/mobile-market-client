import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import SellerDashboard from "../SellerDashboard/SellerDashboard";

const Dashboard = () => {
  return (
    <div>
      <Header></Header>
      <SellerDashboard></SellerDashboard>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
