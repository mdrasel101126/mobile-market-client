import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import notFoundLogo from "../../../assets/Images/page-not-found.png";
import { AuthContext } from "../../../Context/UserContext";

const DisplayError = () => {
  const error = useRouteError();
  const { logOut } = useContext(AuthContext);
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
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="text-center">
        {" "}
        <img
          className="max-w-xs h-auto rounded-full"
          src={notFoundLogo}
          alt=""
        />
        <p>Sorry, Something Went Wrong</p>
        <p className="text-red-600 font-semibold">
          <i>{error.statusText || error.message}</i>
        </p>
        <p>
          Please{" "}
          <button onClick={handleLogOut} className="btn btn-sm btn-ghost">
            Log Out
          </button>{" "}
          and Login Again
        </p>
      </div>
    </div>
  );
};

export default DisplayError;
