import is from "date-fns/esm/locale/is/index.js";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { AuthContext } from "../../Context/UserContext";
import useUser from "../../hooks/useUser";

const ProductCard = ({ product, setSelectedProduct }) => {
  const {
    image,
    productName,
    sellerLocation,
    price,
    originalPrice,
    postDate,
    usageTime,
    sellerName,
    sellerVerified,
    purchaseDate,
    _id,
  } = product;
  const { user } = useContext(AuthContext);
  const [isUser] = useUser(user?.email);
  const handleReportItem = (id) => {
    if (!isUser) {
      toast.error("Sorry!! Create an User Account To Report Product");
      return;
    }
    const sureReport = window.confirm("Please! Confirm Report This Product");
    if (sureReport) {
      const reportedItem = {
        image,
        productName,
        sellerLocation,
        price,
        originalPrice,
        postDate,
        usageTime,
        sellerName,
        sellerVerified,
        productId: _id,
        userEmail: user?.email,
      };
      fetch("https://mobile-market-server-delta.vercel.app/reportedItems", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem(
            "mobile-market-sectret"
          )}`,
        },
        body: JSON.stringify(reportedItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("This Product Reported Successfully");
          }
        });
    }
  };
  return (
    <div className="card  shadow-xl">
      <figure>
        <img className="w-full h-52" src={image} alt="Shoes" />
      </figure>
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold">Product Name: {productName}</h2>
          <button
            onClick={() => handleReportItem(_id)}
            className="btn btn-xs text-red-600"
          >
            Report
          </button>
        </div>
        <p>Location: {sellerLocation}</p>
        <p>Resale Price: ${price}</p>
        <p>Original Price: ${originalPrice}</p>
        <p>Purchaged Date: {purchaseDate}</p>
        <p>Years of Use: {usageTime}</p>
        <p>Posted On: {postDate}</p>
        <div className="flex flex-row items-center">
          <p>Seller Name: {sellerName}</p>
          {sellerVerified && (
            <p>
              <FaCheck className="text-blue-700 h-4 w-4 p-[1px] border-2 rounded-full border-blue-700 ml-1 "></FaCheck>
            </p>
          )}
        </div>

        <div className="text-center mt-4">
          <label
            onClick={() => setSelectedProduct(product)}
            htmlFor="product-modal"
            className="btn btn-primary  bg-gradient-to-r from-primary to-secondary"
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
