import React from "react";
import { useRouteError } from "react-router-dom";

const DisplayError = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, Something Went Wrong</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default DisplayError;
