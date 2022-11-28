import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/UserContext";
import Spinner from "../../Shared/Spinner/Spinner";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSecretToken from "../../../hooks/useSecretToken";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, googleSignUp } = useContext(AuthContext);
  const [loninError, setLoginError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [token] = useSecretToken(userEmail);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    setSpinner(true);
    setLoginError("");
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        setUserEmail(data.email);
        setSpinner(false);
        toast.success("Successfully Registered");
        //console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
        setLoginError(error.message);
      });
  };
  const handleGoogleSignUp = () => {
    googleSignUp()
      .then((result) => {
        const user = result.user;
        saveUser(user.displayName, user.email, "user");
        console.log(user);
      })
      .catch((error) => {
        setSpinner(false);
        setLoginError(error.message);
      });
  };
  const saveUser = (name, email, role) => {
    const user = { name, email, role };

    fetch("https://mobile-market-server-delta.vercel.app/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserEmail(email);
        setSpinner(false);
        toast.success("Successfully Registered");
      })
      .catch((err) => {
        setSpinner(false);
      });
  };

  return (
    <div className="my-20">
      {spinner && <Spinner></Spinner>}
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto mt-16 bg-base-200 p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          Please Login
        </h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
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
                <small className="text-red-600">
                  {errors.password.message}
                </small>
              </p>
            )}
            <label className="label">
              <button className="label-text">Forgot Password?</button>
            </label>
          </div>
          {loninError && <p className="text-red-500">{loninError}</p>}
          <input
            className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary "
            type="submit"
            value="Login"
          />
        </form>
        <label className="label">
          <p>
            <small>
              Already Have an Account?{" "}
              <Link to="/register" className="label-text text-primary">
                Please Register
              </Link>
            </small>
          </p>
        </label>
        <div className="text-center mt-6">
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSignUp}
            className="mt-6 btn btn-primary  bg-gradient-to-r from-primary to-secondary "
          >
            {" "}
            <FaGoogle className="text-green-500 mr-2"></FaGoogle>
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
