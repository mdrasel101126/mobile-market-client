import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./Routes/Routes";

function App() {
  return (
    <div className="max-w-[1400px] mx-auto px-3 md:px-6 lg:px-8 ">
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
