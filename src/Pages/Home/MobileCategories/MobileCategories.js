import React, { useEffect, useState } from "react";
import axios from "axios";
import MobileCategory from "./MobileCategory";

const MobileCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then(function (response) {
        // handle success
        const data = response.data;
        setCategories(data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="my-8">
      <h1 className="text-center text-xl font-bold">Categories</h1>
      <p className="text-center">We Provide Best Brands of Used Mobiles</p>
      <div className="flex justify-center flex-wrap mt-6">
        {categories &&
          categories.map((category) => (
            <MobileCategory
              key={category._id}
              category={category}
            ></MobileCategory>
          ))}
      </div>
    </div>
  );
};

export default MobileCategories;
