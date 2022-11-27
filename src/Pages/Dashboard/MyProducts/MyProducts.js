import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/UserContext";
import Spinner from "../../Shared/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myproducts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myproducts?email=${user?.email}`
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const handleDeleteProduct = (id) => {
    const sureDelete = window.confirm("Please! Confirm Delete This Product");
    if (sureDelete) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            refetch();
            toast.success("Product Deleted Successfully");
          }
        });
    } else {
      return;
    }
  };
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-blue-800 my-8 text-center">
        My All Products
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Post Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myProducts &&
              myProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="btn btn-sm text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.postDate}</td>
                  <td>
                    {product.isSold ? (
                      <p className="text-blue-700 font-bold">SOLD</p>
                    ) : (
                      <>
                        <p className="text-blue-700 font-bold">
                          AVAILABLE{" "}
                          <span>
                            {" "}
                            <button className="btn bg-primary bg-gradient-to-r from-primary to-secondary btn-sm">
                              Advertise
                            </button>
                          </span>
                        </p>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
