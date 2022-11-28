import React, { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";

const DashboardCommon = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="my-16 text-center">
      <h1 className="text-2xl text-blue-800 font-bold">
        Wellcome {user?.displayName} To Your Dashboard
      </h1>
      <p className="text-blue-800">All Your Activities are Controlled Here</p>
    </div>
  );
};

export default DashboardCommon;
