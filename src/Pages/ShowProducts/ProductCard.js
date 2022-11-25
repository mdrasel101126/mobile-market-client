import React from "react";

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
  } = product;
  return (
    <div className="card  shadow-xl">
      <figure>
        <img className="w-full h-52" src={image} alt="Shoes" />
      </figure>
      <div className="p-4">
        <h2 className="font-bold">Product Name: {productName}</h2>
        <p>Location: {sellerLocation}</p>
        <p>Resale Price: ${price}</p>
        <p>Original Price: ${originalPrice}</p>
        <p>Years of Use: {usageTime}</p>
        <p>Posted On: {postDate}</p>
        <p>
          Seller Name: {sellerName}
          <span>*</span>
        </p>

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
