import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import VisualizationPage from "@/pages/VisualizationPage";
import ExamplesPage from "@/pages/ExamplesPage";
import DocumentationPage from "@/pages/DocumentationPage";
import "../src/assets/styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "visualization",
        element: <VisualizationPage />,
      },
      {
        path: "examples",
        element: <ExamplesPage />,
      },
      {
        path: "documentation",
        element: <DocumentationPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
