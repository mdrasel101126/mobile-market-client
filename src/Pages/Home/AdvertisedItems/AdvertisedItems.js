import React, { useEffect, useState } from "react";
import Spinner from "../../Shared/Spinner/Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const AdvertisedItems = () => {
  const [advertisedProducts, setAdvertisedProducts] = useState(null);
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    axios
      .get("https://mobile-market-server-delta.vercel.app/advertised")
      .then(function (response) {
        // handle success
        setSpinner(false);
        const data = response.data;
        setAdvertisedProducts(data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        setSpinner(false);
        console.log(error);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {spinner && <Spinner></Spinner>}
      {advertisedProducts?.length > 0 && (
        <div className="w-11/12 mx-auto mt-16">
          <h1 className="text-center text-xl font-bold">
            Advertised Items for You
          </h1>
          <p className="text-center">
            Please Find Your Product from Categories
          </p>
          {spinner && <Spinner></Spinner>}
          <Slider {...settings}>
            {advertisedProducts &&
              advertisedProducts.map((product) => (
                <div className=" m-4">
                  <figure className="p-4">
                    <img
                      src={product?.image}
                      alt=""
                      className="rounded-xl w-3/4 md:w-3/5 lg:w-1/3 h-60 md:h-[400px] lg:h-[420px] mx-auto"
                    />
                  </figure>
                  <div className="flex flex-row justify-center">
                    <h2 className="font-bold">{product?.productName}</h2>
                    <p className="font-bold ml-3">${product?.price}</p>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default AdvertisedItems;
