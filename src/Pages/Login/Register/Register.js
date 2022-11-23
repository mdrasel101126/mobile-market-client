import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/UserContext";
import saveUser from "../../../utilities/saveUser";

const Register = () => {
  const { createUser, updateUserProfile, googleSignUp } =
    useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLoin = (data) => {
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
      });
  };
  const handleGoogleSignUp = () => {
    setRegisterError("");
    googleSignUp()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.displayName, user.email);
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
  };
  return (
    <div className="w-4/5 md:w-3/5 lg:w-1/2 mx-auto mt-16">
      <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
        Please Register
      </h1>
      <form onSubmit={handleSubmit(handleLoin)} className="flex flex-col gap-4">
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
        <div className="form-control w-full">
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
        </div>
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
              <small className="text-red-600">{errors.password.message}</small>
            </p>
          )}
        </div>

        <input
          className="btn btn-primary w-full"
          type="submit"
          value="Register"
        />
      </form>
      <div className="text-center mt-6">
        <p>OR</p>
        <button onClick={handleGoogleSignUp} className="mt-6 btn btn-outline ">
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
