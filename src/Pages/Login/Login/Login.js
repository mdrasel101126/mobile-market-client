import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/UserContext";

const Login = () => {
  const { loginUser, googleSignUp } = useContext(AuthContext);
  const [loninError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    setLoginError("");
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.message);
      });
  };
  const handleGoogleSignUp = () => {
    setLoginError("");
    googleSignUp()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  return (
    <div className="w-4/5 md:w-3/5 lg:w-1/2 mx-auto mt-16">
      <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
        Please Login
      </h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col gap-4"
      >
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
            })}
          />
          {errors.password && (
            <p>
              <small className="text-red-600">{errors.password.message}</small>
            </p>
          )}
          <label className="label">
            <button className="label-text">Forgot Password?</button>
          </label>
        </div>
        {loninError && <p>{loninError}</p>}
        <input className="btn btn-primary w-full" type="submit" value="Login" />
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

export default Login;
