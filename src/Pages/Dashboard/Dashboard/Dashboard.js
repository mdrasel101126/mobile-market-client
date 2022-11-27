import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";
import useUser from "../../../hooks/useUser";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isUser] = useUser(user?.email);
  return (
    <div>
      <Header></Header>
      <div className="drawer h-auto  drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <div className="text-end lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {isUser && (
              <li className="mb-4">
                <Link
                  to="/dashboard/myorders"
                  className="btn btn-primary bg-gradient-to-r from-primary to-secondary w-full text-white"
                >
                  My Orders
                </Link>
              </li>
            )}
            {isSeller && (
              <>
                <li className="mb-4">
                  <Link
                    to="/dashboard/addproduct"
                    className="btn btn-primary bg-gradient-to-r from-primary to-secondary w-full text-white"
                  >
                    Add Products
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/dashboard/myproducts"
                    className="btn btn-primary bg-gradient-to-r from-primary to-secondary w-full text-white"
                  >
                    My Products
                  </Link>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li className="mb-4">
                  <Link
                    to="/dashboard/allbuyer"
                    className="btn btn-primary bg-gradient-to-r from-primary  to-secondary w-full text-white"
                  >
                    All Buyers
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/dashboard/allseller"
                    className="btn btn-primary bg-gradient-to-r from-primary  to-secondary w-full text-white"
                  >
                    All Sellers
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/dashboard/reportedItems"
                    className="btn btn-primary bg-gradient-to-r from-primary  to-secondary w-full text-white"
                  >
                    Reported Itmes
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
