import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";
import useSecretToken from "../../../hooks/useSecretToken";
import Spinner from "../../Shared/Spinner/Spinner";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [token] = useSecretToken(userEmail);

  if (token) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLoin = (data) => {
    //console.log(data);
    setRegisterError("");
    setSpinner(true);
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name)
          .then(() => {
            //success

            saveUser(data.name, data.email, data.role);
          })
          .catch((err) => {
            console.log(err);
            setSpinner(false);
            setRegisterError(err.message);
          });
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
        setRegisterError(error.message);
      });
  };
  const saveUser = (name, email, role) => {
    const user = { name, email, role };

    fetch("http://localhost:5000/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setSpinner(false);
        toast.success("Successfully Registered");
        setUserEmail(email);
        console.log(data);
      })
      .catch((err) => {
        setSpinner(false);
      });
  };

  return (
    <div>
      {spinner && <Spinner></Spinner>}
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto mt-16 bg-base-200 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          Please Register
        </h1>
        <form
          onSubmit={handleSubmit(handleLoin)}
          className="flex flex-col gap-4"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is Required" })}
            />
            {errors.name && (
              <p>
                <small className="text-red-600">{errors.name.message}</small>
              </p>
            )}
          </div>
          {/* <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Image</span>
          </label>

          <input
            type="file"
            className="input input-bordered w-full"
            {...register("image", { required: "Image is Required" })}
          />
          {errors.image && (
            <p>
              <small className="text-red-600">{errors.image.message}</small>
            </p>
          )}
        </div> */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is Required" })}
            />
            {errors.email && (
              <p>
                <small className="text-red-600">{errors.email.message}</small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Use at least six characters",
                },
              })}
            />
            {errors.password && (
              <p>
                <small className="text-red-600">
                  {errors.password.message}
                </small>
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Please Select Your Action</span>
            </label>
            <select
              defaultValue="user"
              className=" select
             select-bordered
             w-full"
              {...register("role")}
            >
              <option value="user">User</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
          {registerError && <p className="text-red-500">{registerError}</p>}
          <input
            className="btn btn-primary w-full  bg-gradient-to-r from-primary to-secondary mt-5"
            type="submit"
            value="Register"
          />
        </form>
        <label className="label">
          <p>
            <small>
              No Account?{" "}
              <Link to="/login" className="label-text text-primary">
                Please Login
              </Link>
            </small>
          </p>
        </label>
      </div>
    </div>
  );
};

export default Register;

/* const image = data.image[0];
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
        createUser(data.email, data.password)
          .then((result) => {
            updateUserProfile(data.name, formdata.data.display_url)
              .then((res) => {
                //success
                saveUser(data.name, data.email);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      }); */
