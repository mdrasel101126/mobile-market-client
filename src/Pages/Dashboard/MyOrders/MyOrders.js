import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import Spinner from "../../Shared/Spinner/Spinner";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: myOrders = [], isLoading } = useQuery({
    queryKey: ["myorders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user.email}`
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
    <div>
      <h1>Your All Orders</h1>
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
                      <button className="btn">X</button>
                    </th>
                    <td>{order.productName}</td>
                    <td>{order.price}</td>
                    <td>
                      <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary btn-sm">
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
