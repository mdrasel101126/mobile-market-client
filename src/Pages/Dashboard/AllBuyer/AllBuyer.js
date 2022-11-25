import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../Shared/Spinner/Spinner";

const AllBuyer = () => {
  const { data: allBuyer = [], isLoading } = useQuery({
    queryKey: ["allbuyer"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allbuyer");
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
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
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {allBuyer &&
              allBuyer.map((buyer, index) => (
                <tr key={buyer._id}>
                  <th>{index + 1}</th>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyer;
