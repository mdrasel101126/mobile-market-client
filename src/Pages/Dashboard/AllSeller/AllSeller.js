import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Spinner from "../../Shared/Spinner/Spinner";
import { FaCheck } from "react-icons/fa";

const AllSeller = () => {
  const {
    data: allSeller = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allseller"],
    queryFn: async () => {
      const res = await fetch(
        "https://mobile-market-server-delta.vercel.app/allseller"
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const handleVerifySeller = (id) => {
    console.log(id);
    const sureVerify = window.confirm("Please Confirm Verify Seller");
    if (sureVerify) {
      fetch(
        `https://mobile-market-server-delta.vercel.app/verifySeller/${id}`,
        {
          method: "PUT",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            console.log(data);
            refetch();
            toast.success("Verified Successfully");
          }
          console.log(data);
        });
    } else {
      return;
    }
  };
  const handleDeleteSeller = (id) => {
    const sureDelete = window.confirm("Please Confirm Delete Seller");
    if (sureDelete) {
      fetch(`https://mobile-market-server-delta.vercel.app/users/${id}`, {
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
            toast.success("Seller Deleted Successfully");
            console.log(data);
          }
        });
    }
  };
  return (
    <div className="my-20">
      <h1 className="text-xl text-center font-bold my-4">
        All Sellers Of This Website
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
            {allSeller &&
              allSeller.map((seller, index) => (
                <tr key={seller._id}>
                  <td>
                    <button
                      onClick={() => handleDeleteSeller(seller._id)}
                      className="btn btn-sm text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="flex flex-row items-center">
                    <span> {seller.name}</span>
                    <span>
                      {seller.sellerVerified && (
                        <FaCheck className="text-blue-700 h-4 w-4 p-[1px] border-2 rounded-full border-blue-700 ml-1 "></FaCheck>
                      )}
                    </span>
                  </td>
                  <td>{seller.email}</td>
                  <td>
                    {seller.sellerVerified ? (
                      <p className="text-blue-700 font-bold">Verified</p>
                    ) : (
                      <button
                        onClick={() => handleVerifySeller(seller._id)}
                        className="btn btn-primary  bg-gradient-to-r from-primary to-secondary btn-sm"
                      >
                        Verify Seller
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {allSeller?.length === 0 && (
        <p className="text-xl text-red-600 text-center">No Seller Found!!</p>
      )}
    </div>
  );
};

export default AllSeller;
