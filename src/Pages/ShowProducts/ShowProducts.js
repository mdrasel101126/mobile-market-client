import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Shared/Spinner/Spinner";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ShowProducts = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: showProducts, isLoading } = useQuery({
    queryKey: ["showProducts", id],
    queryFn: async () => {
      const res = await fetch(
        `https://mobile-market-server-delta.vercel.app/products/${id}`
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
    <div className="my-12">
      <h1 className="text-center text-2xl text-blue-900">Products</h1>
      <p className="text-center text-blue-900 mb-12">We Provie Best Products</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  mx-auto">
        {showProducts &&
          showProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              setSelectedProduct={setSelectedProduct}
            ></ProductCard>
          ))}
      </div>
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        ></ProductModal>
      )}
      {showProducts?.length === 0 && (
        <p className="text-xl text-red-600 text-center">No Product Found!!</p>
      )}
    </div>
  );
};

export default ShowProducts;
