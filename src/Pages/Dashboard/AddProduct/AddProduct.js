import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";
import Spinner from "../../Shared/Spinner/Spinner";

const AddProduct = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const handleAddProduct = (data) => {
    setSpinner(true);
    data.sellerEmail = user.email;
    //console.log(data);
    data.sellerEmail = user.email;
    const image = data.image[0];
    //console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImageBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((formdata) => {
        console.log(formdata);
        data.image = formdata.data.display_url;
        data.postDate = format(new Date(), "PP");
        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.acknowledged) {
              toast.success("Product Added Successfully");
              navigate("/dashboard/myproducts");
            }
          });
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      {spinner && <Spinner></Spinner>}
      <div className="w-11/12 md:w-4/5 lg:w-3/5 mx-auto mt-16 bg-base-200 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          Please Add Product
        </h1>
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="flex flex-col gap-4"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="input input-bordered w-full"
              {...register("productName", { required: true })}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Image</span>
            </label>

            <input
              type="file"
              className="input input-bordered w-full"
              {...register("image", { required: true })}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="text"
              placeholder="Enter Price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Condition</span>
            </label>
            <select
              defaultValue="Excellent"
              className=" select
             select-bordered
             w-full"
              {...register("condition")}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Good">Fair</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="input input-bordered w-full"
              {...register("sellerMobile", { required: true })}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Location</span>
            </label>
            <input
              type="text"
              placeholder="Enter Location"
              className="input input-bordered w-full"
              {...register("sellerLocation", { required: true })}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className=" select
             select-bordered
             w-full"
              {...register("categoryId")}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              placeholder="Enter Description"
              className="textarea textarea-bordered w-full"
              {...register("description", { required: true })}
            ></textarea>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Purchase Date</span>
            </label>
            <input
              type="text"
              placeholder="Enter Purchase Date"
              className="input input-bordered w-full"
              {...register("purchaseDate", { required: true })}
            />
            <input
              className="btn btn-primary w-full  bg-gradient-to-r from-primary to-secondary mt-5"
              type="submit"
              value="Add Product"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
