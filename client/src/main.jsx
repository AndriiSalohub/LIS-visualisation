import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/assets/styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Visualizationpage from "./pages/Visualizationpage.jsx";
import Examplespage from "./pages/Examplespage.jsx";

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
      {
        path: "examples",
        element: <Examplespage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
