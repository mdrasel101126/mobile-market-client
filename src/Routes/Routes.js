const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");
const { default: Home } = require("../Pages/Home/Home/Home");
const { default: Login } = require("../Pages/Login/Login/Login");
const { default: Register } = require("../Pages/Login/Register/Register");

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default routes;
