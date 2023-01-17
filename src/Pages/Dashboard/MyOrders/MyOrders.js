import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";
import Spinner from "../../Shared/Spinner/Spinner";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: myOrders = [], isLoading } = useQuery({
    queryKey: ["myorders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://mobile-market-server-delta.vercel.app/bookings?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "mobile-market-sectret"
            )}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="my-16">
      <h1 className="text-2xl text-blue-800 text-center my-6">
        Your All Orders
      </h1>
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
              {myOrders &&
                myOrders.map((order) => (
                  <tr key={order._id}>
                    <th>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={order.image} alt="" />
                        </div>
                      </div>
                    </th>
                    <td>{order.productName}</td>
                    <td>{order.price}</td>
                    <td>
                      {!order.isSold && !order.paid && (
                        <Link to={`/dashboard/payment/${order._id}`}>
                          <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary btn-sm">
                            Pay
                          </button>
                        </Link>
                      )}
                      {order.isSold && order.paid && (
                        <p className="text-green-700">Paid</p>
                      )}
                      {order.isSold && !order.paid && (
                        <p className="text-red-700">Unavailable</p>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {myOrders?.length === 0 && (
        <p className="text-xl text-red-600 text-center">No Products Found!!</p>
      )}
    </div>
  );
};

export default MyOrders;
