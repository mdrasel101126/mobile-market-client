import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../Shared/Spinner/Spinner";

const ReportedItems = () => {
  const {
    data: reportedItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedItems"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reportedItems", {
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "mobile-market-sectret"
          )}`,
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  const [spinner, setSpinner] = useState(false);
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const handleDeleteReportedProduct = (id) => {
    console.log(id);
    const sureDelete = window.confirm("Please! Confirm Delete This Product");
    if (sureDelete) {
      setSpinner(true);
      fetch(`http://localhost:5000/reportedItems/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "mobile-market-sectret"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            setSpinner(false);
            refetch();
            toast.success("Product Deleted Successfully");
          }
        });
    }
  };
  return (
    <div>
      {spinner && <Spinner></Spinner>}
      <h1>All Reported Products</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportedItems &&
                reportedItems.map((product) => (
                  <tr key={product._id}>
                    <th>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product.image} alt="" />
                        </div>
                      </div>
                    </th>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteReportedProduct(product._id)}
                        className="btn btn-sm text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {reportedItems?.length === 0 && (
        <p className="text-xl text-red-700 text-center">No Product Found!!!</p>
      )}
    </div>
  );
};

export default ReportedItems;
