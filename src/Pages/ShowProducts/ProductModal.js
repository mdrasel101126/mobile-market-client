import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/UserContext";
import Spinner from "../Shared/Spinner/Spinner";

const ProductModal = ({ selectedProduct, setSelectedProduct }) => {
  const {
    _id,
    image,
    productName,
    sellerLocation,
    price,
    originalPrice,
    postDate,
    usageTime,
    sellerName,
    sellerVerified,
    sellerEmail,
  } = selectedProduct;
  const [spinner, setSpinner] = useState(false);
  const { user } = useContext(AuthContext);
  const handleBookingProduct = (event) => {
    event.preventDefault();
    setSpinner(true);
    const form = event.target;
    const userName = form.userName.value;
    const userEmail = form.userEmail.value;
    const price = form.price.value;
    const productName = form.productName.value;
    const userPhone = form.userPhone.value;
    const userLocation = form.userLocation.value;
    const bookingProduct = {
      userName,
      userEmail,
      price,
      productName,
      userPhone,
      userLocation,
      sellerName,
      sellerEmail,
      productId: _id,
    };
    //console.log(bookingProduct);
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setSpinner(false);
          toast.success("Booking Successfull");
          setSelectedProduct(null);
        }
      })
      .catch((err) => {
        setSpinner(false);
        console.log(err);
      });
  };
  return (
    <>
      <input type="checkbox" id="product-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="product-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {spinner && <Spinner></Spinner>}
          <h3 className="text-lg font-bold text-center my-4">
            Product Information
          </h3>
          <form
            onSubmit={handleBookingProduct}
            className="grid grid-cols-1 gap-4"
          >
            <input
              type="text"
              name="userName"
              defaultValue={user?.displayName}
              placeholder="Type here"
              disabled
              className="input input-bordered w-full max-w-x"
            />
            <input
              type="text"
              name="userEmail"
              defaultValue={user?.email}
              placeholder="Type here"
              disabled
              className="input input-bordered w-full max-w-x"
            />
            <input
              type="text"
              name="productName"
              defaultValue={productName}
              placeholder="Type here"
              disabled
              className="input input-bordered w-full max-w-x"
            />
            <input
              type="text"
              name="price"
              defaultValue={price}
              placeholder="Type here"
              disabled
              className="input input-bordered w-full max-w-x"
            />
            <input
              type="text"
              name="userPhone"
              placeholder="Enter Phone Number"
              className="input input-bordered w-full max-w-x"
              required
            />
            <input
              type="text"
              name="userLocation"
              placeholder="Enter Your Location"
              className="input input-bordered w-full max-w-x"
              required
            />

            <input
              type="submit"
              className="btn btn-primary  bg-gradient-to-r from-primary to-secondary w-full max-w-x"
              value="Book"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
