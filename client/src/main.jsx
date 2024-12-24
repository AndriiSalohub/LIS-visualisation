import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/assets/styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import VisualizationPage from "./pages/VisualizationPage.jsx";
import ExamplesPage from "./pages/ExamplesPage.jsx";
import DocumentationPage from "./pages/DocumentationPage.jsx";

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
