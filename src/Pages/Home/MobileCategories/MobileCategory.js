import React from "react";
import { Link } from "react-router-dom";

const MobileCategory = ({ category }) => {
  const { categoryName, image, _id } = category;
  return (
    <div className="card w-48 h-48 shadow-xl m-4">
      <figure className="p-4">
        <img src={image} alt="" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{categoryName}</h2>
        <Link to={`/category/${_id}`}>
          <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MobileCategory;
