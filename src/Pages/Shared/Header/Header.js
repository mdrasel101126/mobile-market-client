import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/mobile.png";
import { AuthContext } from "../../../Context/UserContext";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const items = (
    <React.Fragment>
      <li>
        <Link className="font-bold" to="/">
          Home
        </Link>
      </li>
      {user?.uid && (
        <li>
          <Link className="font-bold" to="/dashboard">
            Dashboard
          </Link>
        </li>
      )}
      <li>
        <Link className="font-bold" to="/blogs">
          Blog
        </Link>
      </li>
      <>
        {user?.uid ? (
          <>
            <li>
              <button
                onClick={handleLogOut}
                className="btn btn-info  rounded-3xl"
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link className="font-bold" to="/login">
              Login
            </Link>
          </li>
        )}
      </>
    </React.Fragment>
  );
  return (
    <div className="navbar flex justify-between bg-neutral lg:text-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {items}
          </ul>
        </div>
        <>
          <Link to="/">
            <img
              className="w-16 h-16 hidden sm:block rounded-full"
              src={logo}
              alt=""
            />
          </Link>
          <Link
            to="/"
            className="text-xl font-bold ml-2 text-white lg:text-neutral-content "
          >
            MobileMarket
          </Link>
        </>
      </div>
      <div className="navbar-center ml-0 hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{items}</ul>
      </div>
    </div>
  );
};

export default Header;
