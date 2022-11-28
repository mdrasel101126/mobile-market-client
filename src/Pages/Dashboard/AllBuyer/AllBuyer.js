import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Spinner from "../../Shared/Spinner/Spinner";

const AllBuyer = () => {
  const {
    data: allBuyer = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allbuyer"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allbuyer", {
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
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const handleDeleteBuyer = (id) => {
    const sureDelete = window.confirm("Please Confirm Delete Buyer");
    if (sureDelete) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "mobile-market-sectret"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            refetch();
            toast.success("Buyer Deleted Successfully");
            console.log(data);
          }
        });
    }
  };
  return (
    <div className="my-8">
      <h1 className="text-xl text-center font-bold my-4">
        All Buyers Of This Website
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBuyer &&
              allBuyer.map((buyer, index) => (
                <tr key={buyer._id}>
                  <th>{index + 1}</th>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteBuyer(buyer._id)}
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
      {allBuyer?.length === 0 && (
        <p className="text-xl text-red-600 text-center">No Buyer Found!!</p>
      )}
    </div>
  );
};

export default AllBuyer;
