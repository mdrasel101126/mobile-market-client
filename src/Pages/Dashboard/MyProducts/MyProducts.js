import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import Spinner from "../../Shared/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { data: myProducts = [], isLoading } = useQuery({
    queryKey: ["myproducts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myproducts?email=${user?.email}`
      );
      const data = await res.json();
      console.log(data);
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <h1>This is my products</h1>
    </div>
  );
};

export default MyProducts;
