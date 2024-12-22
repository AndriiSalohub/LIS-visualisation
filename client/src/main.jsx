import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/assets/styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Visualizationpage from "./pages/Visualizationpage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "visualization",
        element: <Visualizationpage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
