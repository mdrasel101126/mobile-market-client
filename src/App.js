import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./Routes/Routes";

function App() {
  return (
    <div className="max-w-[1400px] mx-auto md:px-6 lg:px-8">
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
